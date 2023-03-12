import clientPromise from '../../../../lib/mongodb';

const parseParams = (params) => {
  const name = params.get('name');
  const price = params.get('price');
  const quantity = params.get('quantity');
  const routineStep = params.get('routineStep');
  const shop = params.get('shop');
  const isTest = params.get('isTest');

  return { name, price, quantity, routineStep, shop, isTest };
};

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db('skinSensei');
    const { searchParams } = new URL(request.url);

    const { name, price, quantity, routineStep, shop, isTest } =
      parseParams(searchParams);

    const post = await db
      .collection('products')
      .insertOne({ name, price, quantity, routineStep, shop, isTest });

    return new Response(JSON.stringify(post));
  } catch (e) {
    console.error(e);
  }
}
