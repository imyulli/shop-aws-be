# shop-aws-be

## What was done?

  1. Task 4.1 is implemented
  2. Task 4.2 is implemented lambda links are provided and returns data
  3. Task 4.3 is implemented lambda links are provided and products is stored in DB (call Task 4.2 to see the product)
  4. Frontend application is integrated with Product Service (/products API) and products from Product Service are represented on Frontend.

  Additional (optional) tasks
  1. POST /products lambda functions returns error 400 status code if product data is invalid
  2. All lambdas return error 500 status code on any error (DB connection, any unhandled error in code)
  3. All lambdas do console.log for each incoming requests and their arguments

## Link to Product Service API:
  GetProductsList: GET - https://9dz1y3v6qj.execute-api.eu-west-1.amazonaws.com/dev/products
  GetProductsById: GET - https://9dz1y3v6qj.execute-api.eu-west-1.amazonaws.com/dev/products/{productId}
  CreateProduct: POST - https://9dz1y3v6qj.execute-api.eu-west-1.amazonaws.com/dev/products
  SWAGGER - https://s2nkypsauh.execute-api.eu-west-1.amazonaws.com/swagger

## Link to FE -  
  https://github.com/imyulli/shop-angular-cloudfront
  https://d2w89pf5wj2a53.cloudfront.net