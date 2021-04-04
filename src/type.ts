// Shopify
export type shopifyAuth = {
  key: string;
  password: string;
};

export type shopifyMerchantInfo = {
  merchant: string;
  platform: {
    type: string;
    auth: shopifyAuth;
  };
  products: { id: string }[];
};

export type shopifyProductVariant = {
  id: number;
  title: string;
  price: number;
};

// Square
export type squareAuth = {
  token: string;
};

export type squareMerchantInfo = {
  merchant: string;
  platform: {
    type: string;
    auth: squareAuth;
  };
  products: { id: string }[];
};

export type squareProductVariant = {
  id: string;
  item_variation_data: {
    item_id: string;
    name: string;
    pricing_type: string;
    price_money: {
      amount: number;
      currency: 'CAD' | 'USD';
    };
  };
};

// General
export type productInfo = {
  id: string;
  title: string;
  description: string;
  merchantName: string;
  variants: {
    id: string;
    title: string;
    price: number;
  }[];
};
