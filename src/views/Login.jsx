import React, { Component } from "react";
import {loginUrl} from "variables/Variables.jsx"; 
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";


const axios = require("axios").default;
const cookies = new Cookies();
class Login extends Component {
    constructor(props,context){
        super(props,context);
        let loginState = false;
        this.state = {
            loading:true,
           loginState:false,
           userId:"",
           userName:"",
           userPassword:"",
        };
        this.handleInput = this.handleInput.bind(this);
        this.validateLogin = this.validateLogin.bind(this);
    }
    componentDidMount(){
    }

    handleInput(event){
        this.setState({
            [event.target.name]:event.target.value
        });
       
    }
  
    validateLogin(event){
        axios.post(loginUrl,{
            userName:this.state.userName,
            userPassword:this.state.userPassword
         }).then(function(res){
            if(res.data.statusResponse == 'true'){
               //this.showAlert("br","success","Candidate created successsfully","pe-7s-check");
               //alert("Candidate created successfully"); 
               //setTimeout(()=>this.props.history.push("../admin/candidates"),  1200);
               let d = new Date();
               d.setTime(d.getTime() + (d.getMinutes()*60*1000));
               var expiryDate = new Date(Number(new Date()) + 315360000000); 
               cookies.set('canAuthToken', res.data.token, { path: '/',expires: d });
               let timerInterval;
               Swal.fire({
                  icon: 'success',
                  title: res.data.message,
                  html: 'Please wait you will be redirected in a moment',
                  timer: 800,
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
                 
               window.location.href = "../admin/dashboard";
               });


               
             }else{
              // alert(res.data.message);
             //  this.state.loginState = true;
             //  this.loginState =true;
               //this.setState({loginState:true});
               Swal.fire('Oops...', res.data.message, 'error')
             }
         }).catch(function(err){
            console.log(err);
         })
    }
  render() {
    return (
      <div className="main-content">
        <div className="header bg-gradient-info py-7 py-lg-8">
            <div className="header-body text-center mb-7">
                  <h1 className="text-white">Welcome!</h1>
                  <p className="text-lead text-light">
                    Use these awesome forms to login or create new account in
                    your project for free.
                  </p>
            </div>
          <div className="separator separator-bottom separator-skew zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-default"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
        </div>
        <div className="container mt--8 pb-5">
      <div className="row justify-content-center">
        <div className="col-lg-5 col-md-7">
          <div className="card bg-secondary border-0 mb-0">
            <div className="card-header bg-transparent pb-4">
              <div className="text-muted text-center mt-2"><small>Sign in</small></div>
            </div>
            <div className="card-body px-lg-5 py-lg-5">
        <form role="form">
                <div className="form-group mb-3">
                  <div className="input-group input-group-merge input-group-alternative">
                    <div className="input-group-prepend">
                      <span className="input-group-text"><i className="ni ni-email-83"></i></span>
                    </div>
                    <input className="form-control"  name="userName" onChange={this.handleInput}  placeholder="Email" type="email"/>
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group input-group-merge input-group-alternative">
                    <div className="input-group-prepend">
                      <span className="input-group-text"><i className="ni ni-lock-circle-open"></i></span>
                    </div>
                    <input className="form-control" name="userPassword" type="password" onChange={this.handleInput}  placeholder="Password" type="password"/>
                  </div>
                </div>
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input className="custom-control-input" id="customCheckLogin" type="checkbox"/>
                  <label className="custom-control-label">
                    <span className="text-muted">Remember me</span>
                  </label>
                </div>
                <div className="text-center">
                  <button type="button"  onClick={this.validateLogin} className="btn btn-primary my-4">Sign in</button>
                </div>
              </form>    </div>    </div> </div> </div>
      </div></div>);
  }
}

export default Login;
