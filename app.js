const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { format } = require("express/lib/response");

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static("public"));

mongoose.connect(
  "mongodb+srv://rishavjain:XxA1BES4Q7txZocZ@cluster0.urrob.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

const noticeSchema = new mongoose.Schema({
  past: String,
  present: String,
  future: String,
});

const Notice = mongoose.model("notice", noticeSchema);

app.get("/", (req, res) => {
  Notice.find({}, (err, found) => {
    if (err) {
      console.log(err);
    } else {
      
      res.render("index",{arr:found});
    }
  });
  
});

app.get("/notice", (req, res) => {
  res.render("notice");
});

app.post("/notice", (req, res) => {
  console.log(req.body);
  const notice1 = req.body.input_notice;
  if (req.body.ppf === "past") {
    const newNotice = new Notice({
      past: notice1,
      present:"",
      future:""
    });
    Notice.insertMany([newNotice], (err) => {
      if (err) {
        console.log(err);
      }
    });
  } else if (req.body.ppf === "present") {
    const newNotice = new Notice({
      past:'',
      present: notice1,
      future:''
    });
    Notice.insertMany([newNotice], (err) => {
      if (err) {
        console.log(err);
      }
    });
  } else {
    const newNotice = new Notice({
      past:'',
      present:'',
      future: notice1,
    });
    Notice.insertMany([newNotice], (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
  
  console.log("Notice Submitted Successfully!");
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// XxA1BES4Q7txZocZ
