/**
 * Created by 励颖 on 2019/5/16.
 */
import React from "react";
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
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
//components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";
//icons
import ErrorOutline from "@material-ui/icons/ErrorOutline";
import Done from "@material-ui/icons/Done";

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
    width:'80%',
    marginLeft:"50%"
  },
  listHeader:{
    fontWeight: '700',
    marginTop: '4%',
    marginLeft: '40%'
  },
  picker:{
    marginTop: "2%",
    width: '48%',
    marginLeft: '39%'
  },
  textField: {
    width: 200,
  },
  dateField:{
    width:"100%",
    marginTop:"18px"
  }
});

const items = {
  "":[],
  "Metal":["Gold", "Silver", "Copper", "Aluminium", "Zinc", "Lead", "Nickel", "Tin"],
  "Energy":["Crude Oil", "Fuel Oil", "Pitch", "Rubber"],
  "Derivatives":["Copper Option", "Rubber Option"],
};


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
      price1: "",
      price2:"",
      disable_price1: false,
      disable_price2: false,
      preview: false,

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
    if(e.target.value === "cancel" && this.state.orderType !== "Cancel Order" )
    {
      this.warning("Operation doesn't match with order type！");
      this.setState({
        operation:""
      });
    }
    else
      this.setState({
        operation: e.target.value
      })
  };

  handleChangeAmount=(e)=>{
    console.log(e.target.value);
    if(isNaN(e.target.value))
      this.warning("The amount you input is invalid！");
    this.setState({
      amount: e.target.value
    })
  };

  handleChangeOrderType=(e)=>{
    console.log(e.target.value);
    this.setState({
      orderType: e.target.value,
      operation:"",
    });
    if(e.target.value === "Market Order" || e.target.value === "Stop Order")
      this.setState({
        disable_price1: true,
        disable_price2: true,
        operation:"",
      });
    else if(e.target.value === "Limit Order")
      this.setState({
        disable_price2: true,
      });
    else if (e.target.value === "Cancel Order")
      this.setState({
        operation: "cancel"
      });
  };

  handleChangeStartMonth=(e)=>{
    console.log(e.target.value);
    this.setState({
      startMonth: e.target.value
    })
  };

  handleChangeEndMonth=(e)=>{
    this.setState({
      endMonth: e.target.value
    })
  };

  handleChangePrice1=(e)=>{
    console.log(e.target.value);
    if(isNaN(e.target.value))
      this.warning("The Expectation Price you input is invalid！");
    this.setState({
      price1: e.target.value
    })
  };

  handleChangePrice2=(e)=>{
    console.log(e.target.value);
    if(isNaN(e.target.value))
      this.warning("The Limited Price you input is invalid！");
    this.setState({
      price2: e.target.value
    })
  };

  handleChangeDialog=()=>{
    this.setState({
      preview: !this.state.preview
    })
  };



  handleItems=(category)=>{
    let selections = items[category];
    let result = [];
    for(let i=0; i<selections.length; i++)
      result.push(
          <MenuItem value={selections[i]}>{selections[i]}</MenuItem>
      )
    return result;
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
    let candidates = this.handleItems(this.state.category);
    return(
        <div>
          <Card chart>
            <CardHeader style={{background:"#37474f"}}/>
              <CardBody>
                <br/>
                <h4/>
                <GridContainer xs={12} sm={12} md={12}>
                  <GridItem xs={12} sm={12} md={4}>
                    <h3 className={classes.listHeader}>Order Info</h3>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2}>
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel>Order Type</InputLabel>
                      <Select
                          value={this.state.orderType}
                          onChange={this.handleChangeOrderType}
                          input={<OutlinedInput/>}
                      >
                        <MenuItem value="Market Order">Market Order</MenuItem>
                        <MenuItem value="Limit Order">Limit Order</MenuItem>
                        <MenuItem value="Stop Order">Stop Order</MenuItem>
                        <MenuItem value="Cancel Order">Cancel Order</MenuItem>
                      </Select>
                    </FormControl>
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
                        <MenuItem value="cancel">Cancel</MenuItem>
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
                  <GridItem xs={12} sm={12} md={4}>
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
                </GridContainer>
                <GridContainer xs={12} sm={12} md={12}>
                  <GridItem xs={12} sm={12} md={4}/>
                  <GridItem xs={12} sm={12} md={2}>
                    <FormControl  className={classes.formControl} >
                      <TextField
                          id="date"
                          label="Start Month"
                          type="month"
                          defaultValue="2019-07"
                          className={classes.dateField}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          variant="outlined"
                          onChange={this.handleChangeStartMonth}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2}>
                    <FormControl  className={classes.formControl} >
                      <TextField
                          id="date"
                          label="End Month"
                          type="month"
                          defaultValue="2020-06"
                          className={classes.dateField}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          variant="outlined"
                          onChange={this.handleChangeEndMonth}
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
                  <GridItem xs={12} sm={12} md={4}>
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
                          disabled={this.state.disable_price1}
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
                          disabled={this.state.disable_price2}
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
                <br/>
                <GridContainer xs={12} sm={12} md={12}>
                  <GridItem xs={12} sm={12} md={8}>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <Button style={{background:"#546e7a", color:"white", marginLeft:'-2%',fontSize:"16px"}}>预览订单</Button>
                    <Button style={{background:"#546e7a", color:"white", marginLeft:'2%', fontSize:"16px"}}>提交订单</Button>
                  </GridItem>
                </GridContainer>
                <br/>
                </CardBody>
              </Card>
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
export default withStyles(styles)(CreateOrder);