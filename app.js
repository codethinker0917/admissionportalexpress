const express = require("express");
// console.log(express)
const app = express();
const port = 4000;
const web = require("./routes/web");

const connectDb = require("./db/connectdb");
// cookie parser
const cookieParser = require('cookie-parser')

const fileUpload = require('express-fileupload');

// fileuploaad
app.use(fileUpload({useTempFiles:true}));
// token get
app.use(cookieParser());

// connect db

connectDb();
// dataget object
app.use(express.urlencoded({ extended: false }));

// html css views

app.set("view engine", "ejs");

app.use(express.static("public"));

// connect flash and session
const session = require("express-session");
const flash = require("connect-flash");

// messages
app.use(
  session({
    secret: "secret",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  })
);

// flash messages
app.use(flash());

// route load
app.use("/", web);

// servercreate
app.listen(port, () => console.log("server start localhost:4000"));
