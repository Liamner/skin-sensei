import { clientPromise } from 'lib/mongodb';

const parseParams = (params) => {
  const name = params.get('name');
  const price = params.get('price');
  const quantity = params.get('quantity');
  const months = params.get('months');
  const routineStep = params.get('routineStep');
  const shop = params.get('shop');

  return { name, price, quantity, months, routineStep, shop };
};

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DATABASE);
    const { searchParams } = new URL(request.url);
    const { name, price, quantity, months, routineStep, shop } =
      parseParams(searchParams);

    const priceQuantity = Math.round((price / quantity) * 100) / 100;
    const priceMonth = Math.round((price / months) * 100) / 100;

    const post = await db.collection('products').insertOne({
      name,
      price,
      quantity,
      routineStep,
      shop,
      priceQuantity,
      priceMonth,
    });

    return new Response(JSON.stringify(post));
  } catch (e) {
    console.error(e);
  }
}
