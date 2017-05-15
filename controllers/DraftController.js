var Draft = require('../models/Draft')

module.exports = {
  get: function(params, callback){
    Draft.find(params, function(err, drafts){
      if(err){
        if(callback !== null)
          callback(err, null)
          return
      }
      if(callback !== null)
        callback(null, drafts)
    })
  },
  post: function(params, callback){
    // var topics = params.topics
    // var topicsArray = topics.split(',')
    // params.topics = topicsArray
    // console.log('topicsArray: '+JSON.stringify(topicsArray))
    Draft.create(params, function(err, draft){
      if(err){
        if(callback !== null)
          callback(err, null)
          return
      }
      if(callback !== null)
        callback(null, draft.summary())
    })
  }
}
