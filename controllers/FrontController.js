const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;

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
      const { name,image } = req.userdata;
      res.render("about", { n: name , i: image});
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
      const { name,image } = req.userdata;
      // console.log(name);
      res.render("dashboard", { n: name , i: image });
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

  static course = async (req, res) => {
    try {
      res.render("course");
    } catch (error) {
      console.log(error);
    }
  };

  static contact = async (req, res) => {
    try {
      const { name,image } = req.userdata;
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
            // token

            let token = jwt.sign({ ID: user.id }, "pninfosys8589578958ty");
            // console.log(token);
            res.cookie("token", token);

            res.redirect("/dashboard");
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
}

module.exports = FrontController;
