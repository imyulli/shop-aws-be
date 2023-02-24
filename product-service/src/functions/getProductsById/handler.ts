import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse, errorResponse } from '@libs/api-gateway';
import { NotFoundError, ApplicationError } from '@errors/errors';
import { middyfy } from '@libs/lambda';
import { getProductWithStock } from '@services/databaseService';

import schema from './schema';

const getProductsById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    const id  = event.pathParameters["productId"];
    console.log('Getting product by id: ' + id);
    const dbProduct = (await getProductWithStock(id));

    if (!dbProduct) {
      throw new NotFoundError('Product not found');
    }
    return formatJSONResponse(
      dbProduct
    );
  }
  catch(error) {
    if (error instanceof NotFoundError) {
      return errorResponse(error);
    } else {
      return errorResponse(new ApplicationError('Someting was broken while returning a product'));
    }
  }
};

export const main = middyfy(getProductsById);
