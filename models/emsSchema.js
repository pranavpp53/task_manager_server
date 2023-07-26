const mongoose=require('mongoose')
const validator=require('validator')

const employees=mongoose.model('employees',{
    fname:{
        type:String,
        required:true,
        trim:true
    },
    lname:{
        type:String,
        required:true,
        trim:true

    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        validator(value){
            if(!validator.isEmail(value)){
                throw Error("invalid email")
            }
        }
    },
    phn:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        minlength:10,
        maxlength:13
    },
    gender:{
        type:String,
        required:true,
        trim:true
    },
    status:{
        type:String,
        required:true,
        trim:true
    },
    profile:{
        type:String,
        required:true,
        trim:true
    },
    location:{
        type:String,
        required:true,
        trim:true
    },
    mobile:{
        type:String,
        required:true,
        trim:true
    }
})

module.exports=employees