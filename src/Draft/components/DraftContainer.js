import React, { Component } from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

class DraftContainer extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <CSSTransitionGroup
        transitionName="example"
        transitionEnterTimeout={400}
        transitionLeaveTimeout={300}>
        {this.props.children}
      </CSSTransitionGroup>
    )
  }
}

export default DraftContainer
