import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse, errorResponse } from '@libs/api-gateway';
import { ApplicationError } from '@errors/errors';
import { middyfy } from '@libs/lambda';
import { getProductsWithStocks } from '@services/databaseService';
import schema from './schema';

const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  try {
    console.log('Getting product list');
    const result = (await getProductsWithStocks());
    return formatJSONResponse(result);
  }
  catch (error) {
    return errorResponse(new ApplicationError('Someting was broken while creating a product'));
  }
};

export const main = middyfy(getProductsList);
