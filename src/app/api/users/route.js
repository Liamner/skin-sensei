import { clientPromise } from '../../../../lib/mongodb';

export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db('skinSensei');

    const users = await db.collection('users').find({}).toArray();

    return new Response(JSON.stringify(users));
  } catch (e) {
    console.error(e);
  }
}

export async function DELETE(request) {
  try {
    const client = await clientPromise;
    const db = client.db('skinSensei');

    const del = await db.collection('users').deleteMany({ isTest: true });

    return new Response(JSON.stringify(del));
  } catch (e) {
    console.error(e);
  }
}
