const employees = require("../models/emsSchema");

//logic to register new employees

exports.employeeRegister = async (req, res) => {
    const file = req.file.filename
    const { fname, lname, email, phn, mobile, gender, status, location } = req.body
    if (!fname || !lname || !email || !phn || !mobile || !gender || !status || !location || !file) {
        res.status(403).json("all inputs are required")
    }
    try {
        const preEmployee = await employees.findOne({ email })
        if (preEmployee) {
            res.status(403).json("employee already existing")
        }
        else {
            const newEmployee = new employees({
                fname, lname, email, phn, mobile, gender, status, profile: file, location
            })
            await newEmployee.save()
            res.status(200).json(newEmployee)
        }

    }
    catch (error) {
        res.status(401).json(error)

    }

}

exports.getAllEmployees = async (req, res) => {

    //access query param from req
    const searchKey = req.query.search
    const query = {
        fname: { $regex: searchKey, $options: "i" }     //"i"=case-insensitive
    }
    try {
        const getAllEmployees = await employees.find(query)
        res.status(200).json(getAllEmployees)
    }
    catch (err) {
        res.status(401).json(err)
    }
}

exports.getSingleEmployee = async (req, res) => {
    //get param data
    const id = req.params.id

    //find user in db
    try {
        const preUser = await employees.findOne({ _id: id })
        res.status(200).json(preUser)

    }
    catch {
        res.status(401).json("employee doest eist")
    }

}

exports.deleteEmployee = async (req, res) => {
    const id = req.params.id


    try {
        const removedItem = await employees.findByIdAndDelete({ _id: id })
        res.status(200).json(removedItem)
    }
    catch(err){
        res.status(401).json(err)
    }

}

exports.editUser=async(req,res)=>{
    const {id}=req.params
    const { fname, lname, email, phn, mobile, gender, status, location,user_profile } = req.body

    const file=req.file?req.file.filename:user_profile

    try{
        const user=await employees.findOne({_id:id})
        if(user){
            user.fname=fname
            user.lname=lname
            user.email=email
            user.phn=phn
            user.mobile=mobile
            user.gender=gender
            user.status=status
            user.location=location
            user.profile=file

            await user.save()
            res.status(200).json(fname)
        }
    }
    catch (err){
        res.status(401).json(err)

    }
}