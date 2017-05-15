import React, { Component } from 'react'

const Header = ({ visible }) => (
  <div>
    <header id='header' className={visible ? 'slideIn' : 'slideOut'}>
      <div className='logo-container'>
        <a href='#main'><img className='logo' src="/assets/images/workspace-logo-white.png"/></a>
        <span className='logo-text'>workSpace</span>
      </div>
      <div className='register-container'>
        <button className='register-btn'>Signup / Login</button>
      </div>
    </header>
  </div>
)

export default Header
