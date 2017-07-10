import React, { Component } from 'react'

class DraftListItem extends Component {
  constructor(props){
    super(props)
  }

  render(){
    let {draft} = this.props

    return(
      <div className='draft-list-item'>
        <img src={draft.image} />
        <h1>{draft.title}</h1>
        <p>Tags: {draft.topics}</p>
      </div>
    )
  }
}

export default DraftListItem
