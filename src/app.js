const express=require("express") //creating the server

const app=express();
app.use(express.json())  //using middleware that makes recieved data readable for express

const notes=[];
let nextId=1;

app.post('/notes',(req,res)=>{
    const {title,description}=req.body;
    if(!title || typeof title !== 'string' || title.trim()===''){
        return res.status(400).json({
            error:"wrong request",
            message:"Title is mandatory and it is non-empty"
        })
    }
    const newNote={
        id:nextId++,
        title: title.trim(),
        description:description ? description.trim() : ""
    };
    notes.push(newNote);
    res.status(201).json({
        message:"note created successfully",
        note:newNote
    })
})



app.get('/notes',(req,res)=>{
    res.status(200).json({
        message:"Notes fetched successfully",
        count:notes.length,
        notes: notes
    })
})


app.delete('/notes/:id',(req,res)=>{
    const target= parseInt(req.params.id,10);
    const noteIndex=notes.findIndex(note=>note.id===target);
    if(noteIndex === -1){
        return res.status(404).json({
            error:"Page not found",
            message:"note requested to be deleted does not exist"
        })
    }
    notes.splice(noteIndex,1);
    res.status(200).json({
        message:"note deleted successfully"
    })
    
})


// Full update
app.put('/notes/:id',(req,res)=>{
    const target=parseInt(req.params.id,10);
    const {title,description}=req.body;

    const noteIndex= notes.findIndex(note=>note.id === target);
    if(noteIndex === -1){
        return res.status(404).json({
            error:"note not found",
            message:" note does not exist"
        })
    }
    if(!title || typeof title != 'string' || title.trim() === ''){
        return res.status(400).json({
            error:"wrong request",
            message:"Title is required"
        })
    }
    notes[noteIndex]={
        id: target,
        title:title.trim(),
        description:description && typeof description==='string' ?  description.trim : ""
    };
    res.status(200).json({
        message:"Note was updated successfully",
        note:note[noteIndex]
    })
})

// Partial update
app.patch('/notes/:id',(req,res)=>{
    const target=parseInt(req.params.id,10);
    
    const title=req.body.title
    const description=req.body.description
    
    const noteIndex=notes.findIndex(note=>note.id===target);

    if(noteIndex===-1){
        return res.status(404).json({
            error:"note not found",
            message:"note does not exists"
        })
    }

    if(title !== undefined){
        if(typeof title !=='string' || title.trim() === ''){
            return res.status(400).json({
                error:"wrong request",
                message:"Title cannot be blank"
            })
        }
        notes[noteIndex].title=title.trim();
    }

    if(description !== undefined){
        notes[noteIndex].description= typeof description ==='string' ? description.trim():description;
    }

    res.status(200).json({
        message:"note updated successfully",
        note:notes[noteIndex]
    })
})



module.exports=app