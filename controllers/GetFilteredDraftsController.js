const Draft = require('../models/Draft')
const getFeaturedDrafts = require('./GetFeaturedDraftsController')

module.exports = {
  get: function(params){
    let topicsArr = []
    Object.keys(params.topics).forEach((key) => {
      if(params.topics[key] === 'true'){
        topicsArr.push(key)
      }
    })

    return new Promise(function(resolve, reject){
      if (topicsArr.length === 0){
        getFeaturedDrafts.get()
        .then(function(drafts){
          resolve(drafts)
          return
        })
        .catch(function(err){
          reject(err)
          return
        })
        return
      }

      Draft.find({ topics: { $in: topicsArr } }).
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
