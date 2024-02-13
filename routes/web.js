const express = require("express");

const FrontController = require("../controllers/FrontController.js");
const route = express.Router();
const checkUserAuth = require("../middleware/auth");
const CourseController = require("../controllers/Coursecontroller.js");
const AdminController = require("../controllers/AdminController.js");

// route

route.get("/", FrontController.login);
route.get("/about", checkUserAuth, FrontController.about);
route.get("/register", FrontController.register);
route.get("/dashboard", checkUserAuth, FrontController.dashboard);
route.get("/team", FrontController.team);
route.get("/course", FrontController.course);
route.get("/profile", checkUserAuth, FrontController.profile);
route.get("/contact", checkUserAuth, FrontController.contact);

// data insert
route.post("/insertreg", FrontController.insertReg);
route.post("/vlogin", FrontController.vlogin);
route.get("/logout", FrontController.logout);
// coursecontroller
route.post("/courseinsert", checkUserAuth, CourseController.courseinsert);
route.get("/course_display", checkUserAuth, CourseController.courseDisplay);
route.get("/course_view/:id", checkUserAuth, CourseController.courseview);
route.get("/course_edit/:id", checkUserAuth, CourseController.courseEdit);
route.get("/course_delete/:id", checkUserAuth, CourseController.courseDelete);
route.post("/course_update/:id", checkUserAuth, CourseController.courseUpdate);
route.post("/updateProfile", checkUserAuth, FrontController.updateProfile);
route.post("/changepassword",checkUserAuth,FrontController.changepassword)

// ADMINCONTROLLER

route.get("/admin/dashboard",checkUserAuth,AdminController.dashboard)
route.post("/admin/update_status/:id",checkUserAuth,AdminController.update_status)
route.get('/forget',FrontController.forgetload)
route.post('/forget',FrontController.forgetverify)


module.exports = route;
