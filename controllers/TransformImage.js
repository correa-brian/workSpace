const sharp = require('sharp')
const signS3 = require('../controllers/SignS3')

module.exports = {
  get: function(req, res){
    console.log('Line 6 transformImage GET')
    return new Promise(function(resolve, reject){
      console.log('Line 8 transformImage PROMISE')

      const fileName = req.imageFile.name

      const parsedFile = req.imageDataURL.split('data:image/png;base64,')
      const fileString = parsedFile[1]
      const fileBuffer = new Buffer(fileString, "base64")

      sharp(fileBuffer)
        .resize(200,200)
        .toFile('./public/assets/images/'+'200x200_'+fileName, function(err, info){
          if (err){
            reject(err)
            return
          }
          signS3.get({imgFileName: '200x200_'+fileName, imgFileType: 'image/'+info.format})
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
