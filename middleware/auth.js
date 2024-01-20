const jwt = require('jsonwebtoken');
const UserModel = require('../models/user')

const checkUserAuth = async (req,res,next) => {
    // console.log('middleware auth');
    const {token} = req.cookies;
    // console.log(token);
    if (!token){
        req.flash('error','unauthorized login ');
        res.redirect('/login');
    }
    else{
        const data = jwt.verify(token,'pninfosys8589578958ty');
        // console.log(data);
        // data get 
        const userdata = await UserModel.findOne({_id: data.ID});
        // console.log(userdata)
        req.userdata = userdata;
        next()
    }
};

module.exports= checkUserAuth;