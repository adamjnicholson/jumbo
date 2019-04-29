import React from 'react'
import Input from './Input/Input'

const Form = props => {
  const inputs = Object.entries(props.inputs).map( ([key,input]) => (
    <Input key={key} atts={input} changed={props.changed} />
  ))
  return (
    <form onSubmit={props.submit} className={props.className}>
      {inputs}
      {props.children}
    </form>
  )
}



export default Form;