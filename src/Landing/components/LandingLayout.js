import React, { Component } from 'react'
import Header from './Header'
import Jumbotron from './Jumbotron'
import Footer from './Footer'

class LandingLayout extends Component {
  constructor(props){
    super(props)
    this.state = {
      opacity: 0
    }
  }

  componentDidMount(){
    setTimeout(() => {this.setState({opacity: 1})}, 200)
  }

  render(){
    return(
      <div className='app-container' style={{opacity: this.state.opacity}}>
        <Header />
        <Jumbotron />
        <Footer />
      </div>
    )
  }
}

export default LandingLayout
