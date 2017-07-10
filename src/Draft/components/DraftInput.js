import React, { Component } from 'react'

const DraftInput = ({ visible, placeholder, id, name, type, onChange, style }) => (
  <div>
    <input id={id} className={visible ? 'form-slideIn' : 'form-slideOut'} placeholder={placeholder} name={name} type={type} onChange={onChange} style={style} />
  </div>
)

export default DraftInput
