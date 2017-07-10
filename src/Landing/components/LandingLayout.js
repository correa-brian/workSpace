import React, { Component } from 'react'
import Footer from './Footer'
import Header from './Header'
import Jumbotron from './Jumbotron'
import SubmitDraftJumbotron from './SubmitDraftJumbotron'
import WelcomeJumbotron from './WelcomeJumbotron'

class LandingLayout extends Component {
  constructor(props){
    super(props)
    this.state = {
      opacity: 0,
      visible: false
    }
  }

  componentDidMount(){
    setTimeout(() => {this.setState({opacity: 1, visible: true})}, 0)
  }

  render(){
    return(
      <div className='app-container' style={{opacity: this.state.opacity}}>
        <Header visible={this.state.visible} />
        <WelcomeJumbotron />
        <Jumbotron />
        <SubmitDraftJumbotron />
        <Footer />
      </div>
    )
  }
}

export default LandingLayout
