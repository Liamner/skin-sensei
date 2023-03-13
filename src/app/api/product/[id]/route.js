import { clientPromise, ObjectId } from '../../../../../lib/mongodb';

export async function GET(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db('skinSensei');
    const id = params.id;

    const products = await db
      .collection('products')
      .find({ _id: ObjectId(id) })
      .toArray();

    return new Response(JSON.stringify(products));
  } catch (e) {
    console.error(e);
  }
}

export async function DELETE(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db('skinSensei');
    const id = params.id;

    const del = await db
      .collection('products')
      .deleteOne({ _id: ObjectId(id) });

    return new Response(JSON.stringify(del));
  } catch (e) {
    console.error(e);
  }
}
