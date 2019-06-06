import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

import Snackbar from "components/Snackbar/Snackbar.jsx";

import ErrorOutline from "@material-ui/icons/ErrorOutline";
import Done from "@material-ui/icons/Done";
import Person from "@material-ui/icons/Person";

import { userController } from "variables/general.jsx";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(700 + theme.spacing.unit * 3 * 2)]: {
            width: 700,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: "#455a64",
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
        background: '#607d8b'
    },
    register: {
      marginTop: theme.spacing.unit * 3,
      background: '#b0bec5'
    },
});

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",

      bc: false,
      notificationMessage: "null",
      notificationType: null
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  handleLogin = e => {
    e.preventDefault();
    console.log("hello");
    console.log(this.state.username);
      console.log(this.state.password);
    if(this.state.username !== "root")
        alert("用户名不正确");
    else if(this.state.password !== "123456")
        alert("密码错误");
    else
    {
      console.log("success");
      alert("登录成功");
      cookies.set("login", true, { path: "/" });
      cookies.set("username", this.state.username, { path: "/" });
      cookies.set("userId", "0001", { path: "/" });
      window.location.href = "/";
    }


  };

  showNotification = () => {
    this.setState({ bc: true });
    this.alertTimeout = setTimeout(
      function() {
        this.setState({ bc: false });
      }.bind(this),
      6000
    );
  };

  typeToIcon = type => {
    if (type === "success") return Done;
    if (type === "danger") return ErrorOutline;
    return null;
  };

  success = msg => {
    this.setState({
      notificationType: "success",
      notificationMessage: msg
    });
    this.showNotification();
  };

  warning = msg => {
    this.setState({
      notificationType: "danger",
      notificationMessage: msg
    });
    this.showNotification();
  };

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <Person />
          </Avatar>
          <br/>
          <Typography component="h1" variant="h5" style={{fontWeight:'600', color:"#455a64"}}>
            Future Trading System
          </Typography>
          <form className={classes.form}>

            <FormControl margin="normal" variant="outlined" required style={{width:"50%", marginLeft:"25%"}}>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input
                id="username"
                name="username"
                autoComplete="tel-local"
                autoFocus
                onChange={this.handleChange}
              />
            </FormControl>
            <br/>
            <FormControl margin="normal" variant="outlined" required style={{width:"50%", marginLeft:"25%"}}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.handleChange}
              />
            </FormControl>
            <br/>
            <FormControl margin="normal" variant="outlined" required style={{width:"50%", marginLeft:"25%"}}>
              <InputLabel >Port</InputLabel>
              <Select
                  value={this.state.port}
                  onChange={this.handleChange}
                  input={<Input name="port" id="port"/>}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              <FormHelperText>Choose the trader gateway you want to connect</FormHelperText>
            </FormControl>
            <br/>
            <Button
              style={{width: '25%', marginLeft: '23%'}}
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleLogin}
            >
              Login
            </Button>
            <Button
                style={{width: '25%', marginLeft: '5%'}}
                variant="contained"
                color="primary"
                className={classes.register}
            >
              Register
            </Button>
          </form>
        </Paper>
        <Snackbar
          place="bc"
          color={this.state.notificationType}
          icon={this.typeToIcon(this.state.notificationType)}
          message={this.state.notificationMessage}
          open={this.state.bc}
          closeNotification={() => this.setState({ bc: false })}
          close
        />
      </main>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoginPage);
