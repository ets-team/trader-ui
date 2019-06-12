/**
 * Created by 励颖 on 2019/5/16.
 */
import React from "react";
import ChartistGraph from "react-chartist";
import { successColor } from "assets/jss/material-dashboard-react.jsx";
//@material-ui/core
import { withStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
//@material-ui/icons
import Search from "@material-ui/icons/Search";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
//components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop:"20px"
  },
  header:{
    color:"#424242",
    fontSize:"20px",
    fontWeight:"700",
    textAlign:"center",
    border:"1px solid black",
    height:"45px",
  },
  body:{
    fontSize:"20px",
    fontWeight:"600",
    textAlign:"center",
    border:"1px solid black",
    height:"40px"
  },
  successText: {
    color: successColor
  },
  upArrowCardCategory: {
    width: "16px",
    height: "16px"
  },
  stats: {
    color: "#999999",
    display: "inline-flex",
    fontSize: "12px",
    lineHeight: "22px",
    "& svg": {
      top: "4px",
      width: "16px",
      height: "16px",
      position: "relative",
      marginRight: "3px",
      marginLeft: "3px"
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      top: "4px",
      fontSize: "16px",
      position: "relative",
      marginRight: "3px",
      marginLeft: "3px"
    }
  },
  cardCategory: {
    color: "#999999",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    paddingTop: "10px",
    marginBottom: "0"
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitle: {
    color: "#3C4858",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontWeight: "400",
      lineHeight: "1"
    },
    formControl: {
      margin: theme.spacing.unit,
      width:'500%',
    },
  }
});

const CustomTableCell = withStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
}))(TableCell);

const delays = 80, durations = 500;
let Chartist = require("chartist");

const dailySalesChart = {
  data: {
    labels: ["T", "W", "T", "F", "S", "S", "M"],
    series: [[12, 17, 7, 17, 23, 18, 38]]
  },
  options: {
    lineSmooth: Chartist.Interpolation.cardinal({
      tension: 0
    }),
    low: 0,
    high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
    chartPadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  },
  // for animation
  animation: {
    draw: function(data) {
      if (data.type === "line" || data.type === "area") {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
                .clone()
                .scale(1, 0)
                .translate(0, data.chartRect.height())
                .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === "point") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: "ease"
          }
        });
      }
    }
  }
};

const items = {
  "":[],
  "Metal":["GOLD", "SILVER", "COPPER"],
  "Energy":["OIL", "PITCH", "RUBBER"],
  "Derivatives":["Copper Option", "Rubber Option"],
};

let websocket = null;

