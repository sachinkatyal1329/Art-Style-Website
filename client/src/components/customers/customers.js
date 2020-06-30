import React, {Component} from 'react';
import './customers.css'
import Grid from "@material-ui/core/Grid";
import ImageCard from '../Card/Card'
import Container from '@material-ui/core/Container';

class Customers extends Component {
  constructor() {
    super();
    this.state = {
      customers: []
    }
  }

  async  componentDidMount() {
    await fetch('/api/customers')
      .then(res => res.json())
      .then(customers => this.setState({customers: customers}, 
        () => console.log("Customers fetched", customers))); 
  }

  render() {
    return (
      <Container maxWidth = "lg">
        <Grid container spacing = {6}>
            {this.state.customers.map(customer => 
                  <ImageCard urlPath = {customer['result']} />
              )}
        </Grid>
      </Container>
    );
  }
}

export default Customers;
