jest.mock('node-fetch');
const fetch = require('node-fetch');

import { getData } from './shopify';

describe('shopify product module', () => {

  const mockMerchant = {
    merchant: 'Merchant test',
    platform: {
      type: 'shopify',
      auth: {
        key: 'test-key',
        password: 'test-password',
      },
    },
    products: [
      {
        id: 'test-id',
      }
    ],
  };

  const mockProduct = {
    id: 'test-id',
    title: 'test-title',
    handle: 'test-handle',
    variants: [
      {
        id: 1,
        title: 'variant-title',
        price: 99,
      }
    ]
  };

  afterEach(() => {
    fetch.mockClear()
  });

  test('getData should return formatted products', async () => {
   
    fetch.mockResolvedValueOnce({ json: async () => ({ product: mockProduct }) });

    const results = await getData(mockMerchant);

    const { key, password } = mockMerchant.platform.auth;

    expect(fetch).toHaveBeenCalledWith(`https://${key}:${password}@acquire-tech-test.myshopify.com/admin/api/2021-04/products/${mockProduct.id}.json`)
    expect(results).toMatchObject([
      {
        id: mockProduct.id,
        title: mockProduct.title,
        description: mockProduct.handle,
        merchantName: mockMerchant.merchant,
        variants: mockProduct.variants.map(item => ({
          ...item,
          id: item.id.toString()
        })),
      }
    ])
  });
});
