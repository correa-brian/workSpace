const express = require('express')
const router = express.Router()
const draftController = require('../controllers/DraftController')
const getFeaturedDraftsController = require('../controllers/GetFeaturedDraftsController')
const getFilteredDraftsController = require('../controllers/GetFilteredDraftsController')
const signS3 = require('../controllers/SignS3')
const transformImage = require('../controllers/TransformImage')
const controllers = {
  drafts: draftController,
  getFeaturedDrafts: getFeaturedDraftsController,
  getFilteredDrafts: getFilteredDraftsController,
  signS3: signS3,
  transformImage: transformImage
}

router.get('/:resource', function(req, res) {
  const resource = req.params.resource
  const controller = controllers[resource]
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

router.get('/:resource/:id', function(req, res){
  const resource = req.params.resource
  const controller = controllers[resource]
  const id = req.params.id

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

router.post('/:resource', function(req, res){
  const resource = req.params.resource
  const params = req.body
  const controller = controllers[resource]

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
