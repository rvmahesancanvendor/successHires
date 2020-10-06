const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/dbdocuments',{useNewUrlParser:true,useUnifiedTopology: true}).then(()=>console.log("DB Connected"));
var db = mongoose.connection;
const dConn = 'mongodb://localhost:27017/dbdocuments';

db.on("error",console.error.bind(console,"Mongo db connection error"));
module.exports = {mongoose,dConn};