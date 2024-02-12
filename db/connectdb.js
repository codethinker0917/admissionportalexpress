const mongoose = require('mongoose')
const Live_URL = 'mongodb+srv://bhargavaabhishek44:ram123@cluster0.rngknzx.mongodb.net/admissionPortal?retryWrites=true&w=majority'
const Local_URL=  'mongodb://127.0.0.1:27017/admission123'


const connectDb = () =>{

    return mongoose.connect(Live_URL)
    .then(()=>{
        console.log('connected successfully');
    }).catch((err)=>{
        console.log(err);
    })
}

module.exports = connectDb