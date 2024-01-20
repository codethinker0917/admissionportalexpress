const mongoose = require('mongoose')

const Teacherschema = new mongoose.Schema({

    name:{
        type:String,
        Required:true
    },
    email:{
        type:String,
        Required:true
    },

   

},{timestamps:true})
const TeacherModel = mongoose.model('teacher',Teacherschema)

module.exports = TeacherModel