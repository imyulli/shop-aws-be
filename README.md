# shop-aws-be

## What was done?

  - [x] authorization-service is added to the repo, has correct basicAuthorizer lambda and correct serverless.yaml file
  - [x] Import Service serverless.yaml file has authorizer configuration for the importProductsFile lambda. Request to the importProductsFile lambda should work only with correct authorization_token being decoded and checked by basicAuthorizer lambda. Response should be in 403 HTTP status if access is denied for this user (invalid authorization_token) and in 401 HTTP status if Authorization header is not provided.
  - [x] Client application is updated to send "Authorization: Basic authorization_token" header on import. Client should get authorization_token value from browser localStorage

## Additional (optional) tasks:
  - [x] Client application should display alerts for the responses in 401 and 403 HTTP statuses.

## Link to FE -
  https://d2w89pf5wj2a53.cloudfront.net