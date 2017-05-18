import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from '../../stores/store'
import { receivedDraft, receivedFeaturedDrafts, createdDraft } from '../actions/actions'
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
    const id = event.target.id
    if (id === 'back') return this.setState({slide: this.state.slide-1})
    if(this.state.slide === 1) return this.submitDraft(this.props.draft)

    console.log('CURRENT DRAFT: '+JSON.stringify(this.props.draft))
    this.setState({slide: this.state.slide+1})
  }

  submitDraft(draft){
    console.log('Submitting for review: '+JSON.stringify(draft))
    this.props.submitDraft(draft)
    this.props.fetchDrafts()
  }

  render(){
    let {visible, slide} = this.state
    let content

    if(slide === 0){
      content = <div key='1'><input id='title' className={visible ? 'form-slideIn' : 'form-slideOut'} placeholder='Would you you like to title it?' onChange={this.captureDraft} /> <br /> <textarea name='text' id='text' className={visible ? 'form-slideIn' : 'form-slideOut'} placeholder="Share your draft..." onChange={this.captureDraft}></textarea></div>
    }

    if(slide === 1){
      content = <div key='2'><input id='authorID' className={visible ? 'form-slideIn' : 'form-slideOut'} placeholder='Name?' onChange={this.captureDraft} /> <br /> <input id='topics' className={visible ? 'form-slideIn' : 'form-slideOut'} placeholder='Tags' onChange={this.captureDraft} /> <br /> <button id='back' className={visible ? 'submit-btn form-slideIn' : 'submit-btn form-slideOut'} onClick={this.nextField}>Previous</button> </div>
    }

    return(
      <div id='jumbotron-container' className={visible ? 'slideIn' : 'slideOut'}>
        <h4 className='jumbotron-title' >Would you like to add to your workSpace?</h4>
        <DraftInputs className='draft-form'>
          {content}
        </DraftInputs>
        <button className={visible ? 'submit-btn form-slideIn' : 'submit-btn form-slideOut'} onClick={this.nextField}>{(slide === 1) ? 'Submit': 'Next' }</button>
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
  updateDraft: (draft) => dispatch(receivedDraft(draft)),
  fetchDrafts: () => dispatch(receivedFeaturedDrafts()),
  submitDraft: (draft) => dispatch(createdDraft(draft))
})

export default connect (stateToProps, dispatchToProps)(DraftFrom)
