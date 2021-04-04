const fetch = require('node-fetch');
import { squareMerchantInfo, productInfo, squareProductVariant } from './type';

export const getData = async (merchantInfo: squareMerchantInfo) => {
  const results: productInfo[] = [];
  for (let product of merchantInfo.products) {
    const result = await fetch(
      `https://connect.squareupsandbox.com/v2/catalog/object/${product.id}`,
      {
        method: 'get',
        headers: {
          Authorization: `Bearer ${merchantInfo.platform.auth.token}`,
          'Square-Version': '2021-03-17',
          'Content-Type': 'application/json',
        },
      },
    );
    const jsonRes = (await result.json()).object;
    results.push({
      id: product.id,
      title: jsonRes.item_data.name,
      description: jsonRes.item_data.description,
      merchantName: merchantInfo.merchant,
      variants: (jsonRes.item_data.variations as squareProductVariant[]).map(
        item => ({
          id: item.id,
          title: item.item_variation_data.name,
          price: item.item_variation_data.price_money.amount,
        }),
      ),
    });
  }

  return results;
};
