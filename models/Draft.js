var mongoose = require('mongoose')

var DraftSchema = new mongoose.Schema({
  title: {type: String, default: ''},
  authorID: {type: String, default: ''},
  text: {type: String, default: ''},
  topics: {type: Array, default: []},
  image: {type: mongoose.Schema.Types.Mixed, default: {}},
  timestamp: {type: String, default: Date.now}
})

DraftSchema.methods.summary = function(){
  var summary = {
    id: this._id,
    title: this.title,
    authorID: this.authorID,
    text: this.text,
    topics: this.topics,
    image: this.image,
    timestamp: this.timestamp
  }

  return summary
}

module.exports = mongoose.model('DraftSchema', DraftSchema)
