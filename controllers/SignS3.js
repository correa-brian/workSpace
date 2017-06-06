const aws = require('aws-sdk')
const fs = require('fs')
module.exports = {
  get: function(req, res){
    return new Promise(function(resolve, reject){
      const s3 = new aws.S3()
      const fileName = req.imgFileName
      const fileType = req.imgFileType

      const s3Params = {
        Bucket: process.env.S3BUCKET,
        Key: fileName,
        Expires: 60,
        ContentType: fileType,
        ACL: 'public-read'
      }

        let imageData = Buffer.from(req.imageData).toString('base64')
        s3.getSignedUrl('putObject', s3Params, function(err, res){
          if(err){
            reject(err)
            return
          }
          const returnData = {
            signedRequest: res,
            url: 'https://'+process.env.S3BUCKET+'.s3.amazonaws.com/'+fileName,
            imageBase64Data: imageData,
            contentType: fileType
          }
          resolve(returnData)
          return
        })

    })
  }
}
