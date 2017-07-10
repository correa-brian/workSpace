import React, { Component } from 'react'

class WelcomeJumbotron extends Component {
  constructor(props){
    super(props)
    this.state = {
      visible: false
    }
  }

  startDraft(event){
    this.setState({visible: !this.state.visible})
  }

  render(){
    let {visible} = this.state
    let _this = this
    return(
      <div className='jumbotron-welcome'>
      <div><h1 style={{margin:'2em auto auto 1em', height:2+'em'}}>Welcome to workSpace</h1></div>
      <div>
    
        <h1 style={{margin:'2em auto auto 6em', height:2+'em'}}>Share and tag pictures of your work space</h1>
      </div>
      </div>
    )
  }
}

export default WelcomeJumbotron
