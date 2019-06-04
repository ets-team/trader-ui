/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Cookies from 'universal-cookie';
// core components
import Header from "components/Header/Header.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import PrimarySearchAppBar from "components/AppBar/AppBar.jsx";
import LoginPage from "views/Login/LoginPage.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";
import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";
import { deepRoutes, dashboardRoutes } from "routes/dashboard.jsx";


const cookies = new Cookies();
let ps;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      login: cookies.get("login"),
      userId: cookies.get("userId"),
    };
    this.resizeFunction = this.resizeFunction.bind(this);
  }


  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };


  resizeFunction() {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }


  componentDidMount() {
    window.addEventListener("resize", this.resizeFunction);

  }

  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }

  setPsRef = (element) => {
    this.psRef = element;
    if (navigator.platform.indexOf("Win") > -1  && element){
      ps = new PerfectScrollbar( element, {
        suppressScrollX: true,
        suppressScrollY: false,
      })
    };
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
  }

  render() {
    const { classes, ...rest } = this.props;
    const {login, userId} = this.state;
    if (!login){
      return <LoginPage handleLogin={this.handleLogin}/>;
    }
    return (
      <div className={classes.wrapper} ref={this.setPsRef}>
        <Sidebar
          routes={dashboardRoutes}
          logoText={"Future Trading"}
          logo={logo}
          image={image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color="blue"
          {...rest}
        />
        <div className={classes.mainPanel} ref="mainPanel">
          <PrimarySearchAppBar style={{boxShadow:"0px 0px 0px #e0e0e0"}} color="transparent"/>
          {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          <Switch >
            {
              deepRoutes.map((prop, key) => {
                if (prop.redirect)
                  return <Redirect from={prop.path} to={prop.to} key={key} />;
                return <Route exact path={prop.path} key={key} render={ (props) => <prop.component  {...props}/> } />;
              })
            }
          </Switch>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(App);
