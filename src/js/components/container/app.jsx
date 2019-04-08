import React from "react";
import ImageList from "../presentational/ImageList.jsx";
import Description from "../presentational/Description.jsx";
import axios from "axios";
import styled from 'styled-components';

//////// STYLED COMPONENTS /////////

const Title = styled.h1 `
  font-size: 10px; 
`
const Container = styled.div `
  text-align: left;
  width: 66%;
  border: 1px solid lightgray;
`

//////// COMPONENT /////////

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: {title: ''},
      images: []
    };
  }

  componentDidMount() {
    this.updateCurrentProduct();
  }

  updateCurrentProduct() {
    axios.get('http://localhost:3003/product_info', {
      params: {
        sku: window.State || Math.floor(Math.random() * 100) + 1
      }
    })
    .then((response) => {
      this.setState({
        currentProduct: response.data[0]
      })
      let noun = this.state.currentProduct.title.split(' ')[1];
      return noun;
    })
    .then((queryParam) => {
      axios.get('http://localhost:3003/images', {
          params: {
            title: queryParam 
          }
        })
        .then((response) => {
          console.log('IMAGE response on client side:', response);
          this.setState({
            images: response.data
          })
          console.log('images in state:', this.state.images)
        })
        .catch((err) => {
          console.log('err getting images on client side:', err)
        })
    })
    .catch((err) => {
      console.log('err getting currentProduct on client side:', err)
    })
  }

  

  
  render() {
    window.Info = this
    if (!window.State) {
      window.State = this.state.currentProduct.sku
    }
    let currTitle = this.state.currentProduct.title;
    return (
      <Container>
      <div id="main">
        <Title> <h1>{this.state.currentProduct.title}</h1></Title> 

        {/* add functionality to change image on click/hover */}
        
        <ImageList image={this.state.currentProduct.photo_url} images={this.state.images}/>
        <img src={this.state.currentProduct.photo_url} style={{height: 300 + 'px', padding: 5 + 'px'}}></img> 
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

