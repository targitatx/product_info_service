import React from "react";
import ImageList from "../presentational/ImageList.jsx";
import BulletList from "../presentational/BulletList.jsx";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: 1,
      data: []
    };
  }

  componentDidMount() {
    axios.get('/product_info')
    .then((response) => {
      console.log('axios response on client side:', response);
      this.setState({
        data: response.data
      })
    })
    .catch(function (error) {
      console.log('axios error on client side:', error);
    });
  }
  
  // WILL RENDER CORRECT PRODUCT BASED ON SKU IN STATE IN PROXY?
  render() {
    return (
      <div id="main">
        {/* NEED TO MAKE TM SMALLER */}
        <h1>{this.state.data.title}™</h1>
        {/* WILL INCLUDE IMAGE LIST ONCE STYLED TO BE APPROPRIATELY SIZED */}
        {/* add functionality to change image on click/hover */}
        {/* <ImageList image={this.state.data.photo_url}/> */}
        <img src={this.state.data.photo_url}></img>
        <h2>About this item</h2>
        <h3>Highlights</h3>
        <BulletList text={this.state.data.product_description} price={this.state.data.price}/>
      </div>
    )
  }
}
export default App;

