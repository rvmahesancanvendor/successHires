import React, { Component } from "react";
import {
   Container,
   Row,
   Col,
   UncontrolledTooltip,
   Badge,
   Card,
   CardHeader,
   CardFooter,
   DropdownMenu,
   DropdownItem,
   UncontrolledDropdown,
   DropdownToggle,
   Media,
   Pagination,
   PaginationItem,
   PaginationLink,
   Progress,
   Table,
 } from "reactstrap";

import Select from "../components/Select.jsx";
import NumberFormat from "react-number-format";
import Swal from 'sweetalert2';
import {style,candidateGetUrl,candidateDeleteUrl,candidateUpdateUrl,candidateResumeUpdateUrl,apiUrl} from "../variables/Variables.jsx";
import NotificationSystem from "react-notification-system";
const axios = require("axios").default;
let selectedUserId = "";
let fData = new FormData();
let config = {
   headers: {
       'content-type': 'multipart/form-data',
       "Access-Control-Allow-Origin": "http://127.0.0.1:5000",
       "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
   }
};

class ViewCandidate extends Component{
    constructor(props,context){
        super(props,context);
        this.state = {
           candidateDetails: {
            firstName:"",
            lastName:"",
            phone:"",
            location:"",
            rate:"",
            gender:"",
            phone:"",
            country:"",
            zipcode:"",
            aboutMe:"",
            address:"",
            resumeDetails:null,
            resumePath:"",
            email:""
           }
        };
        this.genderOptions = ["Select","Male", "Female", "Others"];
        this.handleInput = this.handleInput.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

       
       
    }
    notificationSystem = React.createRef();
    addNotification = (event,level,msg,position="tr") => {
      event.preventDefault();
      const notification = this.notificationSystem.current;
      notification.addNotification({
         title: <span data-notify="icon" className="pe-7s-gift" />,
         message: msg,
         level: level,//"success",//warning, error, info
         position: position,
         autoDismiss: 15
       });
    };

   setCandidateData = async() =>{
      const params = new URLSearchParams(this.props.location.search); 
      await axios.get(candidateGetUrl,{
          params:{
             userId:params.get('userId')
          }
      }).then(({data}) =>{
        // this.state = data;
        console.log(data.candidateDetails[0])
         var candDets = {
            firstName:data.candidateDetails[0].firstName,
            lastName:data.candidateDetails[0].lastName,
            location:data.candidateDetails[0].location,
            rate:data.candidateDetails[0].rate ,
            gender:data.candidateDetails[0].gender,
            phone:data.candidateDetails[0].phone,
            country:data.candidateDetails[0].country,
            zipcode:data.candidateDetails[0].zipcode,
            aboutMe:data.candidateDetails[0].aboutMe,
            address:data.candidateDetails[0].address,
            resumeDetails:null,
            resumePath:data.candidateDetails[0].resumePath,
            email:data.candidateDetails[0].email
         }
         selectedUserId = params.get('userId');
      this.setState({  
         candidateDetails:candDets,selectedUserId:selectedUserId
       }); 
      // console.log(this.state.canidateDetails);
     })
     .catch((err)=>{});
   }

