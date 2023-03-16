import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import schema from './schema';

const BUCKET = 'yi-import-service-bucket';
const REGION = "eu-west-1";
const s3Client = new S3Client({ region: REGION });

const importProductsFile: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const { name } = event.queryStringParameters;
  const params = {
    Bucket: BUCKET,
    Key: `uploaded/${name}`,
    ContentType: 'text/csv'
  }
  const command = new PutObjectCommand(params);
  const signedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 3600,
  });
  return formatJSONResponse(
    signedUrl
  );
};

export const main = middyfy(importProductsFile );
