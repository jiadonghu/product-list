import { getProducts } from './products';
import { productInfo } from './type';

const example = [
  {
    merchant: 'Merchant 1',
    platform: {
      type: 'shopify',
      auth: {
        key: '7a903c42eeea8e36483f830c155f3528',
        password: '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',
      },
    },
    products: [
      {
        id: '6621119447225',
      },
    ],
  },
  {
    merchant: 'Merchant 2',
    platform: {
      type: 'square',
      auth: {
        token:
          'EAAAEP9nL986UKNhF3a_i7o1doYxvfjJsYJSEXg2_Wo0kBjdNKsr0jvQ3f3H4Sq9',
      },
    },
    products: [
      {
        id: 'GPOU475S5ZY4G46NHYTXQIVL',
      },
    ],
  },
];

// should it be an api endpoint
const productEndPoint = async () => {
  let productList: productInfo[] = [];
  for (let item of example) {
    const products = await getProducts(item);
    productList = productList.concat(products);
  }
  return productList;
};

// call the api
(async () => {
  const productList = await productEndPoint();
  console.log(productList);
})();
