const Draft = require('../models/Draft')
const Promise = require('bluebird')

module.exports = {
  get: function(params){
    return new Promise(function(resolve, reject){
      Draft.find({}).
      limit(10).
      sort({ timestamp: -1 }).
      then(function(drafts){
        resolve(drafts)
        return
      }).
      catch(function(err){
        reject(err)
        return
      })
    })
  }
}
