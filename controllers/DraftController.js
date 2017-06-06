const Draft = require('../models/Draft')

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
  // get: function(params){
  //   console.log('Line 16 params: '+JSON.stringify(params))
  //   if (params.topics){
  //     console.log('search topics!')
  //   }
  //   return new Promise(function(resolve, reject){
  //     Draft.find(params, function(err, drafts){
  //       if(err){
  //         reject(err)
  //         return
  //       }
  //       resolve(drafts)
  //     })
  //   })
  // },
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
