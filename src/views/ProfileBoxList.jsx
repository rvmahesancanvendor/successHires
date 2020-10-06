import React, { Component } from "react";
//import { Grid, Row, Col, Table } from "react-bootstrap";
//import Card from "components/Card/Card.jsx";
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


import ProfileBox from "views/ProfileBox";
class ProfileBoxList extends Component {
  render() {
    return this.props.options.length !== 0?( <>
         {this.props.options.map(option => {
          return <ProfileBox options={option}/>
        })}</>
    ):(<Container className="mt-3" fluid>
    <Row>
      <div className="col">
        <Card className="shadow p-3">
              <span><b> No  </b> Profiles Found</span>
       </Card></div></Row></Container>);
  }
}

export default ProfileBoxList;
/*    {this.props.options.map(option => {
          return <Col md={12}>{option.firstName}
            <ProfileBox/>
            </Col>

          {this.props.options.map(option => {
          return <Col md={12}>
            <ProfileBox/>
            </Col>
        })}
        */
