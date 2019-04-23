import React from "react";
import ImageList from "../presentational/ImageList.jsx";
import Description from "../presentational/Description.jsx";
import axios from "axios";
import styled from 'styled-components';
import Lightbox from 'react-images';
// import Lightbox from 'react-lightbox-component';

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
  width: 100%;
  border: 1px solid lightgray;
  padding: 10px 20px;
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

  // componentDidMount() {
  //   this.updateCurrentProduct();
  //   this.setState ({
  //     currentImage: this.state.currentProduct.photo_url
  //   })
  // }

  updateCurrentProduct(sku) {
    axios.get('/product_info', {
      params: {
        sku: sku || Math.floor(Math.random() * 100) + 1
      }
    })
    .then((response) => {
    
      this.setState ({
        currentProduct: response.data[0]
      })
      console.log(response.data[0].photo_url)
      this.setState ({
        currentImage: response.data[0].photo_url
      })
      const noun = this.state.currentProduct.title.split(' ')[2];
      return noun;
    })
    .then((queryParam) => {
      axios.get('/images', {
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

  getGalleryItems () {
    return this.state.images.map((image) => {
      return {
        src: image.photo_url
      }
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
        <div>
          <Departments> <span> <u>All</u>/ </span> <span> <u>Products</u>/ </span> <span> <u>Stuff</u> </span> </Departments>
          <Title> <h1 style={{fontWeight: 400}}>{this.state.currentProduct.title}</h1> </Title>
          <p> <u> Shop all {this.state.currentProduct.title.split(' ')[1]} </u> </p>
        </div>
        
        <div>
          <ImageList image={this.state.currentProduct.photo_url} images={this.state.images} onClick={this.handleClick.bind(this)} /* style={{float: 'left'}} */ />
        </div>  

        <div>
          <img src={this.state.currentImage} style={{ height: '300px', maxWidth: '700px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}></img> 
          {/* <span style={{float: 'right', fontSize: '30px', padding: '50px', color: 'red'}}>&hearts;</span> */}
          {/* <PhotoSwipeGallery items={this.getGalleryItems()} thumbnailContent={this.getThumbnailContent}/> */}
          {/* <Lightbox images={this.getGalleryItems()}/> */}
          <Lightbox
            images={this.getGalleryItems()}
            isOpen={this.state.lightboxIsOpen}
            onClickPrev={this.gotoPrevLightboxImage}
            onClickNext={this.gotoNextLightboxImage}
            onClose={this.closeLightbox}
          />
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

