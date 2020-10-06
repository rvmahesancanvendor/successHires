var express = require('express');

const candidatController = require('../Controllers/candidatesController');//routes
const loginController = require('../Controllers/loginController');//routes

var router = express.Router();

router.get('/candidatesList', candidatController.candidatesList);//candidate list
router.post('/createCandidate', candidatController.createCandidate);//create candidate
router.put("/updateCandidateDetails",candidatController.updateCandidate);//update candidate
router.get("/searchResume",candidatController.searchResume);
router.post("/uploadResume",candidatController.uploadResume);//uploadResume candidate
router.get("/deleteCandidate",candidatController.deleteCandidate);//delete candidate
router.get("/downloadResume",candidatController.downloadResume);//download resume candidate
router.get("/getCandidateDetails",candidatController.getCandidateDetails);//get single candidate
router.post("/validateLogin",loginController.validateLogin);//validateLogin  //loginController.validateLogin

router.get("/authLogin",loginController.authLogin);//validateLogin  //loginController.validateLogin

module.exports = router; 