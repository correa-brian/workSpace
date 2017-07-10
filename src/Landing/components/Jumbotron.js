import React, { Component } from 'react'
import DraftForm from '../../Draft/components/DraftForm'
import DraftList from '../../Draft/components/DraftList'
import { connect } from 'react-redux'
import store from '../../stores/store'
import { filterDrafts } from '../../Draft/actions/actions'
import APIManager from '../../utils/APIManager'

class Jumbotron extends Component {
  constructor(props){
    super(props)
    this.topicNames = ['outside', 'coworking', 'coffee', 'snacks']
    this.highlightTopic = this.highlightTopic.bind(this)
    this.state = {
      topicSelection: {'outside': false, 'coworking':false, 'coffee':false, 'snacks':false},
      visible: false
    }
  }

  highlightTopic(event){
    let {topicSelection} = this.state
    let updatedTopicsState = Object.assign({}, topicSelection)
    updatedTopicsState[event.target.id] = !updatedTopicsState[event.target.id]
    this.setState({topicSelection: updatedTopicsState})
    this.props.fetchFilteredDrafts('drafts', {topics: updatedTopicsState})
  }

  render(){
    let {visible, topicSelection} = this.state
    let _this = this
    let tagsList = this.topicNames.map(function(tag, i){
      return <p key={i} id={tag} className='topic' style={{backgroundColor: topicSelection[tag] === true ? 'blue':''}} onClick={_this.highlightTopic}>{tag} </p>
    })
    return(
      <div className='jumbotron'>
        <h1 className='draft-list-header'>Explore Trending Work Spaces</h1>
        <div style={{textAlign:'center', margin: '1em auto'}}>
          {tagsList}
        </div>
        <div className='jumbotron-drafts-container'>
          <div className='jumbotron-overlay'>
            <DraftList />
          </div>
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

export default connect (stateToProps, dispatchToProps)(Jumbotron)
