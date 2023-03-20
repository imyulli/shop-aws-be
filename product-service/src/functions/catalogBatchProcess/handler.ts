import { createNewProduct } from '@services/databaseService';
import {sendSNSNotification} from '@services/notificationService';

const catalogBatchProcess = (event) => {
  const products = event.Records.map(({ body }) => body);
  products.forEach(async (productStr) => {
    try {
      const product = JSON.parse(productStr.replace(/\ufeff/g, ''));
      const result = (await createNewProduct(product));
      console.log(`Created product: ${JSON.stringify(product)}`);

      if (result) {
        await sendSNSNotification(product);
      }
    }
    catch (error) {
      console.log(error);
    }
  });
 
};

export const main = catalogBatchProcess;
