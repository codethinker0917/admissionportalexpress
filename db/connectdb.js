const mongoose = require('mongoose')

const connectDb = () =>{

    return mongoose.connect(
        'mongodb://127.0.0.1:27017/admission123'
    )
    .then(()=>{
        console.log('connected successfully');
    }).catch((err)=>{
        console.log(err);
    })
}

module.exports = connectDb