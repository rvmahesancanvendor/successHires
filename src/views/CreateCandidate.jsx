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
import Swal from 'sweetalert2';
import NumberFormat from "react-number-format";
import {candidatePostUrl,style} from "../variables/Variables.jsx";
import NotificationSystem from "react-notification-system";
import { Redirect } from 'react-router-dom';
import Candidates from "../views/Candidates.jsx";
const axios = require("axios").default;

class CreateCandidate extends Component{
    constructor(props,context){
        super(props,context);
        this.state ={
            firstName:"",
            lastName:"",
            phone:"",
            location:"",
            rate:"",
            gender:"",
            resumeDetails:"",
            country:"",
            zipcode:"",
            aboutMe:"",
            address:"",
            email:""
            
        };
        this.genderOptions = ["Select gender","Male", "Female", "Others"];
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
 
    render(){
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
              <h3 className="mb-0">Candidates List</h3>
            </CardHeader>
      <form className="p-4">
         <div className="row">
            <div className="col-md-4">
               <div className="form-group"><label className="control-label">First Name</label><input placeholder="First Name" type="text" className="form-control" name="firstName" defaultValue={this.state.firstName}  onChange={this.handleInput}/></div>
            </div>
            <div className="col-md-4">
               <div className="form-group"><label className="control-label">Last Name</label><input placeholder="Last Name" type="text" className="form-control" name="lastName" defaultValue={this.state.lastName}  onChange={this.handleInput}/></div>
            </div>
          
            <div className="col-md-4">
               <div className="form-group"><label className="control-label">Email</label><input placeholder="Last Name" type="text" className="form-control" name="email" defaultValue={this.state.email}  onChange={this.handleInput}/></div>
            </div>
          
         </div>
         <div className="row">
            <div className="col-md-6">
               <div className="form-group"><label className="control-label">Location</label><input placeholder="Location" type="text" className="form-control" name="location" defaultValue={this.state.location}  onChange={this.handleInput}/></div>
            </div>
            <div className="col-md-3">
               <div className="form-group"><label className="control-label">Rate</label>
               <NumberFormat  placeholder="Rate" type="text" className="form-control" name="rate" defaultValue={this.state.rate} onChange={this.handleInput}/></div>
            </div>
            <div className="col-md-3">
               <div className="form-group">
                <Select name={"gender"} title={"Gender"}  className="form-control" handleChange={this.handleInput} options={this.genderOptions} placeholder={""}/>
               </div>
            </div>
         </div>
         <div className="row">
            <div className="col-md-12">
               <div className="form-group"><label className="control-label">Address</label><input  placeholder="Home Adress" type="text" className="form-control" name="address"  defaultValue={this.state.address}  onChange={this.handleInput}/></div>
            </div>
         </div>
         <div className="row">
            <div className="col-md-4">
               <div className="form-group"><label className="control-label">Phone</label><NumberFormat format="+1 (###) ###-####" mask="_" className="form-control" defaultValue={this.state.phone} name="phone" onChange={this.handleInput}/></div>
            </div>
            <div className="col-md-4">
               <div className="form-group"><label className="control-label">Country</label><input  placeholder="Country" type="text" className="form-control"  name="country"  defaultValue={this.state.country} onChange={this.handleInput}/></div>
            </div>
            <div className="col-md-4">
               <div className="form-group"><label className="control-label">Postal Code</label><input  placeholder="ZIP Code" type="number"  name="zipcode"  defaultValue={this.state.zipcode} className="form-control"  onChange={this.handleInput}/></div>
            </div>
         </div>
         <div className="row">
            <div className="col-md-12">
               <div className="form-group"><label className="control-label">Other Details / Profile / Skills</label><textarea name="aboutMe" rows="5" placeholder="Here can be your description" id="formControlsTextarea"   defaultValue={this.state.aboutMe}   className="form-control"  onChange={this.handleInput}></textarea></div>
            </div>
         </div>
         <a href={'../admin/candidates'}  className="btn-fill pull-left btn btn-secondary" style={{marginRight:10+'px'}}>Cancel </a>
         <button type="button" onClick={this.handleSubmit} className="btn-fill pull-left btn btn-primary">Create </button>
         <div className="clearfix"></div>
      </form>
            </Card>
            </div></Row></Container></>);




    }
    handleInput(event){
        this.setState({
            [event.target.name]:event.target.value
        });
    }
    handleSubmit(event){ 
      axios.post(candidatePostUrl,{
         firstName:this.state.firstName,
         lastName:this.state.lastName,
         phone:this.state.phone,
         location:this.state.location,
         rate:this.state.rate,
         gender:this.state.gender,
         resumeDetails:"",
         country:this.state.country,
         zipcode:this.state.zipcode,
         aboutMe:this.state.aboutMe,
         address:this.state.address,
         email:this.state.email
      }).then(function(res){
         console.log(res);
         if(res.status){
            //this.showAlert("br","success","Candidate created successsfully","pe-7s-check");
          // alert("Candidate created successfully"); 
       
          let timerInterval;
          Swal.fire({
             icon: 'success',
             title: "Candidate created successfully",
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


         //  setTimeout(()=>this.props.history.push("../admin/candidates"),  1200);
         //window.location.href = "../admin/candidates";
          }
      }).catch(function(err){
         console.log(err);
      })
      /*  fetch(candidatePostUrl,{
            method:"POST",
            body:JSON.stringify(this.state),
            header:{
                Accept:"application/json",
                "Content-type":"application/json"
            }
        }).then(function(response){
            return response.text();
        }).then((responseJson) => {
           console.log(responseJson);
           if(responseJson.status){
               this.showAlert("br","success","Candidate created successsfully","pe-7s-check");
               setTimeout(()=>this.props.history.push("../admin/candidates"),  1200);
            }
         });
        /*
        .then(response=>{
            response.json().then(data=>{
                console.log(data);   
            })
        });
        */
    }
    
}
export default CreateCandidate;