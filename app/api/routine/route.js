import { clientPromise } from 'lib/mongodb';

import { parseParams } from './utils';

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DATABASE);
    const { searchParams } = new URL(request.url);
    const { type, products, userId } = parseParams(searchParams);

    const post = await db.collection('routines').insertOne({
      type,
      products,
      userId,
    });

    return new Response(JSON.stringify(post));
  } catch (e) {
    console.error(e);
  }
}
