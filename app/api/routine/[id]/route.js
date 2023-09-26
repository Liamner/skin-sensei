import { clientPromise, ObjectId } from 'lib/mongodb';

import { parseParams } from '../utils';

export async function GET(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DATABASE);
    const id = params.id;

    const routine = await db
      .collection('routines')
      .find({ _id: new ObjectId(id) })
      .toArray();

    return new Response(JSON.stringify(routine));
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

    const { type, products, userId } = parseParams(searchParams);

    const del = await db.collection('routines').replaceOne(
      { _id: new ObjectId(id) },
      {
        type,
        products,
        userId,
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
      .collection('routines')
      .deleteOne({ _id: new ObjectId(id) });

    return new Response(JSON.stringify(del));
  } catch (e) {
    console.error(e);
  }
}
