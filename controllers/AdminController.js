const CourseModel = require('../models/course')

class AdminController {
    static dashboard = async (req, res) => {
        try {
            
            const { name,image,email}= req.userdata;
            const course = await CourseModel.find()
            console.log(course)
            res.render('admin/dashboard',{n:name, e:email,i:image,c:course}) 
        } catch (error) {
            console.log(error);
        }
    };
}
module.exports = AdminController