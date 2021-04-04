import { getData as getShopifyProducts } from './shopify';
import { getData as getSquareProducts } from './square';
import { shopifyMerchantInfo, squareMerchantInfo } from './type';

export const getProducts = async (
  merchant: shopifyMerchantInfo | squareMerchantInfo,
) => {
  switch (merchant.platform.type) {
    case 'shopify':
      const shopifyProducts = await getShopifyProducts(
        merchant as shopifyMerchantInfo,
      );
      return shopifyProducts;
    case 'square':
      const squareProducts = await getSquareProducts(
        merchant as squareMerchantInfo,
      );
      return squareProducts;
    default:
      return [];
  }
};

// for (let item of example) {
//     if (item.platform?.type == 'shopify') {
//         getShopifyProducts(item as shopifyMerchantInfo).then(data => console.log(data));
//     }
//     if (item.platform?.type == 'square') {
//         getSquareProducts(item as squareMerchantInfo).then(data => console.log(data));
//     }
// }
