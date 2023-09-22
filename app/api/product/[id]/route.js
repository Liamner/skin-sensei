import { clientPromise, ObjectId } from 'lib/mongodb';

const parseParams = (params) => {
  const name = params.get('name');
  const price = params.get('price');
  const quantity = params.get('quantity');
  const months = params.get('months');
  const routineStep = params.get('routineStep');
  const shop = params.get('shop');

  return { name, price, quantity, months, routineStep, shop };
};

export async function GET(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DATABASE);
    const id = params.id;

    const products = await db
      .collection('products')
      .find({ _id: new ObjectId(id) })
      .toArray();

    return new Response(JSON.stringify(products));
  } catch (e) {
    console.error(e);
  }
}

export async function PUT(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DATABASE);
    const id = params.id;
    const { searchParams } = new URL(request.url);

    const { name, price, quantity, months, routineStep, shop } =
      parseParams(searchParams);

    const priceQuantity = Math.round((price / quantity) * 100) / 100;
    const priceMonth = Math.round((price / months) * 100) / 100;

    const del = await db.collection('products').replaceOne(
      { _id: new ObjectId(id) },
      {
        name,
        price,
        quantity,
        routineStep,
        shop,
        priceQuantity,
        priceMonth,
      }
    );

    return new Response(JSON.stringify(del));
  } catch (e) {
    console.error(e);
  }
}

export async function DELETE(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DATABASE);
    const id = params.id;

    const del = await db
      .collection('products')
      .deleteOne({ _id: new ObjectId(id) });

    return new Response(JSON.stringify(del));
  } catch (e) {
    console.error(e);
  }
}
