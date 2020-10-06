import React, { Component } from "react";
import { Grid } from "react-bootstrap";

import {canthArray, candidatesListUrl} from "variables/Variables.jsx"; 
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
const axios = require("axios").default;
class Candidates extends Component {

    constructor(props){
        super(props);
        this.state = {
            posts:[],
            loading:true,
            error:null,
            numberOfCandidates:0
        };
     
    }
    componentDidMount(){
      this.setState({loading : true});
      axios.get(candidatesListUrl)
      .then(({data}) =>{
        this.setState({loading : false});
        this.setState({ posts: data.candidateList });
        this.setState({numberOfCandidates:data.numberOfCandidates})
      })
      .catch((err)=>{})
    }

    
    renderLoading(){
        return <div className="content"><Grid fluid> <Row>
        <Col md={12}><Card
        title=""
        category=""
        ctTableFullWidth
        ctTableResponsive
    content={<center>Fetching candidates list..</center>}/></Col></Row></Grid></div>;
    }


    renderError() {
      return (
        <div>
          Uh oh: {this.state.error.message}
        </div>
      );
    }
    componentDidUpdate(){
    }
    renderPosts() {
      if(this.state.loading) {
        return this.renderLoading();
      }
      var tableData = this.state.posts.map(function(obj,index){
        var idValue = obj._id;
      return <tr key={index}><td>{index+1}</td><td>{obj.firstName} {obj.lastName}</td><td>{obj.location}</td><td>{obj.gender}</td><td>{obj.rate}</td><td>{obj.phone}</td><td><a href={'../admin/viewCandidateDetails?userId='+idValue}>Edit</a></td></tr>;
      }); 
      if(this.state.posts.length == 0) {
        tableData = <tr><td colSpan="6" className="text-center p-5">No Records Found</td></tr>;
      }
      return (<><div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
      <Container fluid>
        <div className="header-body">
          {/* Card stats */}
          <Row>
            <Col lg="12" xl="12">
              <a style={{marginRight:2+'%'}} size="sm" href="../admin/createCandidate" className="btn btn-sm btn-primary ">Add New</a>
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
          <Table className="align-items-center table-flush" responsive>
            <thead className="thead-light">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Location</th>
                <th scope="col">Gender</th>
                <th scope="col">Rate</th>
                <th scope="col">Phone</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
               {tableData}   
            </tbody>
            <tfoot>
              <td colSpan="3">Number of candidates : {this.state.numberOfCandidates}</td>
            </tfoot>
            </Table>
            </Card>
            </div></Row></Container></>);
    }
    
    render() {
      return ( this.renderPosts()  );
    }
}
export default Candidates;

/*   <a style={{marginRight:2+'%'}} size="sm" href="../admin/createCandidate" className="btn btn-sm btn-primary ">Add New</a>
                      <table className="table align-items-center table-flush">
                      <thead>
                        <tr>
                          {canthArray.map((prop) => {
                            return <th>{prop}</th>;
                          })}
                        </tr>
                      </thead>
                        <tbody>
                          {tableData}
                        </tbody>
                     </table>*/