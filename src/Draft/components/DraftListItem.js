import React, { Component } from 'react'

class DraftListItem extends Component {
  constructor(props){
    super(props)
  }

  render(){
    let {draft} = this.props

    return(
      <div className='draft-list-item'>
        <h1>{draft.title}</h1>
        <img src={draft.image} />
        <h3>Drafted by: {draft.authorID}</h3>
        <p>{draft.text}</p>
        <p>Topics: {draft.topics}</p>
      </div>
    )
  }
}

export default DraftListItem
