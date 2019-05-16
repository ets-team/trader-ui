/**
 * Created by 励颖 on 2019/5/16.
 */
import React from "react";
//@material-ui/core
import { withStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
//@material-ui/icons
import Search from "@material-ui/icons/Search";
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

class MarketView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productName:"Gold",
      period:"SEP16",
      rows:[
        {
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

  handleChangeProductName=(e)=>{
    console.log(e.target.value);
    this.setState({
      productName:e.target.value
    })
  };

  handleChangePeriod=(e)=>{
    console.log(e.target.value);
    this.setState({
      period: e.target.value
    })
  };

  render() {
    const {classes} = this.props;
    return (
    <div >
      <GridContainer xs={12} sm={12} md={12}>
        <GridItem xs={12} sm={12} md={12}>
          <Card chart>
            <CardHeader style={{background:"#37474f"}}>
            </CardHeader>
            <CardBody>
              <GridContainer xs={12} sm={12} md={12}>
                <GridItem xs={12} sm={12} md={3}>
                  <TextField
                      id="theme"
                      label="Product Name"
                      fullWidth
                      value={this.state.productName}
                      onChange={()=>this.handleChangeProductName}
                      className={classes.textField}
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <TextField
                      id="theme"
                      label="Period"
                      fullWidth
                      value={this.state.period}
                      onChange={()=>this.handleChangePeriod}
                      className={classes.textField}
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <Button style={{background:"#37474f", color:"white", fontSize:"18px", marginTop:"7%"}}>
                    <Search/>&nbsp;&nbsp;Search
                  </Button>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer xs={12} sm={12} md={12}>
        <GridItem xs={12} sm={12} md={3}>
          <br/>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <h3 style={{marginLeft:"20%", fontWeight:"700"}}>Market Depth of {this.state.productName} {this.state.period}:</h3>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <br/>
        </GridItem>
        <GridItem xs={12} sm={12} md={8}>
          <Table className="market page" style={{marginLeft:"26%", border:"1px solid black"}}>
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
      </GridContainer>
    </div>
  )
  }
}
export default withStyles(styles)(MarketView);
