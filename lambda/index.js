require("dotenv").config();
const AWS = require('aws-sdk');
const INPUT_FOLDER = "IN";
const OUTPUT_FOLDER = "OUT";

let s3Client = new AWS.S3({region: process.env.AWS_REGION });
console.log("s3Client created");

const lambda = async (event) => {
    try {
        /*
        // check credentials are loaded
        AWS.config.getCredentials(function(error) {
            if (error) {
                throw error;
            }
            //console.log("Loaded config", JSON.stringify(AWS.config));
        });
        */

        // extract necessary parameters
        console.log('Received event ', JSON.stringify(event));
        const bucketName = event.Records?.[0]?.s3?.bucket?.name;
        const key = event.Records?.[0]?.s3?.object?.key;
        const fileName = key.substring(key.indexOf('/') + 1);

        if (!s3Client) {
            console.log("s3Client is NULL creating again...");
            s3Client = new AWS.S3({region: process.env.AWS_REGION });
        } else {
            console.log("s3Client already created");
        }

        // read file object from s3 bucket IN folder
        const fileObjectParams = {
            Bucket : bucketName,
            Key : key
        }
        const data = await s3Client.getObject(fileObjectParams).promise();
        //console.log("retrieved data ", JSON.stringify(data));
        let fileContent = data.Body.toString('utf-8');
        let reversedFileContent = fileContent.split('').reverse().join('');
        console.log("fileContent: " + fileContent + " reversedFileContent: " + reversedFileContent);

        // write new file object to s3 bucket OUT folder
        const s3PutMetaData = {
            type: 'txt'
        };
        const s3PutParams = {
            Bucket: bucketName,
            Key : OUTPUT_FOLDER + "/" + fileName,
            Body: reversedFileContent,
            Metadata: s3PutMetaData
        };
        await s3Client.putObject(s3PutParams).promise();

        // delete file object from s3 bucket IN folder
        await s3Client.deleteObject(fileObjectParams).promise();

        console.log("Operation completed");
    } catch(error) {
        console.error(error);
        throw error;
    }
    return true;
};

exports.lambda = lambda;