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
          <h1 className='draft-list-header'>Trending Drafts</h1>
          <div className='jumbotron-overlay'>
            <DraftList />
          </div>
        </div>
      </div>
    )
  }
}

export default Jumbotron
