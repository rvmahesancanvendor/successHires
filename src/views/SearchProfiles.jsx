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
import ProfileBoxList from "views/ProfileBoxList";
import NumberFormat from "react-number-format";
import {
    candidatePostUrl,candidatesListUrl,
    style,
    candidateSearchUrl
    ,apiUrl} from "../variables/Variables.jsx";
import NotificationSystem from "react-notification-system";
const axios = require("axios").default;

class SearchProfiles extends Component{
    constructor(props,context){
        super(props,context);
        this.state = {
            profiles:[],
            loading:true,
            error:null,
            resumeContains:""
        };  
        this.handleInput = this.handleInput.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }
componentDidMount(){
    this.setState({loading : false});
    this.setState({ profiles: [] });
}
renderLoading(){
    return <Container className="mt-3" fluid>
    <Row>
      <div className="col">
        <Card className="shadow p-3">
              <span>Searching Profiles</span>
       </Card></div></Row></Container>;
}
renderError() {
  return (
    <div>
      Uh oh: {this.state.error.message}
    </div>
  );
}



render(){
      let profileList;
      if(!this.state.loading) {
        profileList = <ProfileBoxList options={this.state.profiles} />
      }else{
        profileList = this.renderLoading();
      }       
       return (<><div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
           <Container fluid>
             <div className="header-body">
               <Row>
                 <Col lg="12" xl="12">
                 </Col>
               </Row>
             </div>
           </Container>
         </div>
         <Container className="mt--7" fluid>
         <Row>
           <div className="col">
             <Card className="shadow">
               <CardHeader className="border-0">
                 <h3 className="mb-0">Search Candidates</h3>
               </CardHeader>
                          <form className="p-4">
                            <div className="row">
                                <div className="col-md-6">
                                  <div className="form-group"><label className="control-label">Search Key</label><input placeholder="Name, Keyskills, Company name, location ..." type="text" className="form-control" name="resumeContains" onChange={this.handleInput}/></div>
                                </div>
                              
                                <div className="col-md-2 mt-2">
                                <button type="button" onClick={this.handleSearch} className="mt-4 btn-fill pull-left btn btn-primary">Find</button>
                                </div>
                            </div>
                            <div className="clearfix"></div>
                          </form>
                          </Card></div></Row></Container>{profileList}</>);
    }

    
    handleInput(event){
        this.setState({
            [event.target.name]:event.target.value
        });
    }
    handleSearch(event){ 
      this.setState({loading:true});
      axios.get(candidateSearchUrl,{
        params:{
            resumeContains:this.state.resumeContains
         }
      }).then(({data}) =>{
        this.setState({loading:false});
        if(data.profileDetails == null)
            alert(data.message);
        if(data.profileDetails != null)
            this.setState({ profiles: data.profileDetails });
            console.log(this.state.profiles)
      })
      .catch((err)=>{});
     
    }
}
export default SearchProfiles;