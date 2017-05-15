import React, { Component } from 'react'
import Header from './Header'
import Jumbotron from './Jumbotron'
import Footer from './Footer'

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
        <Jumbotron />
        <Footer />
      </div>
    )
  }
}

export default LandingLayout
