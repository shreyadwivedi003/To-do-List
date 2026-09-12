const express=require("express");
const router=express.Router();
const{
    getTasks,
    createTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
}=require("../controllers/controllers");

router.get("/",getTasks);
router.post("/",createTask);
router.patch("/:id/status",updateTaskStatus);
router.put("/:id",updateTask);
router.delete("/:id",deleteTask);

module.exports=router;