import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from '../../stores/store'
import { receivedDraft, receivedFeaturedDrafts, createdDraft } from '../actions/actions'
import DraftContainer from './DraftContainer'
import DraftInput from './DraftInput'
import request from 'superagent'
import APIManager from '../../utils/APIManager'

class DraftFrom extends Component {
  constructor(props){
    super(props)
    this.captureDraft = this.captureDraft.bind(this)
    this.nextField = this.nextField.bind(this)
    this.fetchS3URL = this.fetchS3URL.bind(this)
    this.uploadImage = this.uploadImage.bind(this)
    this.state = {
      slide: 0,
      file: null,
      imagePreviewURL: null,
      signedRequest: {}
    }
  }

  captureDraft(event){
    const id = event.target.id
    const value = event.target.value
    let newDraft = Object.assign({}, this.props.draft)
    newDraft[id] = value

    this.props.updateDraft(newDraft)
  }

  fetchS3URL(event){
    event.preventDefault()
    const value = event.target.value
    let reader = new FileReader()
    let file = event.target.files[0]

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewURL: reader.result
      })
      let _this = this
      APIManager.get('/api/signS3', {fileName: file})
      .then(function(data){
        _this.setState({signedRequest: data.results})
      })
      .catch(function(err){
        return alert('Looks like something went wrong uploading your image.')
      })
    }

    reader.readAsDataURL(file)
  }

  uploadImage(){
    let {signedRequest} = this.state.signedRequest
    //check for null signedRequest & skip uploadImage

    let _this = this
    request
      .put(signedRequest)
      .send(this.state.file)
      .set('Accept', 'application/json')
      .end(function(err, res){
        if (err) return alert('Something went wrong uploading your image. Please try again.')
        if (res.status === 200) {
          let newDraft = Object.assign({}, _this.props.draft)
          newDraft['image'] = _this.state.signedRequest.url
          _this.submitDraft(newDraft)
          return
        }
      })
  }

  nextField(event){
    const id = event.target.id
    if (id === 'back') return this.setState({slide: this.state.slide-1})
    if(this.state.slide === 2) return this.uploadImage()

    this.setState({slide: this.state.slide+1})
  }

  submitDraft(draft){
    this.props.submitDraft(draft)
    this.props.fetchDrafts()
  }

  render(){
    let {slide, imagePreviewURL} = this.state
    let imagePreview = null
    if (imagePreviewURL){
      imagePreview = (<img src={imagePreviewURL} />)
    }
    let {visible} = this.props
    let content

    if(slide === 0){
      content = <div key='1'> <DraftInput visible={visible} id='title' placeholder='Enter your title' onChange={this.captureDraft} /> <br /> <textarea name='text' id='text' className={visible ? 'form-slideIn' : 'form-slideOut'} placeholder="Your text..." onChange={this.captureDraft}></textarea></div>
    }

    if(slide === 1){
      content = <div key='2'><DraftInput id='authorID' visible={visible} placeholder='Name' onChange={this.captureDraft} /> <br /> <DraftInput id='topics' visible={visible} placeholder='Tags' onChange={this.captureDraft} /> <br /> </div>
    }

    if(slide === 2){
      content = <input name='image' type='file' id='imageInput' onChange={this.fetchS3URL} />
    }

    return(
      <div id='jumbotron-container' className={visible ? 'slideIn' : 'slideOut'}>
        <h4 className='jumbotron-title'>Submit a draft to workSpace</h4>
        <DraftContainer className='draft-form'>
          {content}
        </DraftContainer>
        <button id='back' className={(visible === true && slide !==0) ? 'submit-btn form-slideIn' : 'submit-btn form-slideOut'} onClick={this.nextField}>Previous</button>
        <button className={visible ? 'submit-btn form-slideIn' : 'submit-btn form-slideOut'} onClick={this.nextField}>{(slide === 2 ? 'Submit' : 'Next')}</button>
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
