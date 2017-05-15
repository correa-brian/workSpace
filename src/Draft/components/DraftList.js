import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from '../../stores/store'
import { receivedDrafts } from '../actions/actions'
import DraftListItem from './DraftListItem'

class DraftList extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    console.log('fetchDrafts')
    this.props.fetchDrafts()
  }

  render(){
    let {drafts} = this.props
    console.log('drafts PROPS: '+JSON.stringify(this.props.drafts))

    let draftRows = drafts.map(function(draft, i ){
      return <DraftListItem key={i} draft={draft} />
    })

    return(
      <div>
        {draftRows}
      </div>
    )
  }
}

const stateToProps = (state) => ({
  drafts: state.draftReducer.drafts
})

const dispatchToProps = (dispatch) => ({
  fetchDrafts: () => dispatch(receivedDrafts())
})

export default connect (stateToProps, dispatchToProps)(DraftList)
