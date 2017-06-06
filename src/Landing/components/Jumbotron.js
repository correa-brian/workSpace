import React, { Component } from 'react'
import DraftForm from '../../Draft/components/DraftForm'
import DraftList from '../../Draft/components/DraftList'
import { connect } from 'react-redux'
import store from '../../stores/store'
import { filterDrafts } from '../../Draft/actions/actions'

class Jumbotron extends Component {
  constructor(props){
    super(props)
    this.topicNames = ['grammar', 'plot', 'spelling', 'storyline']
    this.highlightTopic = this.highlightTopic.bind(this)
    this.startDraft = this.startDraft.bind(this)
    this.state = {
      topics: {'grammar': false, 'plot':false, 'spelling':false, 'storyline':false},
      visible: false
    }
  }

  highlightTopic(event){
    let {topics} = this.state
    let updatedTopicsState = Object.assign({}, topics)
    updatedTopicsState[event.target.id] = !updatedTopicsState[event.target.id]
    this.setState({topics: updatedTopicsState})
    // this.props.fetchFilteredDrafts(updatedTopicsState)
  }

  startDraft(event){
    this.setState({visible: !this.state.visible})
  }

  render(){
    let {visible, topics} = this.state
    let _this = this
    let tagsList = this.topicNames.map(function(tag, i){
      return <p key={i} id={tag} className='topic' style={{backgroundColor: topics[tag] === true ? 'blue':''}} onClick={_this.highlightTopic}>{tag} </p>
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
  fetchFilteredDrafts: () => dispatch(filterDrafts())
})

export default connect (stateToProps, dispatchToProps)(Jumbotron)
