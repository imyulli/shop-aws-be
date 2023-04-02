import type { AWS } from '@serverless/typescript';

import getProductsList from '@functions/getProductsList';
import getProductsById from '@functions/getProductsById';
import createProduct from '@functions/createProduct';
import catalogBatchProcess from '@functions/catalogBatchProcess';

const serverlessConfiguration: AWS = {
  service: 'product-service',
  frameworkVersion: '3',
  plugins: ['serverless-auto-swagger', 'serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      PRODUCTS_TABLE: 'Products',
      STOCKS_TABLE: 'Stocks',
      REGION: 'eu-west-1',
      SNS_ARN: {
        Ref: 'SNSTopic'
      }
    },
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: [
              'dynamodb:DescribeTable',
              'dynamodb:Query',
              'dynamodb:Scan',
              'dynamodb:GetItem',
              'dynamodb:PutItem',
              'dynamodb:UpdateItem',
              'dynamodb:DeleteItem',
            ],
            Resource: '*'
          },
          {
            Effect: 'Allow',
            Action: 'sqs:*',
            Resource: [
              { 'Fn::GetAtt': ['SQSQueue', 'Arn'] },
            ],
          },
          {
            Effect: 'Allow',
            Action: 'sns:*',
            Resource: [
              { Ref: 'SNSTopic'},
            ],
          },
        ]
      }
    },
    region: 'eu-west-1',
    stage: 'dev',
  },
  // import the function via paths
  functions: { getProductsList, getProductsById, createProduct, catalogBatchProcess },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    autoswagger: {
      host: '9dz1y3v6qj.execute-api.eu-west-1.amazonaws.com/dev'
    }
  },
  resources: {
    Resources: {
      SQSQueue: {
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: 'catalogItemsQueue'
        }
      },
      SNSTopic: {
        Type: 'AWS::SNS::Topic',
        Properties: {
          TopicName: 'createProductTopic'
        }
      },
      SNSSubscription: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: 'trefilova.yulya@gmail.com',
          Protocol: 'email',
          TopicArn: {
            Ref: 'SNSTopic'
          }
        }
      },
      SNSSubscriptionWithFiltration: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: 'yulia_ivanova@epam.com',
          Protocol: 'email',
          TopicArn: {
            Ref: 'SNSTopic'
          },
          FilterPolicy: {
            title: [{"prefix": "Philo"}],
            price: [{"numeric": [">=", 100,"<", 150]}]
          }
        }
      }
    }
  }
};

module.exports = serverlessConfiguration;
