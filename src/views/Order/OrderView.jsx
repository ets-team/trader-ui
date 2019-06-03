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
    width: '330px',
    borderCollapse: 'collapse',
    marginLeft: '20%'
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
    fontSize: '20px',
    fontWeight: '500',
  },
  button:{
    fontSize: '18px',
    color: '#bf360c',
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
            <tr className={classes.tableHead}>&nbsp;&nbsp;&nbsp;{this.props.orderType}</tr>
            <tr className={classes.tr}>&nbsp;&nbsp;&nbsp;{this.props.operation}&nbsp;{this.props.type}</tr>
            <tr className={classes.tr}>&nbsp;&nbsp;&nbsp;Qty: {this.props.amount}</tr>
            <tr className={classes.tr}>&nbsp;&nbsp;&nbsp;Broker&nbsp;{this.props.broker}</tr>
            <tr className={classes.tr}>
              <Checkbox
                  checked={this.state.checked}
                  onChange={this.handleChangeCheck}
                  value={this.state.checked}
              />
              <span className={classes.span}>I confirm the trade is correct</span>
            </tr>
            <tr className={classes.tr}>
              <Button className={classes.button} >OK</Button>
              <span style={{width: '0%', height:"35px", borderLeft: '10px'}}/>
              <Button className={classes.button} style={{marginLeft:"50%"}}>Cancel</Button>
            </tr>
          </table>
        </div>
    )
  }

}

export default withStyles(styles)(OrderView);