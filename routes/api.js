var express = require('express')
var router = express.Router()
var draftController = require('../controllers/DraftController')
var controllers = {
  drafts: draftController
}

router.get('/:resource', function(req, res, next) {
  var resource = req.params.resource
  var controller = controllers[resource]
  if(controller === null){
    res.json({
      confirmation: 'Fail',
      message: 'Invalid Resource'
    })
    return
  }

  controller.get(req.query, function(err, results){
    console.log('API ROUTE GET')
    if(err){
      res.json({
        confirmation: 'Fail',
        message: err
      })
      return
    }

    res.json({
      confirmation: 'Success',
      results: results
    })
    return
  })
})

router.post('/:resource', function(req, res, next){
  var resource = req.params.resource
  var params = req.body
  var controller = controllers[resource]

  if(controller === null){
    res.json({
      confirmation: 'Fail',
      message: 'Invalid Resource'
    })
    return
  }

  controller.post(params, function(err, result){
    if(err){
      res.json({
        confirmation: 'Fail',
        message: 'Your draft was not successfully posted. See: '+err,
      })
      return
    }

    res.json({
      confirmation: 'Success',
      result: result
    })
    return
  })
})

module.exports = router;
