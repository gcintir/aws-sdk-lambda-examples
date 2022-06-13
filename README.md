# aws-sdk-lambda-examples
AWS SDK Lambda examples

# Install & Test & Zip:

## cd to aws-sdk-lambda-examples lambda folder
```
npm install
npm test
npm prune --production
zip -r aws-sdk-lambda-examples.zip *
```

# Deploy to AWS

## update code
```
aws lambda update-function-code --function-name aws-sdk-lambda-examples --zip-file fileb://aws-sdk-lambda-examples.zip
```
## update environment variable
```
 aws lambda update-function-configuration --function-name aws-sdk-lambda-examples --environment file://aws-sdk-lambda-examples.env.json
 ```

 ## invoke code
```
aws lambda invoke --function-name aws-sdk-lambda-examples output.json
 ```

