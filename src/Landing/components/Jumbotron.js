import React, { Component } from 'react'
import DraftForm from '../../Draft/components/DraftForm'
import DraftList from '../../Draft/components/DraftList'

class Jumbotron extends Component {
  constructor(props){
    super(props)
    this.startDraft = this.startDraft.bind(this)
    this.state = {
      visible: false
    }
  }

  startDraft(event){
    this.setState({visible: !this.state.visible})
  }

  render(){
    let {visible} = this.state
    return(
      <div className='jumbotron'>
        <div className='jumbotron-left'>
          <DraftForm visible={visible} />
          <div id='workspace-btn' onClick={this.startDraft}>
            <img id='workspace-btn-bg' src="/assets/images/workspace-logo-white.png" />
          </div>
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
