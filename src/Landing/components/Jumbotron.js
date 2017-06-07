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
    this.topicNames = ['grammar', 'plot', 'spelling', 'storyline']
    this.highlightTopic = this.highlightTopic.bind(this)
    this.startDraft = this.startDraft.bind(this)
    this.state = {
      topicSelection: {'grammar': false, 'plot':false, 'spelling':false, 'storyline':false},
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

  startDraft(event){
    this.setState({visible: !this.state.visible})
  }

  render(){
    let {visible, topicSelection} = this.state
    let _this = this
    let tagsList = this.topicNames.map(function(tag, i){
      return <p key={i} id={tag} className='topic' style={{backgroundColor: topicSelection[tag] === true ? 'blue':''}} onClick={_this.highlightTopic}>{tag} </p>
    })
    return(
      <div className='jumbotron'>
        <div className='jumbotron-left'>
          <DraftForm visible={visible} />
          <div id='workspace-btn' onClick={this.startDraft}>
            <img id='workspace-btn-bg' src="/assets/images/workspace-logo-white.png" />
          </div>
        </div>
        <div className='jumbotron-right'>
          <h1 className='draft-list-header'>Explore Trending Drafts</h1>
          <div style={{textAlign:'center', margin: '1em auto'}}>
            {tagsList}
          </div>
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
