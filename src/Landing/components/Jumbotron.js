import React, { Component } from 'react'
import DraftForm from '../../Draft/components/DraftForm'
import DraftList from '../../Draft/components/DraftList'

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
            <DraftList />
          </div>
        </div>
      </div>
    )
  }
}

export default Jumbotron
