const fs = require('fs');
const path = require('path');

const AWS = require('aws-sdk');
const s3StreamFactory = require('s3-upload-stream');

const envVars = require('./.env.json');

const awsS3Config = {
  accessKeyId: envVars['S3_ACCESS_KEY_ID'],
  secretAccessKey: envVars['S3_SECRET_ACCESS_KEY'],
  region: envVars['S3_REGION']
};
const s3Stream = s3StreamFactory(new AWS.S3(awsS3Config));

const workingDirectory = path.join(__dirname, 'assets/build');

const s3bucketConfig = {
  Bucket: envVars['S3_ASSETS_BUCKET']
};

const gzipMetaTags = {
  ContentEncoding: 'gzip',
  ContentType: 'text/javascript'
};
const cssMetaTags = {
  ContentType: 'text/css'
};

const tasks = [];

const files = fs.readdirSync(workingDirectory);

files.forEach(file => {
  // uploaded by file type to allow for special tag appending
  //
  // gzipped files
  if (/\.(gz)/.test(file)) {
    tasks.push(uploadFile(workingDirectory, file, { ...s3bucketConfig, ...gzipMetaTags }));
  }
  // css files
  else if (/\.(css)/.test(file)) {
    tasks.push(uploadFile(workingDirectory, file, { ...s3bucketConfig, ...cssMetaTags }));
  }
  // file types to skip uploading
  else if (/index\.html/.test(file)) {
    console.log('skipping:' + file)
  }
  else {
    tasks.push(uploadFile(workingDirectory, file, s3bucketConfig));
  }
});

function uploadFile(workingDirectory, filename, extraConfig = {}) {
  return new Promise((resolve, reject) => {
    const config = Object.assign({ Key: filename }, extraConfig);

    // Create the streams
    const upload = s3Stream.upload(config);

    // Optional configuration
    upload.maxPartSize(20971520); // 20 MB
    upload.concurrentParts(5);

    // Handle errors.
    upload.on('error', (error) => {
      console.log(error);
      reject(error);
    });

    /* Handle upload completion. Example details object:
      { Location: 'https://bucketName.s3.amazonaws.com/filename.ext',
        Bucket: 'bucketName',
        Key: 'filename.ext',
        ETag: '"bf2acbedf84207d696c8da7dbb205b9f-5"' }
    */
    upload.on('uploaded', (details) => {
      console.log(`${filename} was successfully uploaded!`);
      console.dir(details);
      resolve();
    });

    const readStream = fs.createReadStream(path.join(workingDirectory, filename));
    readStream.pipe(upload);
  });
}

Promise.all(tasks)
  .then(() => console.log('All uploads successfully completed! Have a great day'))
  .catch(errors => errors.forEach(error => console.error(error)));
