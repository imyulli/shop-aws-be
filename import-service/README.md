# What was done?
## Tasks 5.1 - 5.4 are implemented:
  1. File serverless.yml contains configuration for importProductsFile function
  2. The importProductsFile lambda function returns a correct response which can be used to upload a file into the S3 bucket
  3. Frontend application is integrated with importProductsFile lambda
  4. The importFileParser lambda function is implemented and serverless.yml contains configuration for the lambda

## Additional scope:
  1. async/await is used in lambda functions
  2. At the end of the stream the lambda function should move the file from the uploaded folder into the parsed folder (move the file means that file should be copied into a new folder in the same bucket called parsed, and then deleted from uploaded folder)

# Link to Import Service API
  https://w5h03yo63d.execute-api.eu-west-1.amazonaws.com/dev/import

# SWAGGER
  https://qe7kdwiu6g.execute-api.eu-west-1.amazonaws.com/swagger