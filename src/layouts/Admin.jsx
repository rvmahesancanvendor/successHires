import React, { Component } from "react";
import { Route, Switch,Redirect } from "react-router-dom";
import NotificationSystem from "react-notification-system";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
import {style} from "variables/Variables.jsx";
import routes from "routes.js";
import Cookies from 'universal-cookie';
import userImage from "assets/img/brand/blue.png"; 
import { browserHistory } from 'react-router';
import AdminFooter from "components/Footer/Footer.jsx";
import image from "assets/img/brand/blue.png"; 
import { Container } from "reactstrap";

const axios = require("axios").default;
const cookies = new Cookies();
class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: image,
      color: "black",
      hasImage: true,
      fixedClasses: "dropdown show-dropdown open"
    };
  }
  handleNotificationClick = position => {
  };
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={props => (
              <prop.component
                {...props}
                handleClick={this.handleNotificationClick}
              />
            )}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  handleImageClick = image => {
    this.setState({ image: image });
  };
  handleColorClick = color => {
    this.setState({ color: color });
  };
  handleHasImage = hasImage => {
    this.setState({ hasImage: hasImage });
  };
  handleFixedClick = () => {
    if (this.state.fixedClasses === "dropdown") {
      this.setState({ fixedClasses: "dropdown show-dropdown open" });
    } else {
      this.setState({ fixedClasses: "dropdown" });
    }
  };
  componentDidMount() {
    document.body.classList.remove('g-sidenav-pinned');
    var currentToken = cookies.get('canAuthToken');
    if(!currentToken){
       window.location.href="../login/login"; 
       return;
      }
      document.body.classList.remove('bg-default');
  }

  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 ) {
     // document.documentElement.classList.toggle("nav-opens");
    }else{
    
    }
    document.body.classList.remove('bg-default');
   
  }
  hideSideBar = (event) =>{
//console.log(document.body.classList);

if(event.target.classList[0] != "toggleButton")
{
document.body.classList.forEach(element => {
    if(element == "g-sidenav-pinned"){
      document.body.classList.remove('g-sidenav-pinned');
    }
});
}
  }
  render() {
    return (
      <>
        <Sidebar {...this.props} routes={routes} image={this.state.image}
        hasImage={this.state.hasImage} sidebarStyle={style.sideBarStyle}/>
        <div className="main-content"  ref="mainContent" id="panel" onClick={this.hideSideBar}>
          <AdminNavbar
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)} userImage={userImage}
          />
          <Switch onChange={this.hideSideBar}>{this.getRoutes(routes)}  <Redirect from="*" to="/admin/index" /></Switch>
          <Container fluid>
            <AdminFooter />
          </Container>
        </div>
      </>
    );
  }
}

export default Admin;
/* <Footer /> <div className="wrapper " class="" id="panel">
        <NotificationSystem ref="notificationSystem" style={style} />
        <Sidebar {...this.props} routes={routes} image={this.state.image}
        hasImage={this.state.hasImage}/>
        <div id="panel" className="main-panel main-content" ref="mainPanel">
          <AdminNavbar
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
          />
          <Switch>{this.getRoutes(routes)}</Switch>
          <Footer />
        </div>
      </div>*/
 /*
    &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    

      
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }*///if(document.body.classList == "g-sidenav-show g-sidenav-pinned")
    //document.body.classList.remove('g-sidenav-pinned');