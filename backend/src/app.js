const express=require("express") //creating the server
const cors=require("cors")
const dotenv= require("dotenv")
const todo= require("./models/notes.model")

dotenv.config();

const app=express();
app.use(express.json())  //using middleware that makes recieved data readable for express
app.use(cors({
    origin:"*",
    methods:["PUT","POST","GET","PATCH","DELETE"],
    allowedHeaders:["content-type","Authorization"]
}));


// ----- CREATING A NOTE---------
app.post("/create-post", async (req,res)=>{
    try{
        const {title,description}=req.body;
        if(!title || typeof title !== "string" || title.trim() === ""){
            return res.status(400).json({
                error: "wrong request",
                message:"Title cannot be empty."
            });
        }
        const newNote= await todo.create({
            title: title.trim(),
            description: description,
            completed:false
        })
        res.status(200).json({
            message:"note created successfully",
            note: newNote
        });
    }
    catch(error){
        res.status(500).json({
            message:"server error",
            error: error.message
        })
    }
});

// ------------FETCHING ALL NOTES----------------
app.get("/notes", async (req,res)=>{
    try{
        const {search}=req.query;
        let query={};
        if(search){
            query.title= { $regex: search, $options:"i"};
        }
        const notes= await todo.finf(query).sort({createdAt:-1});
        res.status(200).json({
            message:"notes fetched successflly",
            count: notes.length,
            notes: notes
        });
    }
    catch(error){
        res.status(500).json({
            message:"server error",
            error: error.message
        })
    }
})


// -----------DELETING A NOTE---------------
app.delete("/notes/:id", async (req,res)=>{
    try{
        const deleteNote= await todo.findByIdAndDelete(req.params.id);
        if(!deleteNote){
            return res.status(404).json({
                error:"page not found",
                message:"note requested to be deleted does not exist"
            })
        }
        res.status(200).json({
            message: "Note deleted successfully"
        });
    }
    catch(error){
        res.status(400).json({
            error:"Invalid ID ",
            message: error.message
        })
    }
});


//-----------FULLY UPATING A NOTE---------------
app.put("/notes/:id", async (req,res)=>{
    try{
        const {title, description,completed}= req.body;
        if(!title || typeof title !== 'string' || title.trim() === ''){
            return res.status(400).json({
                error:"wrong request",
                message:"Title is mandatory"
            })
        }
        const updatedNote = await todo.findByIdAndUpdate(
            req.params.id,
            {
                title:title,
                description:description,
                completed:completed ?? false
            }
        );
        if(!updatedNote){
            return req.status(404).json({
                error:"note not found",
                message:"note does not exist"
            })
        };
        res.status(200).json({
            message:"note updated successfully",
            note: updatedNote
        });
    }
    catch(error){
        res.status(500).json({
            message:"server error",
            error: error.message
        })
    }
})



//---------Partial Update------------
app.patch("/notes/:id", async (req,res)=>{
    try{
        const {title,description,completed}= req.body;
        let updates={};
        if(title !== undefined){
            if(typeof title !== 'string' || title.trim() === ''){
                return res.status(400).json({
                    error:"wrng request",
                    message:"title cannot be blank"
                });
            }
            updates.title=title.trim();
        }
        if( description!==undefined){
            updates.description= typeof description === "string" ? description.trim(): description;
        }
        if(completed !== undefined){
            updates.completed=Boolean(completed);
        }
        const updatedNote= await todo.findByIdAndUpdate(req.params.id,updates,{
            new:true,
            runValidators:true
        });
        if(!updatedNote){
            return req.status(404).json({
                error:"note not found",
                message:"note does not exist"
        });
    }
        res.status(200).json({
            message:"Note updated successfully",
            note: updatedNote
        });
}
catch(error){
        res.status(400).json({
            error:"Invalid ID ",
            message: error.message
        })
    }
});



module.exports=app