import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse, errorResponse } from '@libs/api-gateway';
import { NotFoundError, ApplicationError } from '@errors/errors';
import { middyfy } from '@libs/lambda';
import  products  from '@data/products';

import schema from './schema';

const getProductsById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    const id  = event.pathParameters["productId"];
    const product = products.find(item => item.id == id);
    if (!product) {
      throw new NotFoundError('Product not found');
    }
    return formatJSONResponse(
       product
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
