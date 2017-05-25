import React, { Component } from 'react'

const DraftInput = ({ visible, placeholder, id, onChange }) => (
  <div>
    <input id={id} className={visible ? 'form-slideIn' : 'form-slideOut'} placeholder={placeholder} onChange={onChange} />
  </div>
)

export default DraftInput
