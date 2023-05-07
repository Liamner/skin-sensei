import { clientPromise } from 'lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DATABASE);

    const users = await db.collection('users').find({}).toArray();

    return new Response(JSON.stringify(users));
  } catch (e) {
    console.error(e);
  }
}

export async function DELETE() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DATABASE);

    const del = await db.collection('users').deleteMany({});

    return new Response(JSON.stringify(del));
  } catch (e) {
    console.error(e);
  }
}
