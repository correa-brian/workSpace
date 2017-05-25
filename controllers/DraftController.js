const Draft = require('../models/Draft')
const Promise = require('bluebird')

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
  getById: function(id){
    return new Promise(function(resolve, reject){
      Draft.findById(id, function(err, draft){
        if(err){
          reject(err)
          return
        }

      resolve(draft.summary())
      })
    })
  },
  post: function(params){
    return new Promise(function(resolve, reject){
      Draft.create(params, function(err, draft){
        if(err){
          reject(err)
          return
        }

        resolve(draft.summary())
      })
    })
  }
}
