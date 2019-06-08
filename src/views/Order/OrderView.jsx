/**
 * Created by 励颖 on 2019/6/3.
 */
import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Slide from "@material-ui/core/Slide";
import Snackbar from "components/Snackbar/Snackbar.jsx";
import ErrorOutline from "@material-ui/icons/ErrorOutline";
import Done from "@material-ui/icons/Done";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const styles = theme => ({
  table:{
    border: '2px solid black',
    width: '430px',
    borderCollapse: 'collapse',
    marginLeft: '10%'
  },
  tableHead:{
    background: '#40c4ff',
    fontSize: '20px',
    fontWeight: '700',
    width: '500%',
    height: '35px',
    lineHeight: '35px',
    marginLeft: '10%'
  },
  tr:{
    fontSize: '20px',
    fontWeight: '500',
    width: '500%',
    height: '35px',
    lineHeight: '35px',
    border: '2px solid black',
  },
  span:{
    fontSize: '18px',
    fontWeight: '500',
  },
  button:{
    fontSize: '18px',
    color: '#455a64',
    fontWeight: '700',
    width: '18%',
  }
});

class OrderView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };

  }

  handleChangeCheck=()=>{
    this.setState({
      checked: !this.state.checked
    })
  };

  closeDialog=()=>{
    this.props.closeDialog();
  };

  handleCommit=()=>{
    if(this.state.orderType === "")
      this.warning("Please choose order type！");
    else if(this.state.operation === "")
      this.warning("Please choose buy / sell！");
    else if(this.state.type === "")
      this.warning("Please choose product type！");
    else if(this.state.amount === "")
      this.warning("Please input the amount！");
    else if(this.state.orderType === "Limit Order" && this.state.price1 === "")
      this.warning("Please input the limit price！");
    else if(this.state.orderType === "Stop Order") {
      if(this.state.price1 === "")
        this.warning("Please input the limit price！");
      else if(this.state.price2 === "")
        this.warning("Please input the stop price！");
    }
    if(!this.state.checked)
      this.warning("Please check whether trade info is correct！");
    else {
      console.log("hello");
      let side="";
      let order_type = this.props.orderType.charAt(0).toLowerCase();
      console.log(order_type);
      if(this.props.operation === "Buy")
        side = 'b';
      else
        side = 's';

      fetch("http://202.120.40.8:30401/order/sendOrder", {
        method:'POST',
        mode:'cors',
        headers:{
          'Accept': '*/*',
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          "amount": this.props.amount,
          "futureID": 0,
          "price": this.props.price,
          "price2": 20,
          "side": side,
          "traderName": cookies.get("username"),
          "type": order_type
        })
      })
      .then(response => {
        console.log('Request successful', response);
        return response.json()
            .then(result => {
              console.log("result:", result);
              if(response.status === 200)
              {
                this.success("订单提交成功,正在处理中...");
                this.props.closeDialog();
                window.location.href = "/order/self"
              }

              else
                this.warning("订单提交失败，请重新提交！");


            });
      });
    }
  };

  Transition(props) {
    return <Slide direction="up" {...props} />;
  }

  typeToIcon = (type) => {
    if (type === "success")
      return Done;
    if (type === "danger")
      return ErrorOutline;
    return null;
  };

  success = (msg) => {
    this.setState({
      notificationType: "success",
      notificationMessage: msg
    });
    this.showNotification("br");
  };

  warning = (msg) => {
    this.setState({
      notificationType: "danger",
      notificationMessage: msg
    });
    this.showNotification("br");
  };

  showNotification = (place) => {
    let x = [];
    x[place] = true;
    this.setState({[place]: true});
    this.alertTimeout = setTimeout(
        function() {
          x[place] = false;
          this.setState(x);
        }.bind(this),
        2000
    );
  };


  render(){
    const {classes} = this.props;
    let order_table;
    if(this.props.orderType === "Market Order")
      order_table = (
          <div>
            <table className={classes.table}>
              <tr className={classes.tableHead}>
                <td>&nbsp;&nbsp;&nbsp;{this.props.orderType}</td>
                <td/>
              </tr>
              <tr className={classes.tr}>
                <td>&nbsp;&nbsp;&nbsp;{this.props.operation}&nbsp;{this.props.type}</td>
                <td/>
              </tr>
              <tr className={classes.tr}>
                <td>&nbsp;&nbsp;&nbsp;Broker&nbsp;{this.props.broker}</td>
                <td/>
              </tr>
              <tr className={classes.tr}>
                <td>&nbsp;&nbsp;&nbsp;Qty: {this.props.amount}</td>
                <td/>
              </tr>
              <tr className={classes.tr}>
                <td>
                  <Checkbox
                      checked={this.state.checked}
                      onChange={this.handleChangeCheck}
                      value={this.state.checked}
                  />
                  <span className={classes.span}>I confirm the trade is correct</span>
                </td>
                <td/>
              </tr>
              <tr className={classes.tr}>
                <td>
                  <Button className={classes.button} onClick={this.handleCommit}>OK</Button>
                </td>
                <td>
                  <Button className={classes.button} style={{marginLeft:"0%"}} onClick={this.closeDialog}>Cancel</Button>
                </td>
              </tr>
            </table>
          </div>
      );
    else if(this.props.orderType === "Cancel Order")
      order_table = (
          <div>
            <table className={classes.table}>
              <tr className={classes.tableHead}>
                <td>&nbsp;&nbsp;&nbsp;{this.props.orderType}</td>
                <td/>
              </tr>
              <tr className={classes.tr}>
                <td>&nbsp;&nbsp;&nbsp;OrderID{this.props.orderID}</td>
                <td/>
              </tr>
              <tr className={classes.tr}>
                <td>&nbsp;&nbsp;&nbsp;Broker&nbsp;{this.props.broker}</td>
                <td/>
              </tr>
              <tr className={classes.tr}>
                <td>
                  <Button className={classes.button} onClick={this.handleCommit}>OK</Button>
                </td>
                <td>
                  <Button className={classes.button} style={{marginLeft:"0%"}} onClick={this.closeDialog}>Cancel</Button>
                </td>
              </tr>
            </table>
          </div>
      );
    else
      order_table = (
          <div>
            <table className={classes.table}>
              <tr className={classes.tableHead}>
                <td>&nbsp;&nbsp;&nbsp;{this.props.orderType}</td>
                <td/>
              </tr>
              <tr className={classes.tr}>
                <td>&nbsp;&nbsp;&nbsp;{this.props.operation}&nbsp;{this.props.type}</td>
                <td/>
              </tr>
              <tr className={classes.tr}>
                <td>&nbsp;&nbsp;&nbsp;Broker&nbsp;{this.props.broker}</td>
                <td/>
              </tr>
              <tr className={classes.tr}>
                <td>&nbsp;&nbsp;&nbsp;Qty: {this.props.amount}</td>
                <td>&nbsp;&nbsp;&nbsp;Price: {this.props.price}</td>
              </tr>

              <tr className={classes.tr}>
                <td>
                  <Checkbox
                      checked={this.state.checked}
                      onChange={this.handleChangeCheck}
                      value={this.state.checked}
                  />
                  <span className={classes.span}>I confirm the trade is correct</span>
                </td>
                <td/>
              </tr>
              <tr className={classes.tr}>
                <td>
                  <Button className={classes.button} onClick={this.handleCommit}>OK</Button>
                </td>
                <td>
                  <Button className={classes.button} style={{marginLeft:"0%"}} onClick={this.closeDialog}>Cancel</Button>
                </td>
              </tr>
            </table>
          </div>
      )

    return (
        <div>
          {order_table}
          <Snackbar
              place="br"
              color={this.state.notificationType}
              icon={this.typeToIcon(this.state.notificationType)}
              message={this.state.notificationMessage}
              open={this.state.br}
              closeNotification={() => this.setState({ br: false })}
              close
          />
        </div>
    )
  }

}

export default withStyles(styles)(OrderView);