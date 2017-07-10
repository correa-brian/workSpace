import React, { Component } from 'react'
import DraftForm from '../../Draft/components/DraftForm'
import DraftList from '../../Draft/components/DraftList'
import { connect } from 'react-redux'
import store from '../../stores/store'
import { filterDrafts } from '../../Draft/actions/actions'
import APIManager from '../../utils/APIManager'

class SubmitDraftJumbotron extends Component {
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
    let _this = this

    return(
      <div className='jumbotron-submit-draft'>
        <div className='jumbotron-left'>
          <h4 className='jumbotron-title' onClick={this.startDraft}>Upload image to workSpace</h4>
          <DraftForm visible={visible} />
        </div>
      </div>
    )
  }
}

const stateToProps = (state) => ({
  drafts: state.draftReducer.drafts,
})

const dispatchToProps = (dispatch) => ({
  fetchFilteredDrafts: (drafts, params) => dispatch(filterDrafts(drafts, params))
})

export default connect (stateToProps, dispatchToProps)(SubmitDraftJumbotron)
