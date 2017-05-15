import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from '../../stores/store'
import { receivedDraft } from '../actions/actions'

class DraftFrom extends Component {
  constructor(props){
    super(props)
    this.showNextField = this.showNextField.bind(this)
    this.state = {
      marginTop: 20+'%',
      opacity: 0
    }
  }

  showNextField(event){
    console.log('showNextField: '+JSON.stringify(event.target.value))
    if(event.target.value === '') return this.setState({marginTop: 10+'%', opacity: 0})
    this.setState({marginTop: 5+'%', opacity: 1})
    this.props.updateDraft(event.target.value)
  }

  render(){
    console.log('DRAFT Props: '+JSON.stringify(this.props.draft))
    return(
      <div>
        <h4 className='jumbotron-title' style={{marginTop: this.state.marginTop, transitionProperty: 'margin-top', transitionDuration: '1.5s'}}>Add to our workSpace</h4>
        <form className='draft-form' action='/api/drafts' method='post'>
        <input onChange={this.showNextField}  name='title' id='title' placeholder='Start with a title' /> <br />
          <textarea style={{opacity: this.state.opacity, transitionProperty: 'opacity', transitionDuration: '1.5s'}} name='text' id='draft-body' placeholder="Share your draft..."></textarea> <br />
          <button style={{opacity: this.state.opacity, transitionProperty: 'opacity', transitionDuration: '1.5s'}} className='submit-btn' type="submit">Submit</button>
          <input style={{opacity: this.state.opacity, transitionProperty: 'opacity', transitionDuration: '1.5s'}} className='reset-btn' type="reset" value="Reset" />
        </form>
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
