import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from '../../stores/store'
import { receivedDraft, receivedFeaturedDrafts, createdDraft } from '../actions/actions'
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
    this.resizeImage = this.resizeImage.bind(this)
    this.uploadImage = this.uploadImage.bind(this)
    this.state = {
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
    let file = event.target.files[0]
    let fileSize = file.size
    if (fileSize > 80000) return alert('Please pick a smaller-sized image.')

    let reader = new FileReader()

    reader.onloadend = () => {
      this.setState({file:file})
      let _this = this
      APIManager.post('/api/transformImage', {imageDataURL: reader.result, imageFile: file.name})
      .then(function(res){
        _this.setState({signedRequest:res.result})
        return
      })
      .catch(function(err){
        return alert('Something went wrong tranforming image: '+JSON.stringify(err))
      })
    }

    reader.readAsDataURL(file)
  }

  uploadImage(){
    let {signedRequest, file} = this.state
    let {draft} = this.props
    console.log('IMAGE ', draft)
    if (draft.title === undefined || draft.topics === undefined){ return alert('Woops, need a title and tags to upload image.') }
    if (draft.title.length === 0 || draft.topics.length === 0){ return alert('Woops, need a title and tags to upload image.') }
    if (signedRequest.imageBase64Data === undefined){ return alert('Woops, upload an image first.')}

    const blob = b64toBlob(signedRequest.imageBase64Data, signedRequest.contentType)

    let _this = this

    request
     .put(signedRequest.signedRequest)
     .send(blob)
     .set('Accept', 'application/json')
     .end(function(err, res){
       if (err) return alert('Something went wrong uploading your image. Please try again.')
       if (res.status === 200) {
         let newDraft = Object.assign({}, draft)
         newDraft['image'] = signedRequest.url
         _this.submitDraft(newDraft)
         return
       }
     })
  }

  submitDraft(draft){
    this.props.submitDraft(draft)
    this.props.fetchDrafts()
    return alert('workSpace uploaded!')
  }

  render(){
    let {slide, imagePreviewURL} = this.state
    let imagePreview = null
    if (imagePreviewURL){
      imagePreview = (<img src={imagePreviewURL} />)
    }
    let {visible} = this.props

    return(
      <div id='jumbotron-drafts-container' className={visible ? 'slideIn' : 'slideOut'}>
        <DraftInput visible={visible} id='title' placeholder='Enter your title' name='title' type='text' onChange={this.captureDraft} />
        <DraftInput id='topics' visible={visible} placeholder='Tags' name='topics' type='text' onChange={this.captureDraft} />
        <DraftInput id='imageInput' visible={visible} placeholder='Upload Image' name='image' type='file' onChange={this.resizeImage} style={{margin:1+'em', fontSize:1+'em'}} />
        <button className={visible ? 'submit-btn form-slideIn' : 'submit-btn form-slideOut'} onClick={this.uploadImage}>Submit</button>
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
