const express = require('express');//required
const userDetailsSchema = require('../Models/userDetails');//model
const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
var request = require('request');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
exports.validateLogin = async (req,res) => {
    var userDetails = await userDetailsSchema.findOne({userName:req.body.userName,userPassword:req.body.userPassword});
    try{
    if(userDetails.userName){       
             var token = jwt.sign({ id: userDetails.userId }, 'supersecret', {
                expiresIn: 86400 // expires in 24 hours
              });
              res.status(200).send(JSON.stringify({statusResponse:true,message:"Valid Login",token: token}));     
    }else{
        res.status(200).send(JSON.stringify({statusResponse:false,message:"Invalid Login"}));
    }
  }catch(err){
    res.status(200).send(JSON.stringify({statusResponse:false,message:"Invalid Login"}));
  }
}
exports.authLogin = async (req,res) => {
    var ress  = jwt.verify(req.query.userId, 'supersecret', function(err, decoded) {
		  if (err)
			return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
          else 
			return res.status(200).send({ auth: true, message:  decoded.id+' valid login '+req.query.userId });
        // if everything good, save to request for use in other routes
      });
    console.log(ress);
}