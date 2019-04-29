import React from 'react'
import classes from './Modal.module.css'

const Modal = props => (
  <div className={classes.Modal}>
    <header>
      <h1>Error</h1>
    </header>
    <div className={classes.ModalContent}>
      {props.children}
    </div>
    
  </div>
);

export default Modal;