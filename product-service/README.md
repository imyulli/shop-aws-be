# shop-aws-be

## What was done?

  [x] File serverless.yml contains configuration for catalogBatchProcess function
  [x] File serverless.yml contains policies to allow lambda catalogBatchProcess function to interact with SNS and SQS
  [x] File serverless.yml contains configuration for SQS catalogItemsQueue
  [x] File serverless.yml contains configuration for SNS Topic createProductTopic and email subscription

## Additional (optional) tasks:
  [ ] catalogBatchProcess lambda is covered by unit tests
  [x] Set a Filter Policy for SNS createProductTopic in serverless.yml and create an additional email subscription to distribute messages to different emails depending on the filter for any product attribute

## Link to FE -
  https://d2w89pf5wj2a53.cloudfront.net