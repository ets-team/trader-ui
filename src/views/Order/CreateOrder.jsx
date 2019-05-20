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
//components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

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
    width:'100%'
  },
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
                <GridContainer xs={12} sm={12} md={12}>
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
                </CardBody>
              </Card>

        </div>
    )
  }
}
export default withStyles(styles)(CreateOrder);