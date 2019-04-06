import React from "react";
import ImageList from "../presentational/ImageList.jsx";
import Description from "../presentational/Description.jsx";
import axios from "axios";
import styled from 'styled-components';

const Title = styled.h1 `
  font-size: 10px; 
`
const Container = styled.div `
  text-align: left;
  width: 66%;
  border: 1px solid lightgray;
`
const Image = styled.img `
  background: black;
`



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: {}
    };
  }

  updateCurrentProduct() {
    axios.get('http://localhost:3003/product_info', {
      params: {
        sku: window.State || Math.floor(Math.random() * 100) + 1
      }
    })
    .then((response) => {
      console.log('response on client side:', response);
      this.setState({
        currentProduct: response.data[0]
      })
    })
    .catch((err) => {
      console.log('err getting currentProduct on client side:', err)
    })
  }

  componentDidMount() {
    this.updateCurrentProduct();
  }

  
  render() {
    window.Info = this
    if (!window.State) {
      window.State = this.state.currentProduct.sku
    }
    return (
      <Container>
      <div id="main">
        {/* NEED TO MAKE TM SMALLER and do data[state.currentProduct*/}
        {/* <h1>{this.state.currentProduct.title}™</h1> */}
        <Title> <h1>{this.state.currentProduct.title}</h1></Title> 
        {/* WILL INCLUDE IMAGE LIST ONCE STYLED TO BE APPROPRIATELY SIZED */}
        {/* add functionality to change image on click/hover */}
        <ImageList image={this.state.currentProduct.photo_url} title={this.state.currentProduct.title}/>
        <img src={this.state.currentProduct.photo_url} style={{height: 300 + 'px'}}></img> 
        <h2>About this item</h2>
        {/* <h4>{this.state.currentProduct.price}</h4> */}
        <h3>Highlights</h3>
        <Description text={this.state.currentProduct.product_description} />
        {/* <p>{this.state.currentProduct.product_description}</p> */}
      </div>
      </Container>
    )
  }
}
export default App;

