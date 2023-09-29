const express=require("express");
const bodyParser = require("body-parser");
const app=express();
const mongoose = require("mongoose");
require('dotenv').config();
const routes=require("./routes/app")    

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(`${process.env.DB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('open', function () {
  console.log('mongoose connection')
})



app.use("/",routes);

app.listen(3003,function(req,res){
    console.log("listening on")
})