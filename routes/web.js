const express =require('express')

const FrontController=require('../controllers/FrontController.js')
const route = express.Router()
const checkUserAuth = require('../middleware/auth')
const CourseController = require('../controllers/Coursecontroller.js')

// route


route.get('/',FrontController.login)
route.get('/about',checkUserAuth,FrontController.about)
route.get('/register',FrontController.register)
route.get('/dashboard',checkUserAuth,FrontController.dashboard)
route.get('/team',FrontController.team)
route.get('/course',FrontController.course)
route.get('/contact',checkUserAuth,FrontController.contact)

// data insert
route.post('/insertreg',FrontController.insertReg)
route.post('/vlogin',FrontController.vlogin)
route.get('/logout',FrontController.logout)
route.post('/courseinsert',CourseController.courseinsert)








module.exports=route
