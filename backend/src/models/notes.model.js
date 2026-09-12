const mongoose= require('mongoose');

const todoSchema= new mongoose.Schema(
    {
        title:{
            type:String,
            required:[true,'Please add a task title'],
            trim:true
        },
        description:{
            type:String,
            default:"",
            trim:true
        },
        status:{
            type:String,
            enum:["pending","in progress","completed"],
            default:"pending"
        }
    }
)

module.exports= mongoose.model('Todo',todoSchema)