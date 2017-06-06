const sharp = require('sharp')
const signS3 = require('../controllers/SignS3')
module.exports = {
  post: function(req){
    return new Promise(function(resolve, reject){

      const fileName = req.imageFile

      const parsedFile = req.imageDataURL.split(';base64,')
      const fileString = parsedFile[1]
      const fileBuffer = new Buffer(fileString, "base64")

      sharp(fileBuffer)
        .resize(200,200)
        .toBuffer({resolveWithObject: true}, function(err, data, info){
          if (err){
            reject(err)
            return
          }

          signS3.get({imgFileName: '200x200_'+fileName, imgFileType: 'image/'+info.format, imageData: data})
          .then(function(res){
            resolve(res)
            return
          })
          .catch(function(err){
            reject(err)
            return
          })

        })
    })
  }
}
