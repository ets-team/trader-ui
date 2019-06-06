/**
 * Created by 励颖 on 2019/6/6.
 */
import React from "react";
import { withStyles } from '@material-ui/core/styles';
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import SentimentVerySatisfied from "@material-ui/icons/SentimentVerySatisfied";

class SelfOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      orders:[]
    }
  }

  render(){
    return(
        <div>
          <GridContainer xs={12} sm={12} md={12}>
            {
              this.state.orders.map((order) => {
                return (
                    <GridItem xs={12} sm={6} md={4} key={order.order_id}>
                      <Card>
                        <CardHeader color="success" stats icon>
                          <CardIcon color="success">
                            {<SentimentVerySatisfied/>}
                          </CardIcon>

                        </CardHeader>

                        <CardBody style={{color:"grey"}}>


                        </CardBody>
                      </Card>
                    </GridItem>
                )
              })
            }
          </GridContainer>
        </div>
    )
  }
}

export default SelfOrder;