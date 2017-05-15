import React, { Component } from 'react'
import DraftForm from '../../Draft/components/DraftForm'

class Jumbotron extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className='jumbotron'>
        <div className='jumbotron-left'>          
          <DraftForm />
        </div>
        <div className='jumbotron-right'>
          <div className='jumbotron-overlay'>
          </div>
        </div>
      </div>
    )
  }
}

export default Jumbotron
