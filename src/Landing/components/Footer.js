import React, { Component } from 'react'

class Footer extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div>
        <footer id='footer'>
          <div className='workspace-container'>
            <label className='workspace-title'>workSpace</label>
            <img className='workspace-logo' src="/assets/images/workspace-logo-white.png"/>
            <ul>
              <li className='ws-list-item'><a href='#'>About us</a></li>
              <li className='ws-list-item'><a href='#'>Careers</a></li>
              <li className='ws-list-item'><a href='#'>Press</a></li>
            </ul>
          </div>

          <div className='discover'>
            <label className='discover-title'>discover</label>
            <ul>
              <li className='ws-list-item'><a href='#'>FAQ</a></li>
              <li className='ws-list-item'><a href='#'>How it works</a></li>
              <li className='ws-list-item'><a href='#'>Social</a></li>
            </ul>
          </div>

          <div className='resources'>
            <label className='resources-title'>resources</label>
            <ul>
              <li className='ws-list-item'><a href='#'>Blog</a></li>
              <li className='ws-list-item'><a href='#'>Terms</a></li>
              <li className='ws-list-item'><a href='#'>Privacy</a></li>
            </ul>
          </div>

          <div className='copyright'>
            <span className='copyright-text'>workSpace &copy; 2017</span>
          </div>
        </footer>
      </div>
    )
  }
}

export default Footer
