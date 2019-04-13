import React from "react";
import ImageList from "../presentational/ImageList.jsx";
import Description from "../presentational/Description.jsx";
import axios from "axios";
import styled from 'styled-components';

//////// STYLED COMPONENTS /////////

const Departments = styled.span `
`

const Title = styled.h1 `
  font-size: small;
`
const Price = styled.h4 `
  text-align: left;
  font-size: large;
`

const Container = styled.div `
  font-family: Helvetica Neue;
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
      currentImage: ''
    };
  }

  componentDidMount() {
    window.addEventListener('changeItem', (event)=>{this.updateCurrentProduct(event.detail)})
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
      this.setState ({
        currentImage: response.data[0].photo_url
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
    // console.log('e.target', e.preventDefault());
    // e.preventDefault();
    this.setState ({
      currentImage: e.target.src
    })
  }

  
  render() {
    console.log('rerendering!!!')
    window.Info = this
    if (!window.State) {
      window.State = this.state.currentProduct.sku
    }

    return (
      <Container>
      <div id="main">

        <div>
          <Departments> <span> <u>All</u>/ </span> <span> <u>Products</u>/ </span> <span> <u>Stuff</u> </span> </Departments>
          <Title> <h1 style={{fontWeight: 400}}>{this.state.currentProduct.title}</h1> </Title>
          <p> <u> Shop all {this.state.currentProduct.title.split(' ')[1]} </u> </p>
        </div>
        
        <div>
          <ImageList image={this.state.currentProduct.photo_url} images={this.state.images} onClick={this.handleClick.bind(this)}/>
          <img src={this.state.currentImage} style={{height: 250 + 'px', maxWidth: '500px', margin: 10 + 'px ' + 130 + 'px', overflow: 'auto'}}></img> 
        </div>

        <div>
          <h2 style={{textAlign: 'center'}}>About this item</h2>
          <Price> <h4 style={{textAlign: 'left'}}>{this.state.currentProduct.price}</h4> </Price>
          <h2>Highlights</h2>
          <Description text={this.state.currentProduct.product_description} />
        </div>
      </div>
      </Container>
    )
  }
}
export default App;

