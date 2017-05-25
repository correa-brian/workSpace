import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from '../../stores/store'
import { receivedDraft, receivedFeaturedDrafts, createdDraft } from '../actions/actions'
import DraftContainer from './DraftContainer'
import DraftInput from './DraftInput'
import request from 'superagent'
import Dropzone from 'react-dropzone'
import APIManager from '../../utils/APIManager'

class DraftFrom extends Component {
  constructor(props){
    super(props)
    this.captureDraft = this.captureDraft.bind(this)
    this.nextField = this.nextField.bind(this)
    this.handleImageUpload = this.handleImageUpload.bind(this)
    this.state = {
      slide: 0
    }
  }

  captureDraft(event){
    const id = event.target.id
    const value = event.target.value
    let newDraft = Object.assign({}, this.props.draft)
    newDraft[id] = value

    console.log('newDraft: ', newDraft)
    this.props.updateDraft(newDraft)
  }

  handleImageUpload(event){
    const value = event.target.value
    //upload image to s3
  }

  nextField(event){
    const id = event.target.id
    if (id === 'back') return this.setState({slide: this.state.slide-1})
    if(this.state.slide === 2) return this.submitDraft(this.props.draft)

    this.setState({slide: this.state.slide+1})
  }

  submitDraft(draft){
    this.props.submitDraft(draft)
    this.props.fetchDrafts()
  }

  render(){
    let {slide} = this.state
    let {visible} = this.props
    let content

    if(slide === 0){
      content = <div key='1'> <DraftInput visible={visible} id='title' placeholder='Enter your title' onChange={this.captureDraft} /> <br /> <textarea name='text' id='text' className={visible ? 'form-slideIn' : 'form-slideOut'} placeholder="Your text..." onChange={this.captureDraft}></textarea></div>
    }

    if(slide === 1){
      content = <div key='2'><DraftInput id='authorID' visible={visible} placeholder='Name' onChange={this.captureDraft} /> <br /> <DraftInput id='topics' visible={visible} placeholder='Tags' onChange={this.captureDraft} /> <br /> </div>
    }

    if(slide === 2){
      content = <input type='file' accept='image/*' onChange={this.handleImageUpload} />
    }

    return(
      <div id='jumbotron-container' className={visible ? 'slideIn' : 'slideOut'}>
        <h4 className='jumbotron-title'>Submit a draft to workSpace</h4>
        <DraftContainer className='draft-form'>
          {content}
        </DraftContainer>
        <button id='back' className={(visible === true && slide !==0) ? 'submit-btn form-slideIn' : 'submit-btn form-slideOut'} onClick={this.nextField}>Previous</button>
        <button className={visible ? 'submit-btn form-slideIn' : 'submit-btn form-slideOut'} onClick={this.nextField}>{(slide === 2) ? 'Submit': 'Next' }</button>
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
  submitDraft: (draft) => dispatch(createdDraft(draft)),
})

export default connect (stateToProps, dispatchToProps)(DraftFrom)
