const express = require('express');//required
const router = express.Router();//required

const canCandidateSchema = require('../Models/canCandidates');//model

const userDetails = require('../Models/userDetails');


const bodyParser = require('body-parser');
const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
var ObjectId = require('mongodb').ObjectID;
var formidable = require("formidable");
var request = require('request');
const mv = require('mv');


//gettting candidates list
exports.candidatesList = async (req,res) => { 
  var lists = await canCandidateSchema.find({});
  if(lists)
    res.send(lists);
  else
    res.status(500).send(JSON.stringify({statusResponse:false,message:"Error occured"}));
}
//get single candidate 
exports.getCandidateDetails = async (req,res)=>{
  if(ObjectId.isValid(req.query.userId)){
    try{
      var singleData = await canCandidateSchema.findById(req.query.userId);
      if(singleData)
          res.send(singleData);
      else
          res.status(500).send(JSON.stringify({statusResponse:false,message:"Error occured"}));
      }catch(Err){
          res.status(500).send(JSON.stringify({statusResponse:false,message:"E Access!"}));
      }
}else{
  res.status(500).send(JSON.stringify({statusResponse:false,message:"Error occured"}));
}
}
exports.searchResume = async (req,res)=>{
  var resumeContains = (req.query.resumeContains)?req.query.resumeContains:"";
  var rateContains = (req.query.rateContains)?req.query.rateContains:"";
   if(resumeContains != "" || rateContains != ""){
     console.log(resumeContains)
    //const $regex = escapeStringRegexp('/'+resumeContains+'$/');
    //console.log($regex);
      var lists = await canCandidateSchema.find({resumeDetails: { $regex: '.*' + resumeContains + '.*' }});
      if(lists)
        res.status(200).send(JSON.stringify({statusResponse:false,message:"No Records Found",profileDetails:lists}));
      else
        res.status(200).send(JSON.stringify({statusResponse:false,message:"No Records Found",profileDetails:null}));
   }else{
      res.status(200).send(JSON.stringify({statusResponse:false,message:"Invalid details",profileDetails:null}));
   }

}
//create CANDIDATE
exports.createCandidate =(req,res)=>{
    let candidates = new canCandidateSchema({
      firstName : req.body.firstName,
      lastName : req.body.lastName,
      email:req.body.email,
      phone:req.body.phone,
      location:req.body.location,
      rate:req.body.rate,
      gender:req.body.gender,
      resumeDetails:req.body.resumeDetails,
      country:req.body.country,
      zipcode:req.body.zipcode,
      aboutMe:req.body.aboutMe,
      address:req.body.address,
      email:req.body.email
    });
    /*let userdets = new userDetails({
      userId:1,
      userName:"admin",
      userPassword:"admin123"
    });
    userdets.save();
    */
    candidates.save().then(
          res.status(200).send(JSON.stringify({statusResponse:true,message:"candidate created successfully"}))    
    ).catch(err => {
          res.status(500).send(JSON.stringify({statusResponse:false,message:"Error creating"}))
    });
}

//updateCandidate
exports.updateCandidate = (req,res) => {
  try{
    canCandidateSchema.findByIdAndUpdate(req.body.selectedUserId, req.body, { new: true }, (err, doc) => {
        if (err == null) { 
          res.status(200).send(JSON.stringify({statusResponse:true,message:"Updated successfully"}));
        }
        else {  res.status(200).send(JSON.stringify({statusResponse:false,message:"Error updating"}));   }
    });
  }catch(Err){
    res.status(500).send(JSON.stringify({statusResponse:false,message:"Error updating"}))
  }
}
 //Working FIne functionalities
 exports.uploadResume = (req,res) => {
    const form = formidable({ multiples: false });
    form.parse(req, (err, fields, files) => {
      if (err) {
        next(err);
        return;
      }
      if(!fields["selectedUserId"])
      {
          res.send({statusResponse:false,message:"Can not process this now"})
          return;
      }
      let userId = fields["selectedUserId"].trim();
      let fileExt = fields["fileExtension"].trim();
     
      var newpath  ="";
      var newFileName = "";
      let fileContents = "";
      for (var file in files) {
        if (!files.hasOwnProperty(file)) continue;
        var oldpath = files[file].path;
        var date_ = Date.now();
        newFileName = (date_)+"_re_"+files[file].name;
        newpath = "C:\\resuploads\\"+newFileName;
        //resumePath = newpath
      // fs.renameSync(oldpath, newpath);
	  mv(oldpath, "C:\\resuploads\\"+newFileName, function (err) {
      
         if (err) {
             console.log('> FileServer.jsx | route: "/files/upload" | err:', err);
              res.send({statusResponse:false,message:"Error uploading"});
            // throw err;
         }else{
			 console.log('http://globalbasket.canvendor.com:3005/webAPI.php?filename='+newFileName+'&fileType='+fileExt+'&user_mango_id='+userId);
          request('http://globalbasket.canvendor.com:3005/webAPI.php?filename='+newFileName+'&fileType='+fileExt+'&user_mango_id='+userId, async function(error, response, body) {
                if (!error && response.statusCode == 200) {
                }
                fileContents =  await body;
                /*var resume = {
                  resumePath:newFileName,resumeDetails:fileContents.trim()
                };*/
				//console.log(resume);
				console.log(fileContents);
                //canCandidateSchema.findByIdAndUpdate(userId,resume, { new: true }, (err, doc) => {
                  if (err == null) { 
                    res.status(200).send(JSON.stringify({statusResponse:true,message:"Updateds successfully"+fileContents}));
                  }
                  else {  res.status(200).send(JSON.stringify({statusResponse:false,message:"Error updating"}));   }
              //  });
            });
         }
     });
	
	 
    }//end for each
  });
}
exports.downloadResume = (req,res)=>{
  try{
    if (ObjectId.isValid(req.query.userId)){
    canCandidateSchema.findById(req.query.userId, (err, doc) => {
      if (!err) {
        const file =  `C:/resuploads/${doc.resumePath}`;
        res.download(file);
      }else{
          res.send({statusResponse:false,message:"Updated successfully"})
      }
    });
   }
 }catch(err){
  res.send({statusResponse:false,message:"Updated successfully"})
 }
}
exports.deleteCandidate = (req,res)=>{
    if (!ObjectId.isValid(req.query.userId))
          return res.status(400).send(`No  record with given id 33 : ${req.query.userId}`);
         canCandidateSchema.findByIdAndDelete(req.query.userId, (err, doc) => {
          if (!err) {res.send(true); }
          else { console.log('Error in Retriving Employee :' + JSON.stringify(err, undefined, 2)); }
      });
}
