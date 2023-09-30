const task = require("../models/Schema");

// logic for get all task details
exports.showAllTask = async (req, res) => {
    try {
        const allTask = await task.find()
        res.status(200).json(allTask)
    }
    catch (err) {
        res.status(401).json(err)
    }
}

// logic for add new task
exports.addTask = async (req, res) => {
    console.log(req.body);
    try {
        const { taskName, taskStatus, taskDescription, taskStarts, taskEnds } = req.body
        const newTask = new task({
            taskName, taskStatus, taskDescription, taskStarts, taskEnds
        })
        await newTask.save()
        res.status(200).json('new task added')
    }
    catch (error) {
        console.error('Error adding task:', error);
        res.status(401).json(error)

    }

}

exports.getSingleTask = async (req, res) => {
    const id = req.params.id

    try {
        const singleTask = await task.findOne({ _id: id })
        res.status(200).json(singleTask)
    }
    catch {
        res.status(401).json("task does't appear")
    }
}

exports.deleteTask = async (req, res) => {
    const id = req.params.id

    try {
        const singleTask = await task.findOneAndDelete({ _id: id })
        if (singleTask) {
            res.status(200).json("task deleted")
        }
        else {
            res.status(401).json("task not found")
        }
    }
    catch (err) {
        res.status(401).json(`error is ${err}`)
    }
}

exports.changeStatus = async (req, res) => {
    const id = req.body.id
    const status = req.body.status
    const start = req.body.start
    const end = req.body.end
    try {
        const singleTask = await task.findOne({ _id: id })
        if (singleTask) {
            singleTask.taskStatus = status
            if (start) {
                singleTask.taskStarts = start
            }
            if(end){
                singleTask.taskEnds=end
            }
            await singleTask.save()
            res.status(200).json("status updated")
        }
        else {
            res.status(401).json("task not found")
        }
    }
    catch (err) {
        res.status(401).json(err)
    }
}

exports.editTask=async(req,res)=>{
    const id=req.params.id
    const data=req.body
    console.log(data);
    try{
        const sTask=await task.findOne({_id:id})
        if(sTask){
            sTask.taskName=data.taskName
            sTask.taskStatus=data.taskStatus
            sTask.taskDescription=data.taskDescription
            sTask.taskStarts=data.taskStarts
            sTask.taskEnds=data.taskEnds
            

            await sTask.save()
            res.status(200).json("updated successfully")
        }
        else{
            res.status(401).json("task not found")
        }
       
    }
    catch(err){
        res.status(401).json(err)
    }
}


