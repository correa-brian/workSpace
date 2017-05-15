var Draft = require('../models/Draft')
var Promise = require('bluebird')

module.exports = {
  get: function(params){
    return new Promise(function(resolve, reject){
      Draft.find(params, function(err, drafts){
        if(err){
          reject(err)
          return
        }

        resolve(drafts)
      })
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
