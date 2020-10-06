const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let userDetailsSchema = new Schema(
  {
    userId:    { type: Number ,  default: 0 },
    userName:     { type: String },
    userPassword:        { type: String },
    authToken:{type:String}
  },{
    collection:"userDetails"
  }
);
module.exports = mongoose.model('userDetails', userDetailsSchema);