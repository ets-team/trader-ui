/**
 * Created by 励颖 on 2019/5/16.
 */
import React from "react";
import { DatePicker } from 'antd';
import 'antd/lib/date-picker/style/css';
import moment from 'moment';

//@material-ui/core
import { withStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
//components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import TextField from "@material-ui/core/es/TextField/TextField";

const styles = theme => ({
  root: {
    display: 'flex',
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  button:{
    textAlign: 'center',
    width:'100%',
    color:"#455a64"
  },
  formControl: {
    margin: theme.spacing.unit,
    width:'100%',
  },
  divider:{
    width:'100%',
    marginLeft:"30%"
  },
  listHeader:{
    fontWeight: '700',
    marginTop: '6%',
    marginLeft: '15%'
  },
  picker:{
    marginTop: "2%",
    width: '48%',
    marginLeft: '39%'
  }

});

const items = {
  "":[],
  "Metal":["Gold", "Silver", "Copper", "Aluminium", "Zinc", "Lead", "Nickel", "Tin"],
  "Energy":["Crude Oil", "Fuel Oil", "Pitch", "Rubber"],
  "Derivatives":["Copper Option", "Rubber Option"],
};

const {RangePicker} = DatePicker;

function theDisabledDate(current){
  return current && current > moment().endOf('day');
}

class CreateOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category:"",
      type:"",
      operation:"",
      amount:"",
      orderType:"",
      startMonth:"",
      endMonth:"",
      mode: ['month', 'month'],
      monthValue:[],
      price1: "",
      price2:"",

    }
  }

  handleChangeCategory=(e)=>{
    console.log(e.target.value);
    this.setState({
      category: e.target.value,
      type:""
    })
  };

  handleChangeType=(e)=>{
    console.log(e.target.value);
    this.setState({
      type: e.target.value
    })
  };

  handleChangeOperation=(e)=>{
    console.log(e.target.value);
    this.setState({
      operation: e.target.value
    })
  };

  handleChangeAmount=(e)=>{
    console.log(e.target.value);
    this.setState({
      amount: e.target.value
    })
  };

  handleChangeOrderType=(e)=>{
    console.log(e.target.value);
    this.setState({
      orderType: e.target.value
    })
  };

  handlePanelChange = (value, mode) => {
    this.setState({
      monthValue: value,
      mode: [mode[0] === 'date' ? 'month' : mode[0], mode[1] === 'date' ? 'month' : mode[1]],
    });
  };

  handleMonthChange=(value)=>{
    this.setState({
      monthValue: value
    })
  };

  handleChangePrice1=(e)=>{
    console.log(e.target.value);
    this.setState({
      price1: e.target.value
    })
  }

  handleChangePrice2=(e)=>{
    console.log(e.target.value);
    this.setState({
      price2: e.target.value
    })
  }



  handleItems=(category)=>{
    let selections = items[category];
    let result = [];
    for(let i=0; i<selections.length; i++)
      result.push(
          <MenuItem value={selections[i]}>{selections[i]}</MenuItem>
      )
    return result;
  };

  render(){
    const {classes} = this.props;
    let candidates = this.handleItems(this.state.category);
    return(
        <div>
          <Card chart>
            <CardHeader style={{background:"#37474f"}}/>
              <CardBody>
                <br/>
                <h4/>
                <GridContainer xs={12} sm={12} md={12}>
                  <GridItem xs={12} sm={12} md={3}>
                    <h3 className={classes.listHeader}>Order Info</h3>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2}>
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel>Operation</InputLabel>
                      <Select
                          value={this.state.operation}
                          onChange={this.handleChangeOperation}
                          input={<OutlinedInput/>}
                      >
                        <MenuItem value="buy">Buy</MenuItem>
                        <MenuItem value="sell">Sell</MenuItem>
                      </Select>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2}>
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel>Order Type</InputLabel>
                      <Select
                          value={this.state.orderType}
                          onChange={this.handleChangeOrderType}
                          input={<OutlinedInput/>}
                      >
                        <MenuItem value="buy">Order</MenuItem>
                        <MenuItem value="Limit Order">Limit Order</MenuItem>
                        <MenuItem value="Stop Order">Stop Order</MenuItem>
                        <MenuItem value="Cancel Order">Cancel Order</MenuItem>
                      </Select>
                    </FormControl>
                  </GridItem>
                </GridContainer>
                <br/>
                <GridContainer xs={12} sm={12} md={12}>
                  <GridItem xs={12} sm={12} md={8}>
                    <Divider className={classes.divider}/>
                  </GridItem>
                </GridContainer>
                <br/>
                <GridContainer xs={12} sm={12} md={12}>
                  <GridItem xs={12} sm={12} md={3}>
                    <h3 className={classes.listHeader}>Product Info</h3>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2}>
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel>Category</InputLabel>
                      <Select
                          value={this.state.category}
                          onChange={this.handleChangeCategory}
                          input={<OutlinedInput/>}
                      >
                        <MenuItem value="Metal">Metal</MenuItem>
                        <MenuItem value="Energy">Energy</MenuItem>
                        <MenuItem value="Derivatives">Derivatives</MenuItem>
                      </Select>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2}>
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel>Type</InputLabel>
                      <Select
                          value={this.state.type}
                          onChange={this.handleChangeType}
                          input={<OutlinedInput/>}
                      >
                        {candidates}
                      </Select>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={8}>
                    <FormControl  className={classes.formControl} >
                      <RangePicker
                          className = {classes.picker}
                          placeholder={['Start month', 'End month']}
                          format="YYYY-MM"
                          size="large"
                          disabledDate={theDisabledDate}
                          value={this.state.monthValue}
                          mode={this.state.mode}
                          onChange={this.handleMonthChange}
                          onPanelChange={this.handlePanelChange}
                      />
                    </FormControl>
                  </GridItem>
                </GridContainer>
                <br/>
                <GridContainer xs={12} sm={12} md={12}>
                  <GridItem xs={12} sm={12} md={8}>
                    <Divider className={classes.divider}/>
                  </GridItem>
                </GridContainer>
                <br/>
                <GridContainer xs={12} sm={12} md={12}>
                  <GridItem xs={12} sm={12} md={3}>
                    <h3 className={classes.listHeader}>Trading Info</h3>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2}>
                    <FormControl  className={classes.formControl} >
                      <TextField
                          id="adornment-weight"
                          value={this.state.amount}
                          onChange={this.handleChangeAmount}
                          aria-describedby="weight-helper-text"
                          variant="outlined"
                          label="Amount"
                          InputProps={{
                            endAdornment: <InputAdornment position="end">Lot</InputAdornment>,
                          }}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2}>
                    <FormControl  className={classes.formControl} >
                      <TextField
                          id="adornment-weight"
                          value={this.state.price1}
                          onChange={this.handleChangePrice1}
                          aria-describedby="weight-helper-text"
                          variant="outlined"
                          label="Expectation Price"
                          InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                          }}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2}>
                    <FormControl  className={classes.formControl} >
                      <TextField
                          id="adornment-weight"
                          value={this.state.price2}
                          onChange={this.handleChangePrice2}
                          aria-describedby="weight-helper-text"
                          variant="outlined"
                          label="Limited Price"
                          InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                          }}
                      />
                    </FormControl>
                  </GridItem>
                </GridContainer>
                <br/>
                <br/>
                <br/>
                <br/>
                <GridContainer xs={12} sm={12} md={12}>
                  <GridItem xs={12} sm={12} md={6}>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <Button style={{background:"#546e7a", color:"white", marginLeft:'23%', fontSize:"16px"}}>预览订单</Button>
                    <Button style={{background:"#546e7a", color:"white", marginLeft:'2%', fontSize:"16px"}}>提交订单</Button>
                  </GridItem>
                </GridContainer>
                <br/>
                </CardBody>
              </Card>
        </div>
    )
  }
}
export default withStyles(styles)(CreateOrder);