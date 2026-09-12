const todoService=require("../services/todoService")
const getTasks= async (req,res)=>{
    try{
        const {search}=req.query;
        const tasks=search ? await todoService.searchTasks(search) : await todoService.getAllTasks();
    res.status(200).json({success:true,data:tasks});
    }
    catch(error){
        res.status(500).json({success:false,error:error.message});
    }
};

const createTask = async (req,res)=>{
 try{
    const task = await todoService.createTask(req.body);
    res.status(201).json({success:true,data:task});
 }   
 catch(error){
    res.status(400).json({success:false,error:error.message})
 }
};

const updateTask= async (req,res)=>{
    try{
        const task = await todoService.updateTask(req.params.id,req.body);
        if(!task){
            return res.status(404).json({success:false,message:"Task not found"});
        }
        res.status(200).json({success:true,data:task});

    }
    catch(error){
        res.status(400).json({success:false,error:error.message});
    }
};


const updateTaskStatus= async (req,res)=>{
    try{
        const {status}=req.body;
        if(!status){
            return res.status(400).json({success:false,message:"Status is required"})
        }
        const task= await todoService.updateTaskStatus(req.params.id,status);
        if(!task){
            return res.status(404).json({success:false,message:"Task not found"});
        }
        res.status(200).json({success:true,data:task});
    }
    catch(error){
        res.status(400).json({success:false,error:error.message});
    }
};

const deleteTask = async (req,res)=>{
    try{
        const task= await todoService.deleteTask(req.params.id);
        if(!task){
            return res.status(404).json({success:false,message:"Task not found"});
        }
        res.status(200).json({success:true,message:"Task deleted successfully"});
    }
    catch(error){
        res.status(500).json({success:false,error:error.message});
    }
};

module.exports={
    getTasks,
    createTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
};