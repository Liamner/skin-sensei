import { clientPromise } from '../../../../lib/mongodb';

export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db('sample_mflix');

    const movies = await db
      .collection('movies')
      .find({})
      .sort({ metacritic: -1 })
      .limit(20)
      .toArray();

    return new Response(JSON.stringify(movies));
  } catch (e) {
    console.error(e);
  }
}
