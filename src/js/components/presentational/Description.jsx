import React from "react";
// import PropTypes from "prop-types";

// split text by '.' and create bullets
// create varying number of bullets for each item

 class Description extends React.Component {
   constructor(props) {
     super(props);

     this.state = {
       something: null
     }
   }
  // createBullets(string) {
  //   let arr = string.split;
  //   arr.map((line) => {
  //     <li>{line}</li>
  //   });
  // }
  render() { 
    return (
    <div>
      {/* {props.text} */}
      <ul>
        {/* <li>{this.props.text}</li> */}
        {this.props.text ? this.props.text.split('.', (Math.floor(Math.random() * 10))).map((line) => {
            return <li>{line}</li>
          }) : null
        }
      </ul>
      <p>{this.props.text ? this.props.text.split('.').slice(5, 10).join() : null}</p>
    </div>
    )
  }
};

export default Description;





// const ItemList = (props) =>{
//   return (
//     <List>
//       {props.items.map(item => <CartItem changeQuantity={props.changeQuantity} item={item}/>)}
//     </List>
//   )
// }
// export default ItemList;