const mongoose = require("mongoose");

const Userschema = new mongoose.Schema(
  {
    name: {
      type: String,
      Required: true,
    },
    email: {
      type: String,
      Required: true,
    },

    password: {
      type: String,
      Required: true,
    },

    role: {
      type: String,
      default: "user",
    },

    image: {
      public_id: {
        type: String,
        Required: true,
      },

      token:{
          type:String,
          default:''  
      },
      url: {
        type: String,
        Required: true,
      },
    },
  },
  { timestamps: true }
);
const UserModel = mongoose.model("user", Userschema);

module.exports = UserModel;
