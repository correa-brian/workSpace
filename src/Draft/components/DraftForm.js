import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from '../../stores/store'
import { receivedDraft } from '../actions/actions'
import DraftInputs from './DraftInputs'

class DraftFrom extends Component {
  constructor(props){
    super(props)
    this.startDraft = this.startDraft.bind(this)
    this.captureDraft = this.captureDraft.bind(this)
    this.nextField = this.nextField.bind(this)
    this.state = {
      visible: false,
      slide: 0
    }
  }

  startDraft(event){
    this.setState({visible: !this.state.visible })
  }

  captureDraft(event){
    const id = event.target.id
    const value = event.target.value
    let newDraft = Object.assign({}, this.props.draft)
    newDraft[id] = value

    this.props.updateDraft(newDraft)
  }

  nextField(event){
    console.log('nextField: '+JSON.stringify(this.props.draft))
    //this.props.redux-action
  }

  render(){
    let {visible, slide} = this.state

    return(
      <div id='jumbotron-container' className={visible ? 'slideIn' : 'slideOut'}>
        <h4 className='jumbotron-title' >Would you like to add to your workSpace?</h4>
        <DraftInputs className='draft-form'>
          <input id='title' className={visible ? 'title-visible' : 'title-not-visible'} placeholder='Would you you like to title it?' onChange={this.captureDraft} /> <br />
          <textarea name='text' id='text' className={visible ? 'slideIn' : 'slideOut'} placeholder="Share your draft..." onChange={this.captureDraft}></textarea>
        </DraftInputs>
        <button className={visible ? 'submit-btn btn-visible' : 'submit-btn btn-not-visible'} onClick={this.nextField}>Next</button>
        <div id='workspace-btn' onClick={this.startDraft}>
          <img id='workspace-btn-bg' src="/assets/images/workspace-logo-white.png" />
        </div>
      </div>
    )
  }
}

const stateToProps = (state) => ({
  draft: state.draftReducer.draft
})

const dispatchToProps = (dispatch) => ({
  updateDraft: (draft) => dispatch(receivedDraft(draft))
})

export default connect (stateToProps, dispatchToProps)(DraftFrom)
