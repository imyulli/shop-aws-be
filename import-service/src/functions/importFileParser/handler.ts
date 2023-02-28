import { S3Client, GetObjectCommand, CopyObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { errorResponse } from '@libs/api-gateway';
import { S3Event } from "aws-lambda";
import csv from 'csv-parser';

const BUCKET = 'yi-import-service-bucket';
const REGION = "eu-west-1";
const s3Client = new S3Client({ region: REGION });

const importFileParser = async (event: S3Event) => {
  try {
    for (const record of event.Records) {
      const key = record.s3.object.key;
      const getParams = {
        Bucket: BUCKET,
        Key: key
      }
    
      const data = await s3Client.send(new GetObjectCommand(getParams));
      const stream = data.Body as NodeJS.ReadableStream;
      const results = [];
  
      await new Promise((resolve, reject) => {
        stream.pipe(csv())
        .on('data', (data) => {
          results.push(data);
        })
        .on('end', () => {
          console.log(results);
          resolve('');
        })
        .on('error', (error) => {
          console.log(error);
          reject(error);
        });
      });
  
      const copyParams = {
        Bucket: BUCKET,
        CopySource: `${BUCKET}/${key}`,
        Key: key.replace('uploaded', 'parsed'),
      };
      await s3Client.send(new CopyObjectCommand(copyParams));
  
      const deleteParams = {
        Bucket: BUCKET,
        Key: key
      };
      await s3Client.send(new DeleteObjectCommand(deleteParams));
    }
  }
  catch (error) {
    errorResponse(error);
  }
};

export const main = importFileParser;
