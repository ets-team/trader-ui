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

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop:"20px"
  },
  header:{
    width:"20%",
    color:"#424242",
    fontSize:"20px",
    fontWeight:"700",
    textAlign:"center",
    border:"1px solid black",
    marginLeft:"20%"
  },
  body:{
    width:"20%",
    fontSize:"20px",
    fontWeight:"600",
    textAlign:"center",
    border:"1px solid black"
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
    labels: ["M", "T", "W", "T", "F", "S", "S"],
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
  "Metal":["Gold", "Silver", "Copper", "Aluminium", "Zinc", "Lead", "Nickel", "Tin"],
  "Energy":["Crude Oil", "Fuel Oil", "Pitch", "Rubber"],
  "Derivatives":["Copper Option", "Rubber Option"],
};

class MarketView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type:"",
      period:"",
      category:"",
      rows:[{
          level1: "",
          buy_vol: "",
          price: 1254,
          sell_vol: 127,
          level2: 3,
        },
        {
          level1: "",
          buy_vol: "",
          price: 1252,
          sell_vol: 32,
          level2: 2,
        },
        {
          level1: "",
          buy_vol: "",
          price: 1250,
          sell_vol: 50,
          level2: 1,
        },
        {
          level1: 1,
          buy_vol: 90,
          price: 1248,
          sell_vol: -1,
          level2: -1,
        },
        {
          level1: 2,
          buy_vol: 340,
          price: 1246,
          sell_vol: -1,
          level2: -1,
        },
        {
          level1: 3,
          buy_vol: 187,
          price: 1244,
          sell_vol: -1,
          level2: -1,
        }
      ],
    };
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

  render() {
    const {classes} = this.props;
    let candidates = this.handleItems(this.state.category);
    return (
    <div >
      <Card chart>
        <CardHeader style={{background:"#37474f"}}/>
        <CardBody>
          <GridContainer xs={12} sm={12} md={12}>
            <GridItem xs={12} sm={12} md={12}>
              <h6>Please choose a product:</h6>
            </GridItem>
          </GridContainer>
          <GridContainer xs={12} sm={12} md={12}>
            <GridItem xs={12} sm={12} md={1} />
            <GridItem xs={12} sm={12} md={2}>
              <FormControl variant="outlined"  style={{width:'100%', marginTop:"-30px"}}>
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
              <FormControl variant="outlined" style={{width:'100%', marginTop:'-30px'}}>
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
            <GridItem xs={12} sm={12} md={2}>
                <FormControl variant="outlined"  style={{width:'100%', marginTop:'-30px'}}>
                  <InputLabel>Period</InputLabel>
                  <Select
                      value={this.state.period}
                      onChange={this.handleChangePeriod}
                      input={<OutlinedInput/>}
                  >
                    <MenuItem value="SEP16">SEP16</MenuItem>
                    <MenuItem value="OCT14">OCT14</MenuItem>
                    <MenuItem value="NOV18">NOV18</MenuItem>
                  </Select>
                </FormControl>
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              <Button style={{background:"#37474f", color:"white", fontSize:"18px", marginTop:"-3%"}}>
                <Search/>&nbsp;&nbsp;Search
              </Button>
            </GridItem>
          </GridContainer>
          <GridContainer xs={12} sm={12} md={12}>
            <GridItem xs={12} sm={12} md={12}>
              <br/>
            </GridItem>
            <GridItem xs={12} sm={12} md={8}>
              <h3 style={{fontWeight:"700", color:"#37474f", marginLeft:"5%"}}>Market Depth of {this.state.type} {this.state.period}:</h3>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <h3 style={{fontWeight:"700", color:"#37474f", marginLeft:"5%"}}>Daily Trend of {this.state.type} {this.state.period}:</h3>
            </GridItem>
            <GridItem xs={12} sm={12} md={8}>
                  <br/>
                  <Table className="market page" style={{border:"1px solid black"}}>
                    <TableHead>
                      <TableRow >
                        <CustomTableCell className={classes.header}>Level</CustomTableCell>
                        <CustomTableCell className={classes.header}>Buy-Vol</CustomTableCell>
                        <CustomTableCell className={classes.header}>Price</CustomTableCell>
                        <CustomTableCell className={classes.header}>Sell-Vol</CustomTableCell>
                        <CustomTableCell className={classes.header}>Level</CustomTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.rows.map(row => (
                          <TableRow >
                            <CustomTableCell className={classes.body} style={{background:"#bbdefb"}}>
                              {row.level1 > 0 ? row.level1 : ""}
                              </CustomTableCell>
                            <CustomTableCell className={classes.body} style={{background:"#bbdefb"}}>
                              {row.buy_vol > 0 ? row.buy_vol : ""}
                              </CustomTableCell>
                            {
                              (row.level1 > 0) ?
                                  <CustomTableCell className={classes.body} style={{background: "#9e9e9e", color:"#ad1457"}}>{row.price}</CustomTableCell>
                              :
                                  (
                                    (row.level2 === 1) ?
                                      <CustomTableCell className={classes.body} style={{background: "#fff59d", color:"#01579b"}}>{row.price}</CustomTableCell>
                                    :
                                      <CustomTableCell className={classes.body} style={{background: "#9e9e9e", color:"#01579b"}}>{row.price}</CustomTableCell>
                                  )
                            }
                            <CustomTableCell className={classes.body} style={{background:"#f8bbd0"}}>
                              {row.sell_vol > 0 ? row.sell_vol : ""}
                              </CustomTableCell>
                            <CustomTableCell className={classes.body} style={{background:"#f8bbd0"}}>
                              {row.level2 > 0 ? row.level2 : ""}
                              </CustomTableCell>
                          </TableRow>
                      ))}
                    </TableBody>
                  </Table>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card chart>
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
                  <h4 className={classes.cardTitle}>Price Trend in the past 5 days</h4>
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
