const CourseModel = require('../models/course')
// const jwt = require('jsonwebtoken')
class CourseController {
    static courseinsert = async (req, res) => {
        try {

            // console.log(req.body)
            
            const {name,email,phone,dob,address,gender,education,course}=req.body;
            // console.log(result)
            const result=new CourseModel({
                name:name,
                email:email,
                phone:phone,
                dob:dob,
                address:address,
                gender:gender,
                education:education,
                course:course,

            })
            await result.save()
            res.redirect('/dashboard')


        } catch (error) {
            console.log(error)
        }
    };

}



module.exports = CourseController;