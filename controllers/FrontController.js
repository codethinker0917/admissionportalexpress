const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const CourseModel = require("../models/course");
const randomstring = require("randomstring");

cloudinary.config({
  cloud_name: "dm72e144k",
  api_key: "581618876774113",
  api_secret: "_ASJxMux7iEbhsAGYPuUq_geQGU",
});

class FrontController {
  static login = async (req, res) => {
    try {
      res.render("login", {
        msg: req.flash("success"),
        error: req.flash("error"),
      });
    } catch (error) {
      console.log(error);
    }
  };

  static about = async (req, res) => {
    try {
      const { name, image } = req.userdata;
      res.render("about", { n: name, i: image });
    } catch (error) {
      console.log(error);
    }
  };

  static register = async (req, res) => {
    try {
      res.render("register", { msg: req.flash("error") });
    } catch (error) {
      console.log(error);
    }
  };

  static dashboard = async (req, res) => {
    try {
      const { name, image, email, id } = req.userdata;
      // console.log(name);
      const btech = await CourseModel.findOne({ user_id: id, course: "btech" });
      const bca = await CourseModel.findOne({ user_id: id, course: "bca" });
      const mca = await CourseModel.findOne({ user_id: id, course: "mca" });
      res.render("dashboard", {
        n: name,
        i: image,
        e: email,
        btech: btech,
        bca: bca,
        mca: mca,
      });
      // console.log(btech);
    } catch (error) {
      console.log(error);
    }
  };

  static team = async (req, res) => {
    try {
      res.render("team");
    } catch (error) {
      console.log(error);
    }
  };
  static profile = async (req, res) => {
    try {
      const { name, image, email } = req.userdata;

      res.render("profile", { n: name, i: image, e: email });
    } catch (error) {
      console.log(error);
    }
  };

  static updateProfile = async (req, res) => {
    try {
      const { id } = req.userdata;
      const { name, image, email } = req.body;
      if (req.files) {
        const user = await UserModel.findById(id);
        const imageID = user.image.public_id;

        await cloudinary.uploader.destroy(imageID);
        const imagefile = req.files.image;
        const imageupload = await cloudinary.uploader.upload(
          imagefile.tempFilePath,
          {
            folder: "profileImage",
          }
        );

        var data = {
          name: name,
          email: email,

          image: {
            public_id: imageupload.public_id,
            url: imageupload.secure_url,
          },
        };
      } else {
        var data = {
          name: name,
          email: email,
        };
      }
      await UserModel.findByIdAndUpdate(id, data);
      req.flash("success", "update profile successfully");
      res.redirect("/profile");

      // console.log(req.body);
      // console.log(req.files.image);
    } catch (error) {}
  };

  static changepassword = async (req, res) => {
    try {
      const { op, np, cp } = req.body;
      const { id } = req.userdata;
      if (op && np && cp) {
        const user = await UserModel.findById(id);
        const isMatched = await bcrypt.compare(op, user.password);
        console.log(isMatched);
        if (!isMatched) {
          req.flash("error", "current password is incorrect");
          res.redirect("/profile");
        } else {
          if (np != cp) {
            req.flash("error", "password does not match");
            res.redirect("/profile");
          } else {
            const newHashPassword = await bcrypt.hash(np, 10);
            await UserModel.findByIdAndUpdate(id, {
              password: newHashPassword,
            });
            req.flash("success", "password updated successfully");
            res.redirect("/");
          }
        }
      } else {
        req.flash("error", "all fields are required");
        res.redirect("/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  static course = async (req, res) => {
    try {
      res.render("course");
    } catch (error) {
      console.log(error);
    }
  };

  static contact = async (req, res) => {
    try {
      const { name, image } = req.userdata;
      res.render("contact", { n: name, i: image });
    } catch (error) {
      console.log(error);
    }
  };

  // insertdata reg
  static insertReg = async (req, res) => {
    try {
      // console.log(req.files.image);
      const file = req.files.image;
      // image upload

      const uploadImage = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "profile",
      });

      // console.log(uploadImage);

      console.log(req.body);
      const { n, e, p, cp } = req.body;
      const user = await UserModel.findOne({ email: e });

      if (user) {
        req.flash("error", "email already exist");
        res.redirect("/register");
      } else {
        if (n && e && p && cp) {
          if (p == cp) {
            const hashpassword = await bcrypt.hash(p, 10);
            const result = new UserModel({
              name: n,
              email: e,
              password: hashpassword,
              image: {
                public_id: uploadImage.public_id,
                url: uploadImage.secure_url,
              },
            });
            await result.save();
            req.flash("success", "register success plz login");
            res.redirect("/"); //route url
          } else {
            req.flash("error", "password and cp not same");
            res.redirect("/register");
          }
        } else {
          req.flash("error", "all field req");
          res.redirect("/register");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  static vlogin = async (req, res) => {
    try {
      // console.log(req.body)
      const { e, p } = req.body;
      if (e && p) {
        const user = await UserModel.findOne({ email: e });
        if (user != null) {
          const isMatched = await bcrypt.compare(p, user.password);
          if (isMatched) {
            if (user.role == "admin") {
              let token = jwt.sign({ ID: user.id }, "pninfosys8589578958ty");
              // console.log(token);
              res.cookie("token", token);

              res.redirect("/admin/dashboard");
            } else {
              let token = jwt.sign({ ID: user.id }, "pninfosys8589578958ty");
              res.cookie("token", token);
              res.redirect("/dashboard");
            }
            // token
          } else {
            req.flash("error", "Email or Password is not valid");
            res.redirect("/");
          }
        } else {
          req.flash("error", "You are not a registred user");
          res.redirect("/");
        }
      } else {
        req.flash("error", "All Firlds Required");
        res.redirect("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  static logout = async (req, res) => {
    try {
      res.clearCookie("token");
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  };

  // forget password code start

  static forgetload = async (req, res) => {
    try {
      res.render("forget");
    } catch (error) {
      console.log(error);
    }
  };

  static forgetverify = async (req, res) => {
    try {
      const email = req.body.email;
      const userdata = await UserModel.findOne({ email: email });
      if (userdata) {
        if (userdata.is_varified == 0) {
          res.render("forget", { message: "please verify your mail." });
        } else {
          const randomstring = randomstring.generate();
        }
      } else {
        res.render("forget", { message: "user email is incorrect." });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = FrontController;
