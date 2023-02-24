import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse, errorResponse } from '@libs/api-gateway';
import { ProductIsInvalid, ApplicationError } from '@errors/errors';
import { middyfy } from '@libs/lambda';
import { createNewProduct } from '@services/databaseService';
import schema from './schema';

const createProduct: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    try {
        console.log('Creating product: ' + JSON.stringify(event.body));
        const result = (await createNewProduct(event.body));
        return formatJSONResponse(result);
    }
    catch (error) {
        if (error instanceof ProductIsInvalid) {
            return errorResponse(error);
          } else {
            return errorResponse(new ApplicationError('Someting was broken while creating a product'));
          }
    }
};

export const main = middyfy(createProduct);