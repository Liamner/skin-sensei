import { clientPromise, ObjectId } from '../../../../../lib/mongodb';

export async function GET(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db('skinSensei');
    const id = params.id;

    const user = await db
      .collection('users')
      .find({ _id: ObjectId(id) })
      .toArray();

    return new Response(JSON.stringify(user));
  } catch (e) {
    console.error(e);
  }
}
