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
      images: [],
      currentImage: {}
    };
  }

  componentDidMount() {
    this.updateCurrentProduct();
    this.setState ({
      currentImage: this.state.currentProduct.photo_url
    })
  }

  updateCurrentProduct() {
    axios.get('http://ec2-3-16-128-154.us-east-2.compute.amazonaws.com:3003/product_info', {
      params: {
        sku: window.State || Math.floor(Math.random() * 100) + 1
      }
    })
    .then((response) => {
      this.setState ({
        currentProduct: response.data[0]
      })
      const noun = this.state.currentProduct.title.split(' ')[1];
      return noun;
    })
    .then((queryParam) => {
      axios.get('http://ec2-3-16-128-154.us-east-2.compute.amazonaws.com:3003/images', {
          params: {
            title: queryParam 
          }
        })
        .then((response) => {
          this.setState({
            images: response.data
          })
        })
        .catch((err) => {
          console.log('err getting images on client side:', err)
        })
    })
    .catch((err) => {
      console.log('err getting currentProduct on client side:', err)
    })
  } 

  // need to prevent default and fix click handler (setState of currentImage?)
  handleClick(e) {
    console.log('hiiiii');
    console.log('EEEE.target', e.target);
    e.preventDefault();
    this.setState ({
      currentImage: e.target
    })
  }

  
  render() {
    window.Info = this
    if (!window.State) {
      window.State = this.state.currentProduct.sku
    }

    return (
      <Container>
      <div id="main">
        <Title> <h1>{this.state.currentProduct.title}</h1> </Title> 

        {/* add functionality to change image on click/hover */}
        
        <ImageList image={this.state.currentProduct.photo_url} images={this.state.images} onClick={this.handleClick.bind(this)}/>
        <img src={this.state.currentImage} style={{height: 300 + 'px', padding: 5 + 'px'}}></img> 
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

