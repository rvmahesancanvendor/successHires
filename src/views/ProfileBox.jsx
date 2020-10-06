import React, { Component } from "react";
//import { Grid, Row, Col } from "react-bootstrap";
//import Card from "components/Card/Card";
//import { thArray, tdArray } from "variables/Variables.jsx";
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
class ProfileBox extends Component {
  render() {
    var linkHref =`../admin/viewCandidateDetails?userId=${this.props.options._id}` ;
    return (<Container className="mt-3" fluid>
    <Row>
      <div className="col">
        <Card className="shadow p-3">
      <div className="">
        <div className="content profileBox p-3">
            <a href={linkHref} target="_blank"><h4 className="title">{this.props.options.firstName} {this.props.options.lastName}</h4> </a>
            <div className="row">
              <div className="col-md-6">
                  {this.props.options.email}
              </div>
              <div className="col-md-6">
                  Contact : {this.props.options.phone}
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                Current Location : {this.props.options.location}
              </div>
              <div className="col-md-6">
                 Rate : {this.props.options.rate}
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                 Gender :  {this.props.options.gender}
              </div>
              <div className="col-md-4">
                 Country :  {this.props.options.country}
              </div>
              <div className="col-md-4">
                 Zip Code :  {this.props.options.zipcode}
              </div>
            </div>

                
        </div>
      </div>
       </Card></div></Row></Container>);
  }
}

export default ProfileBox;
