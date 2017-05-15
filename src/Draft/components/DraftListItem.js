import React, { Component } from 'react'

class DraftListItem extends Component {
  constructor(props){
    super(props)
  }

  render(){
    let {draft} = this.props
    console.log('Here are my drafts in a list: '+JSON.stringify(draft))

    return(
      <div style={{color: 'black', textShadow: 'none'}}>
        {draft.title}
      </div>
    )
  }
}

export default DraftListItem
