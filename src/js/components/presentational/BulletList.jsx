import React from "react";
// import PropTypes from "prop-types";

// split text by '.' and create bullets
// create varying number of bullets for each item

const BulletList = (props) => {
  return ( 
  <ul>
    <li>{props.price}</li>
    <li>{props.text}</li>
  </ul>
  )
};

export default BulletList;