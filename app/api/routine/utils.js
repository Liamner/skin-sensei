export const parseParams = (params) => {
  const type = params.get('type');
  const products = params.get('products');
  const userId = params.get('userId');

  return { type, products, userId };
};
