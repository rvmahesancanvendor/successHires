
import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

//import "bootstrap/dist/css/bootstrap.min.css";
//import "./assets/css/animate.min.css";
//import "./assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
//import "./assets/css/demo.css";
import "assets/plugins/nucleo/css/nucleo.css";
//import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/css/argon-dashboard-react.css";


import AdminLayout from "layouts/Admin.jsx";
import LoginLayout from "layouts/Login.jsx";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/admin" render={props => <AdminLayout {...props} />} />
      <Route path="/login" render={props => <LoginLayout {...props} />} />
      <Redirect from="/" to="/admin/dashboard" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
