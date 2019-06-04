/**
 * Created by 励颖 on 2019/6/3.
 */
import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

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
    color: '#e91e63',
    fontWeight: '700',
    width: '18%',
  }
});

class OrderView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    }
  }

  handleChangeCheck=()=>{
    this.setState({
      checked: !this.state.checked
    })
  };

  render(){
    const {classes} = this.props;
    return(
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
              <td>&nbsp;&nbsp;&nbsp;Qty: {this.props.amount}</td>
              <td>&nbsp;&nbsp;&nbsp;Price: {this.props.price}</td>
            </tr>
            <tr className={classes.tr}>
              <td>&nbsp;&nbsp;&nbsp;Broker&nbsp;{this.props.broker}</td>
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
                <Button className={classes.button} >OK</Button>
              </td>
              <td>
                <Button className={classes.button} style={{marginLeft:"0%"}}>Cancel</Button>
              </td>
            </tr>
          </table>
        </div>
    )
  }

}

export default withStyles(styles)(OrderView);