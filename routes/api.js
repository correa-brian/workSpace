var express = require('express')
var router = express.Router()
var draftController = require('../controllers/DraftController')
var getFeaturedDraftsController = require('../controllers/GetFeaturedDraftsController')
var controllers = {
  drafts: draftController,
  getFeaturedDrafts: getFeaturedDraftsController
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

  controller.get(req.query)
  .then(function(results){
    res.json({
      confirmation: 'Success',
      results: results
    })
  })
  .catch(function(err){
    res.json({
      confirmation: 'Fail',
      message: err
    })
  })
})

router.get('/:resource/:id', function(req, res, next){
  var resource = req.params.resource
  var controller = controllers[resource]
  var id = req.params.id

  if(controller === null){
    res.json({
      confirmation: 'Fail',
      message: 'Invalid Resource'
    })
    return
  }

  controller.getById(id)
  .then(function(result){
    res.json({
      confirmation: 'Success',
      result: result
    })
  })
  .catch(function(err){
    res.json({
      confirmation: 'Fail',
      message: err
    })
  })
})

router.post('/:resource', function(req, res, next){
  var resource = req.params.resource
  var params = req.body
  var controller = controllers[resource]
  console.log('ROUTER POST RESOURCE: '+JSON.stringify(resource))
  console.log('ROUTER POST PARAMS: '+JSON.stringify(params))

  if(controller === null){
    res.json({
      confirmation: 'Fail',
      message: 'Invalid Resource'
    })
    return
  }

  controller.post(params)
  .then(function(result){
    res.json({
      confirmation: 'Success',
      result: result
    })
  })
  .catch(function(err){
    res.json({
      confirmation: 'Fail',
      message: 'Your draft was not successfully posted. See: '+err
    })
  })

})

module.exports = router;