class MarketView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type:"",
      period:"",
      category:"",
      rows:[{level1: "", buy_vol: "", price: "", sell_vol: "", level2: ""},
            {level1: "", buy_vol: "", price: "", sell_vol: "", level2: ""},
            {level1: "", buy_vol: "", price: "", sell_vol: "", level2: ""},
            {level1: "", buy_vol: "", price: "", sell_vol: "", level2: ""},
            {level1: "", buy_vol: "", price: "", sell_vol: "", level2: ""},
            {level1: "", buy_vol: "", price: "", sell_vol: "", level2: ""}],
    };
    //console.log(cookies.get("username"));


    };


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
      type:e.target.value
    })
  };

  handleChangePeriod=(e)=>{
    console.log(e.target.value);
    this.setState({
      period: e.target.value
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

  searchDepth=()=> {
    let receiver = "user";
    let futureId;
    let msg = "bye";
    let socketMsg = {msg: msg, toUser: receiver, type: 1};

    if (this.state.type + this.state.period === "OILJULY16")
      futureId = "1";
    else if (this.state.type + this.state.period === "OILAUG16")
      futureId = "2";
    else if (this.state.type + this.state.period === "GOLDJULY16")
      futureId = "4";
    else if (this.state.type + this.state.period === "SILVERJULY16")
      futureId = "6";

    fetch('http://202.120.40.8:30405/market?futureID=' + futureId,
        {
          method: 'GET',
          mode: 'cors',
        })
        .then(response => {
          console.log('Request successful', response);
          //console.log("status:",response.status);
          return response.json()
              .then(result => {
                console.log("result:", result);
                let buy_list = result["buy_list"];
                let sell_list = result["sell_list"];
                this.state.rows.length = 0;
                //console.log(this.state.depth_rows.length);
                let row;
                let sell_price_list = Object.keys(sell_list);
                let buy_price_list = Object.keys(buy_list);

                sell_price_list.sort();
                buy_price_list.sort();
                for (let i = 3; i > 0; i--) {
                  if (sell_price_list.length >= i) {
                    row = {
                      level1: "",
                      buy_vol: "",
                      price: sell_price_list[i - 1],
                      sell_vol: sell_list[sell_price_list[i - 1].toString()],
                      level2: i
                    }
                  }
                  else {
                    row = {level1: "", buy_vol: "", price: "", sell_vol: "", level2: i}
                  }
                  this.state.rows.push(row);
                }
                for (let i = 3; i >= 1; i--) {
                  if (buy_price_list.length >= i) {
                    row = {
                      level1: i,
                      buy_vol: buy_list[buy_price_list[i - 1].toString()],
                      price: buy_price_list[i - 1],
                      sell_vol: "",
                      level2: ""
                    }
                  }
                  else {
                    row = {level1: i, buy_vol: "", price: "", sell_vol: "", level2: ""}
                  }
                  this.state.rows.push(row);
                  this.forceUpdate();
                  console.log(this.state.rows);
                }
              })
        });
  }


  render() {
    const {classes} = this.props;
    let candidates = this.handleItems(this.state.category);
    return (
    <div >
      <br/>
      <br/>
      <br/>
      <Card >
        <CardHeader style={{background:"#37474f"}}/>
        <CardBody>
          <GridContainer xs={12} sm={12} md={12}>
            <GridItem xs={12} sm={12} md={7}>
              <Card>
                <CardHeader style={{background:"#37474f", color:"white", fontSize:"24px", fontWeight:"600"}}>Market Depth of Product {this.state.type} {this.state.period}</CardHeader>
                <CardBody>
                  <br/>
                  <FormControl variant="outlined"  style={{width:'20%', marginLeft:'2%'}}>
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
                  <FormControl variant="outlined" style={{width:'20%', marginLeft:'2%'}}>
                    <InputLabel>Type</InputLabel>
                    <Select
                        value={this.state.type}
                        onChange={this.handleChangeType}
                        input={<OutlinedInput/>}
                    >
                      {candidates}
                    </Select>
                  </FormControl>
                  <FormControl variant="outlined"  style={{width:'20%', marginTop:'-30px', marginLeft:'2%'}}>
                    <InputLabel>Period</InputLabel>
                    <Select
                        value={this.state.period}
                        onChange={this.handleChangePeriod}
                        input={<OutlinedInput/>}
                    >
                      <MenuItem value="JULY16">JULY16</MenuItem>
                      <MenuItem value="AUG16">AUG16</MenuItem>
                      <MenuItem value="SEP18">SEP18</MenuItem>
                    </Select>
                  </FormControl>
                  <Button
                      onClick={this.searchDepth}
                      style={{background:"#37474f", color:"white", fontSize:"16px", marginTop:"-1%", marginLeft:'2%'}}
                  >
                    <Search/>&nbsp;&nbsp;Search
                  </Button>
                  <br/>
                  <h1/>
                  <Table style={{border:"1px solid black", width:"95%", marginLeft:"2%"}}>
                    <TableHead>
                        <tr>
                          <td className={classes.header}>Level</td>
                          <td className={classes.header}>Buy-Vol</td>
                          <td className={classes.header}>Price</td>
                          <td className={classes.header}>Sell-Vol</td>
                          <td className={classes.header}>Level</td>
                        </tr>
                    </TableHead>
                    <TableBody>
                      {this.state.rows.map(row => (
                            <tr>
                            <td className={classes.body} style={{background:"#bbdefb"}}>
                              {row.level1}
                            </td>
                            <td className={classes.body} style={{background:"#bbdefb"}}>
                              {row.buy_vol}
                            </td>
                            {
                              (row.level1 > 0) ?
                                  <td className={classes.body} style={{background: "#9e9e9e", color:"#ad1457"}}>{row.price}</td>
                                  :
                                  (
                                      (row.level2 === 1) ?
                                          <td className={classes.body} style={{background: "#fff59d", color:"#01579b"}}>{row.price}</td>
                                          :
                                          <td className={classes.body} style={{background: "#9e9e9e", color:"#01579b"}}>{row.price}</td>
                                  )
                            }
                            <td className={classes.body} style={{background:"#f8bbd0"}}>
                              {row.sell_vol}
                            </td>
                            <td className={classes.body} style={{background:"#f8bbd0"}}>
                              {row.level2}
                            </td>
                            </tr>
                      ))}
                    </TableBody>
                  </Table>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={5}>
              <Card chart style={{marginTop:"20%"}}>
                <CardHeader color="warning">
                  <ChartistGraph
                      className="ct-chart"
                      data={dailySalesChart.data}
                      type="Line"
                      options={dailySalesChart.options}
                      listener={dailySalesChart.animation}
                  />
                </CardHeader>
                <CardBody>
                  <h4 className={classes.cardTitle}>Price Trend in the past 7 days</h4>
                  <p className={classes.cardCategory}>
                  <span className={classes.successText}>
                    <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                  </span>{" "}
                    increase in today sales.
                  </p>
                </CardBody>
                <CardFooter chart>
                  <div className={classes.stats}>
                    <AccessTime /> updated 4 minutes ago
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </CardBody>
      </Card>
    </div>
  )
  }
}
export default withStyles(styles)(MarketView);
