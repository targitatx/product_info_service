import React from "react";
import Input from "../presentational/Input.jsx";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: 1,
      data: []
    };
    // this.handleChange = this.handleChange.bind(this);
  }
  // handleChange(event) {
  //   this.setState({ [event.target.id]: event.target.value });
  // }

  setData() {
    console.log('SUCCESS!!');
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

  render() {
    return (
      <div id="main">
        <h1>{this.state.data.title}</h1>
        <img src={this.state.data.photo_url}></img>
        <p>{this.state.data.price}</p>
        <p>{this.state.data.product_description}</p>
      </div>
    )
  }
}
export default App;

