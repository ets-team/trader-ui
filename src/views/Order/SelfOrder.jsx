/**
 * Created by 励颖 on 2019/6/6.
 */
import React from "react";
import { withStyles } from '@material-ui/core/styles';
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Divider from '@material-ui/core/Divider';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Cookies from "universal-cookie";
import {name_company} from "variables/variables.jsx";

const cookies = new Cookies();


const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  table:{
    border: '2px solid black',
    width: '90%',
    borderCollapse: 'collapse',
    marginLeft: '5%'
  },
  tableCell:{
    fontSize: "120%",
    fontWeight: 700,
    textAlign: "center",
    color:"#37474f",
    background:"#4fc3f7",
    border: '2px solid black',
    borderCollapse: 'collapse',
    height: '10px'
  },
  topCell:{
    fontSize: "120%",
    fontWeight: 700,
    textAlign: "center",
    color:"#37474f",
    background:"#4fc3f7",
    border: '2px solid black',
    borderBottom: '0px',
  },
  blankCell:{
    background:"#4fc3f7",
    borderRight: '2px solid black',
  },
  contentCell:{
    fontSize: "110%",
    fontWeight: 500,
    textAlign: "center",
    color:"#37474f",
    border: '2px solid black',
    borderCollapse: 'collapse',
  },
  title:{
    fontWeight: 700,
    color: "#37474f",
    marginLeft: "10%"
  }
});

class SelfOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      orders:[],
      rows:[]
    }

    fetch('http://202.120.40.8:30405/history?traderID=0',
    {
      method: 'GET',
      mode: 'cors',
    })
    .then(response => {
      console.log('Request successful', response);
      //console.log("status:",response.status);
      return response.json()
          .then(result => {
            console.log("result:", result)
            let trader1;
            let trader2;
            let side1;
            let side2;
            let order_id;
            let buy_list = result["buy_list"];
            let sell_list = result["sell_list"];
            console.log(buy_list.length);

            for(let i=0; i<buy_list.length; i++) {
              if(buy_list[i]["initiatorSide"] === 'b') {
                trader1 = buy_list[i]["buyTraderID"];
                trader2 = buy_list[i]["sellTraderID"];
                side1 = "buy";
                side2 = "sell";
              }
              else {
                trader1 = buy_list[i]["sellTraderID"];
                trader2 = buy_list[i]["buyTraderID"];
                side1 = "sell";
                side2 = "buy";
              }
              if(buy_list[i]["buyTraderID"] === cookies.get("userID"))
                order_id = buy_list[i]["buyTraderOrderID"];
              else
                order_id = buy_list[i]["sellTraderOrderID"];
              this.state.rows.push({
                tradeID: buy_list[i].tradeID,
                orderID: order_id,
                broker: "M",
                product: buy_list[i]["future_name"],
                period: buy_list[i]["period"],
                price: buy_list[i]["price"],
                qty: buy_list[i]["amount"],
                trader1: name_company[trader1].name,
                company1: name_company[trader1].company,
                side1: side1,
                trader2: name_company[trader1].name,
                company2: name_company[trader2].company,
                side2: side2,
              })

            }
            console.log(this.state.rows.length);
            this.forceUpdate();
          })
      })
  }

  render(){
    const {classes} = this.props;
    return(
        <div>
          <br/>
          <br/>
          <br/>
          <Card >
            <CardHeader style={{background:"#37474f"}}/>
            <CardBody>
              <h4/><br/>
              <GridContainer xs={12} sm={12} md={12}>
                <GridItem xs={12} sm={12} md={6}>
                  <h2 className={classes.title}>Order&nbsp;Blotter&nbsp;of&nbsp;User&nbsp;{cookies.get("username")}：</h2>
                </GridItem>
              </GridContainer>
              <Divider style={{width:"95%"}}/>
              <h4/><br/>
              <GridContainer xs={12} sm={12} md={12}>
                <GridItem xs={12} sm={12} md={12}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <td className={classes.topCell} style={{width:"8%"}} >TradeID</td>
                        <td className={classes.topCell} style={{width:"8%"}} >OrderID</td>
                        <td className={classes.topCell} style={{width:"8%"}} >Broker</td>
                        <td className={classes.topCell} style={{width:"10%"}}>Product</td>
                        <td className={classes.topCell} style={{width:"8%"}} >Period</td>
                        <td className={classes.topCell} style={{width:"7%"}} >Price</td>
                        <td className={classes.topCell} style={{width:"7%"}} >Qty</td>
                        <td className={classes.tableCell} style={{width:"22%"}} colSpan={3}>Initiator</td>
                        <td className={classes.tableCell} style={{width:"22%"}} colSpan={3}>Completion</td>
                      </TableRow>
                      <TableRow>
                        <td className={classes.blankCell} />
                        <td className={classes.blankCell} />
                        <td className={classes.blankCell} />
                        <td className={classes.blankCell} />
                        <td className={classes.blankCell} />
                        <td className={classes.blankCell} />
                        <td className={classes.blankCell} />
                        <td className={classes.tableCell} style={{width:"8%"}}>Trader</td>
                        <td className={classes.tableCell} style={{width:"8%"}}>Company</td>
                        <td className={classes.tableCell} style={{width:"6%"}}>Side</td>
                        <td className={classes.tableCell} style={{width:"8%"}}>Trader</td>
                        <td className={classes.tableCell} style={{width:"8%"}}>Company</td>
                        <td className={classes.tableCell} style={{width:"6%"}}>Side</td>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.rows.map((row,key) => (
                          <TableRow >
                            <td style={{width:"8%"}} className={classes.contentCell}>{row.tradeID}</td>
                            <td style={{width:"8%"}} className={classes.contentCell}>{row.orderID}</td>
                            <td style={{width:"8%"}} className={classes.contentCell}>{row.broker}</td>
                            <td style={{width:"10%"}} className={classes.contentCell}>{row.product}</td>
                            <td style={{width:"8%"}} className={classes.contentCell}>{row.period}</td>
                            <td style={{width:"7%"}} className={classes.contentCell}>{row.price}</td>
                            <td style={{width:"7%"}} className={classes.contentCell}>{row.qty}</td>
                            <td style={{width:"8%"}} className={classes.contentCell}>{row.trader1}</td>
                            <td style={{width:"8%"}} className={classes.contentCell}>{row.company1}</td>
                            <td style={{width:"6%"}} className={classes.contentCell}>{row.side1}</td>
                            <td style={{width:"8%"}} className={classes.contentCell}>{row.trader2}</td>
                            <td style={{width:"8%"}} className={classes.contentCell}>{row.company2}</td>
                            <td style={{width:"6%"}} className={classes.contentCell}>{row.side2}</td>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </div>
    )
  }
}

export default withStyles(styles)(SelfOrder);