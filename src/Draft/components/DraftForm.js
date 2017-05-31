import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from '../../stores/store'
import { receivedDraft, receivedFeaturedDrafts, createdDraft } from '../actions/actions'
import DraftContainer from './DraftContainer'
import DraftInput from './DraftInput'
import request from 'superagent'
import APIManager from '../../utils/APIManager'

const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
  const byteCharacters = atob(b64Data)
  const byteArrays = []

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize)

    const byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)

    byteArrays.push(byteArray)
  }

  const blob = new Blob(byteArrays, {type: contentType})
  return blob
}

class DraftFrom extends Component {
  constructor(props){
    super(props)
    this.captureDraft = this.captureDraft.bind(this)
    this.nextField = this.nextField.bind(this)
    this.resizeImage = this.resizeImage.bind(this)
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

  resizeImage(event){
    event.preventDefault()
    let reader = new FileReader()
    let file = event.target.files[0]

    reader.onloadend = () => {
      this.setState({file:file})
      let _this = this
      APIManager.get('/api/transformImage', {imageDataURL: reader.result, imageFile: file})
      .then(function(res){
        _this.setState({signedRequest:res.results})
        return
      })
      .catch(function(err){
        console.log('Line 69 ERR: '+JSON.stringify(err))
        alert('Something went wrong tranforming image: '+JSON.stringify(err))
        return
      })
    }

    reader.readAsDataURL(file)
  }

  uploadImage(){
    let {signedRequest, file} = this.state
    let _this = this

    const blob = b64toBlob(signedRequest.imageBase64Data, signedRequest.contentType)

    request
     .put(signedRequest.signedRequest)
     .send(blob)
     .set('Accept', 'application/json')
     .end(function(err, res){
       if (err) return alert('Something went wrong uploading your image. Please try again.')
       if (res.status === 200) {
         let newDraft = Object.assign({}, _this.props.draft)
         newDraft['image'] = signedRequest.url
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
      content = <input name='image' type='file' id='imageInput' onChange={this.resizeImage} />
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
