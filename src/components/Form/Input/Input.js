import React from 'react'

const Input = props => (
  <input {...props.atts} onChange={props.changed} />
);

export default Input;