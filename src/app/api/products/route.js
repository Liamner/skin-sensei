import { clientPromise } from '../../../../lib/mongodb';

export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db('skinSensei');

    const products = await db.collection('products').find({}).toArray();

    return new Response(JSON.stringify(products));
  } catch (e) {
    console.error(e);
  }
}

export async function DELETE(request) {
  try {
    const client = await clientPromise;
    const db = client.db('skinSensei');

    const del = await db.collection('products').deleteMany({ isTest: 'true' });

    return new Response(JSON.stringify(del));
  } catch (e) {
    console.error(e);
  }
}