   componentDidMount(){
      this.setCandidateData();
   //   this.setState({ _notificationSystem: this.refs.notificationSystem });
    
   }
   /*(this.state.candidateDetails.firstName === "")?(<div className="content"> <Container fluid> <Row>
    <div className="card">Loading</div></Row></Container></div>):*/
    render(){
       var downloadLink =<div> Existing Resume : <a download href={`${apiUrl}catalog/downloadResume?userId=${this.state.selectedUserId}&fileSrc=${this.state.candidateDetails.resumePath}`} download>Download</a></div>;
         if(this.state.candidateDetails.resumePath == null)
             downloadLink = "";

       return (<><div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="12" xl="12">
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      <Container className="mt--7" fluid>
      {/* Table */}
      <Row>
        <div className="col">
          <Card className="shadow">
            <CardHeader className="border-0">
              <h3 className="mb-0">View Candidate</h3>
            </CardHeader>
      <form className="p-4">
         <div className="row">
            <div className="col-md-4">
               <div className="form-group"><label className="control-label">First Name</label><input placeholder="First Name" type="text" className="form-control" name="firstName" defaultValue={this.state.candidateDetails.firstName}  onChange={this.handleInput}/></div>
            </div>
            <div className="col-md-4">
               <div className="form-group"><label className="control-label">Last Name</label><input placeholder="Last Name" type="text" className="form-control" name="lastName" defaultValue={this.state.candidateDetails.lastName}  onChange={this.handleInput}/></div>
            </div>
            <div className="col-md-4">
               <div className="form-group"><label className="control-label">Email</label><input placeholder="Email" type="text" className="form-control" name="email" defaultValue={this.state.candidateDetails.email}  onChange={this.handleInput}/></div>
            </div>
         </div>
         <div className="row">
            <div className="col-md-6">
               <div className="form-group"><label className="control-label">Location</label><input placeholder="Location" type="text" className="form-control" name="location" defaultValue={this.state.candidateDetails.location}  onChange={this.handleInput}/></div>
            </div>
            <div className="col-md-3">
               <div className="form-group"><label className="control-label">Rate</label>
               <NumberFormat  placeholder="Rate" type="text" className="form-control" name="rate" defaultValue={this.state.candidateDetails.rate} value={this.state.candidateDetails.rate} onChange={this.handleInput}/></div>
            </div>
            <div className="col-md-3">
               <div className="form-group">
               <Select name={"gender"} title={"Gender"}  className="form-control" handleChange={this.handleInput} options={this.genderOptions} defaultValue={this.state.candidateDetails.gender} />
               </div>
            </div>
         </div>
         <div className="row">
            <div className="col-md-4">
               <div className="form-group"><label className="control-label">Phone</label>
               <NumberFormat format="+1 (###) ###-####" mask="_" className="form-control" defaultValue={this.state.candidateDetails.phone} name="phone" value={this.state.candidateDetails.phone} onChange={this.handleInput}/></div>
            </div>
            <div className="col-md-4">
               <div className="form-group"><label className="control-label">Country</label><input  placeholder="Country" type="text" className="form-control"  defaultValue={this.state.candidateDetails.country} name="country"  onChange={this.handleInput}/></div>
            </div>
            <div className="col-md-4">
               <div className="form-group"><label className="control-label">Zip Code</label><input  placeholder="ZIP Code" type="number" className="form-control" name="zipcode"  defaultValue={this.state.candidateDetails.zipcode}  onChange={this.handleInput}/></div>
            </div>
         </div>
         <div className="row">
            <div className="col-md-12">
               <div className="form-group"><label className="control-label">Address</label><input  placeholder="Current Adress" type="text" className="form-control"  name="address"  defaultValue={this.state.candidateDetails.address} onChange={this.handleInput}/></div>
            </div>
         </div>
         <div className="row">
            <div className="col-md-12">
               <div className="form-group"><label className="control-label">Other Details / Profile / Skills</label><textarea  rows="5" placeholder="Here can be your description" name="aboutMe"  onChange={this.handleInput}  defaultValue={this.state.candidateDetails.aboutMe} value={this.state.candidateDetails.aboutMe} id="formControlsTextarea" className="form-control"></textarea></div>
            </div>
         </div>
         <input type="hidden" name="selectedUserId" value={this.state.selectedUserId}/>
         <a href={'../admin/candidates'}  className="btn-fill pull-left btn btn-secondary" style={{marginRight:10+'px'}}>Cancel </a>
         <button type="button" onClick={this.handleUpdate} className="btn-fill pull-left btn btn-primary">Update details</button>
        
         <div className="clearfix"></div>
      </form><NotificationSystem ref="notificationSystem" style={style} />
      </Card>
            </div></Row></Container>

            <Container className="mt-3" fluid>
      <Row>
        <div className="col">
          <Card className="shadow">

   <div className="card p-3 mptt-2">
        <div className="content profileBox">
       {downloadLink}
      <div className="row" id=""fileSection>
            <div className="col-md-8">
               <div className="form-group"><label className="control-label">File</label>
                  <input type="file" onChange={this.handleUpload} name="file" className="form-control"/>
               </div>
            </div>
            <div className="col-md-2 mt-4 pt-2">
               <button type="submit" onClick={this.completeUpload}  className="btn-fill pull-left btn btn-primary">Upload</button>
            </div>
      </div>
      <button type="button" onClick={this.handleDelete} className="btn-fill pull-left btn  btn-danger">Delete</button>
      
      </div> </div> 
      
<NotificationSystem ref={this.notificationSystem} /></Card>
            </div></Row></Container>
            </>
   );
 }

    handleInput(event){
        this.setState({
            [event.target.name]:event.target.value
        });
    }
    
   //upload validation
    handleUpload = (event)=>{
    
     var a = event.target.files[0].name.split(".");
     var allowedTypes = ["doc","docx","pdf","txt"];
     let file = event.target.files[0];
     var fileExt = a[a.length-1];
      if(allowedTypes.indexOf(fileExt) >= 0 && event.target.files[0].size <= 2000000) {
          fData.append("file",file);
          fData.append("selectedUserId",this.state.selectedUserId); 
          fData.append("fileExtension",fileExt);  
          
         // console.log(event.target.files[0])
      }else{
         //addNotification(event,level,msg,position)
         Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "I can't process this file. Retry with pdf, doc, docx, txt files"
          });
         //alert("This file can not be processed")
         event.target.value = null
      }
    }
   

