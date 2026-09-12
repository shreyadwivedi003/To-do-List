const Task= require("../models/notes.model")
const getAllTasks=async ()=>{
    return await Task.find({});
}
const searchTasks = async (query)=>{
    return await Task.find({
        $or:[
            { title:{$regex:query,$options:"i"}},
            { description:{$regex:query,$options:"i"}},
        ],
    });
};

const createTask=async (taskData)=>{
    return await Task.create(taskData);
};
const updateTask= async (id,taskData)=>{
    return await Task.findByIdAndUpdate(id,taskData,{new:true,runValidators:true});
};

const updateTaskStatus = async (id,status)=>{
    return await Task.findByIdAndUpdate(id,
        {status},
        {new:true,runValidators:true}
    );
};
const deleteTask= async (id)=>{
    return await Task.findByIdAndDelete(id);
}
module.exports={
    getAllTasks,
    searchTasks,
    createTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
}