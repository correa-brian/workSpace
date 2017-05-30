const aws = require('aws-sdk')

module.exports = {
  get: function(req, res){
    return new Promise(function(resolve, reject){

      console.log('Line 5 s3 query: '+JSON.stringify(req))
      const s3 = new aws.S3()
      const fileName = req.fileName.name
      const fileType = req.fileName.type
      console.log('Line 11 s3 fileName: '+JSON.stringify(fileName))
      console.log('Line 512 s3 fileType: '+JSON.stringify(fileType))

      const s3Params = {
        Bucket: process.env.S3BUCKET,
        Key: fileName,
        Expires: 60,
        ContentType: fileType,
        ACL: 'public-read'
      }

      s3.getSignedUrl('putObject', s3Params, function(err, res){
        if(err){
          console.log('S3 error: '+err)
          reject(err)
          return
        }
        const returnData = {
          signedRequest: res,
          url: 'https://'+process.env.S3BUCKET+'.s3.amazonaws.com/'+fileName
        }
        resolve(returnData)
      })
    })
  }
}