//processing upload
    completeUpload = (event) =>{
      axios.post(candidateResumeUpdateUrl,fData,config).then(function(res){
         var responseJson = (res.data);
           if(responseJson.statusResponse){
              //this.showAlert("br","success","Candidate created successsfully","pe-7s-check");
              //console.log(res.headers)
          //    alert(responseJson.message)
               let timerInterval;
               Swal.fire({
                  icon: 'success',
                  title: responseJson.message,
                  html: '',
                  timer: 1800,
                  timerProgressBar: true,
               onBeforeOpen: () => {
                  Swal.showLoading()
                  timerInterval = setInterval(() => {
                 //    const content = Swal.getContent()
                  //   if (content) {
                   //  const b = content.querySelector('b')
                    // if (b) {
                     //   b.textContent = Swal.getTimerLeft()
                   //  }
                   //  }
                  }, 100)
               },
               onClose: () => {
                  clearInterval(timerInterval)
               }
               }).then((result) => {
               /* Read more about handling dismissals below */
                  window.location.href = "../admin/candidates";
               });
              //setTimeout(()=>this.props.history.push("../admin/candidates"),  1200);
              //window.location.href = "../admin/candidates";
            }else{
               Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: responseJson.message
                });
            }
        }).catch(function(err){
           //console.log(err);
        })

    }



    handleDelete = (event)=>{
      const swalWithBootstrapButtons = Swal.mixin({
         customClass: {
           confirmButton: 'btn btn-success',
           cancelButton: 'btn btn-danger'
         },
         buttonsStyling: false
       })

       swalWithBootstrapButtons.fire({
         title: 'Are you sure?',
         text: "You won't be able to revert this!",
         icon: 'warning',
         showCancelButton: true,
         confirmButtonText: 'Yes, delete it!',
         cancelButtonText: 'No, cancel!',
         reverseButtons: true
       }).then((result) => {
         if (result.value) {
            axios.get(candidateDeleteUrl+"?userId="+this.state.selectedUserId).then(function(res){
               if(res.status){
                     let timerInterval;
                     Swal.fire({
                        icon: 'success',
                        title: "Candidate deleted successfully",
                        html: '',
                        timer: 1800,
                        timerProgressBar: true,
                     onBeforeOpen: () => {
                        Swal.showLoading()
                        timerInterval = setInterval(() => {
                     //    const content = Swal.getContent()
                        //   if (content) {
                        //  const b = content.querySelector('b')
                        // if (b) {
                           //   b.textContent = Swal.getTimerLeft()
                        //  }
                        //  }
                        }, 100)
                     },
                     onClose: () => {
                        clearInterval(timerInterval)
                     }
                     }).then((result) => {
                     /* Read more about handling dismissals below */
                        window.location.href = "../admin/candidates";
                     });
               }
            }).catch(function(err){
               console.log(err);
            });
         } else if (
           /* Read more about handling dismissals below */
           result.dismiss === Swal.DismissReason.cancel
         ) {
          
         }
       })


    
    }
   
    handleUpdate(event){ 
       var candidateDetails={};
      axios.put(candidateUpdateUrl,{
         firstName:this.state.firstName,
         lastName:this.state.lastName,
         phone:this.state.phone,
         location:this.state.location,
         rate:this.state.rate,
         gender:this.state.gender,
         country:this.state.country,
         zipcode:this.state.zipcode,
         aboutMe:this.state.aboutMe,
         address:this.state.address,
         selectedUserId: this.state.selectedUserId,
         email:this.state.email
      }).then(function(res){
       //  console.log(res);
       var responseJson = (res.data);
         if(responseJson.statusResponse){
            //this.showAlert("br","success","Candidate created successsfully","pe-7s-check");
            //console.log(res.headers)
            //alert(responseJson.message);
            let timerInterval;
            Swal.fire({
               icon: 'success',
               title: "Candidate details updated successfully",
               html: '',
               timer: 1800,
               timerProgressBar: true,
            onBeforeOpen: () => {
               Swal.showLoading()
               timerInterval = setInterval(() => {
              //    const content = Swal.getContent()
               //   if (content) {
                //  const b = content.querySelector('b')
                 // if (b) {
                  //   b.textContent = Swal.getTimerLeft()
                //  }
                //  }
               }, 100)
            },
            onClose: () => {
               clearInterval(timerInterval)
            }
            }).then((result) => {
            /* Read more about handling dismissals below */
               window.location.href = "../admin/candidates";
            });


            //setTimeout(()=>this.props.history.push("../admin/candidates"),  1200);
           // window.location.href = "../admin/candidates";
          }else{
            alert(responseJson.message);

          }
      }).catch(function(err){
         console.log(err);
      })
    }
    
}
export default ViewCandidate;
