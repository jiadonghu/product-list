const fetch = require('node-fetch');

import {
  shopifyAuth,
  shopifyMerchantInfo,
  productInfo,
  shopifyProductVariant,
} from './type';

const getUrl = (auth: shopifyAuth, productId: string) => {
  const { key, password } = auth;
  return `https://${key}:${password}@acquire-tech-test.myshopify.com/admin/api/2021-04/products/${productId}.json`;
};

export const getData = async (merchantInfo: shopifyMerchantInfo) => {
  const results: productInfo[] = [];
  for (let product of merchantInfo.products) {
    const result = await fetch(getUrl(merchantInfo.platform.auth, product.id));
    const jsonRes = (await result.json()).product;
    results.push({
      id: product.id,
      title: jsonRes.title,
      // not sure what is the desc here
      description: jsonRes.handle,
      merchantName: merchantInfo.merchant,
      variants: (jsonRes.variants as shopifyProductVariant[]).map(item => ({
        id: item.id.toString(),
        title: item.title,
        price: item.price,
      })),
    });
  }

  return results;
};
