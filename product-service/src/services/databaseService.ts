import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { ProductIsInvalid } from '@errors/errors';
import * as uuid from "uuid";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

const PRODUCTS_TABLE_NAME = process.env.PRODUCTS_TABLE;
const STOCKS_TABLE_NAME = process.env.STOCKS_TABLE;

export const getProducts = async () => {
    const commandOptions = {
      TableName: PRODUCTS_TABLE_NAME
    };
  
    const command = new ScanCommand(commandOptions);
    const result = await dynamo.send(command);
    return result;
};

export const getStocks = async () => {
    const commandOptions = {
      TableName: STOCKS_TABLE_NAME
    };
  
    const command = new ScanCommand(commandOptions);
    const result = await dynamo.send(command);
    return result;
};

export const getProductsWithStocks = async () => {
    const products = (await getProducts())?.Items;
    const stocks = (await getStocks())?.Items;
    const result = products.map((productItem) => {
        const stock = stocks.find((item) => item['product_id'] == productItem['id']);
        const {product_id, ...stockItem} = stock?stock:{"product_id":"","count":0};
        const joinedItem = Object.assign(productItem, stockItem);
        return joinedItem;
    });

    return result;
};

export const getProduct = async (id: string) => {
    const commandOptions = {
      TableName: PRODUCTS_TABLE_NAME,
      Key: {
        id,
      },
    };
  
    const command = new GetCommand(commandOptions);
    const result = await dynamo.send(command);
    return result;
};

export const getStock = async (product_id: string) => {
    const commandOptions = {
      TableName: STOCKS_TABLE_NAME,
      Key: {
        product_id,
      },
    };
  
    const command = new GetCommand(commandOptions);
    const result = await dynamo.send(command);
    return result;
};

export const getProductWithStock = async (id: string) => {
    const product = (await getProduct(id))?.Item;
    const stock = (await getStock(id))?.Item;
    const {product_id, ...stockToJoin} = stock?stock:{"product_id":"","count":0};
    const result = Object.assign(product, stockToJoin);
    return result;
}

export const createNewProduct = async(body) => {
    try {
        if (!body.description || !body.title || !body.price) {
            throw new ProductIsInvalid('Product data is invalid!');
        }
        const commandOptions = {
            TableName: PRODUCTS_TABLE_NAME,
            Item: {
              id: uuid.v4(),
              description: body.description,
              title: body.title,
              price: body.price,
            },
          };
        
          const command = new PutCommand(commandOptions);
          const result = await dynamo.send(command);
          return result;
    }
    catch (error) {
        throw error;
    }
}