import React, { Component } from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { connect } from 'react-redux'
import store from '../../stores/store'
import { receivedFeaturedDrafts } from '../actions/actions'
import DraftListItem from './DraftListItem'

class DraftList extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.fetchDrafts()
  }

  render(){
    let {drafts, draft} = this.props

    let draftRows = drafts.map(function(draft, i ){
      return <DraftListItem key={i} draft={draft} />
    })

    return(
      <CSSTransitionGroup
        className='draft-list'
        style={{width: 50*drafts.length+'%'}}
        transitionName="example"
        transitionEnterTimeout={400}
        transitionLeaveTimeout={300}>
          {draftRows}
      </CSSTransitionGroup>
    )
  }
}

const stateToProps = (state) => ({
  drafts: state.draftReducer.drafts,
  draft: state.draftReducer.draft
})

const dispatchToProps = (dispatch) => ({
  fetchDrafts: () => dispatch(receivedFeaturedDrafts())
})

export default connect (stateToProps, dispatchToProps)(DraftList)
