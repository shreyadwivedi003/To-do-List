const express=require("express") //creating the server
const cors=require("cors")
const dotenv= require("dotenv")
const todo= require("./models/notes.model")
const taskRoutes = require("./routes/routes")

dotenv.config();

const app=express();

app.use(express.json())  //using middleware that makes recieved data readable for express
app.use(cors());

app.use("/api/tasks",taskRoutes);


app.get("/",(req,res)=>{
    res.status(200).json({message:"Task API running."});
});

app.use((req,res)=>{
    res.status(404).json({success:false,message:"Route not found"})
})
     
app.use((err,req,res,next)=>{
    console.error("Server error",err.stack);
    res.status(500).json({
        success:false,
        error:err.message || "Internal server error",
    });
});


module.exports=app