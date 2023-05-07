import { clientPromise, ObjectId } from 'lib/mongodb';

const parseParams = (params) => {
  const username = params.get('username');
  const name = params.get('name');

  return { username, name };
};

export async function GET(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DATABASE);
    const id = params.id;

    const user = await db
      .collection('users')
      .find({ _id: ObjectId(id) })
      .project({ username: 1, name: 1 })
      .toArray();

    return new Response(JSON.stringify(user));
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

    const { username, name } = parseParams(searchParams);

    const user = await db
      .collection('users')
      .updateOne(
        { _id: ObjectId(id) },
        { $set: { username: username, name: name } }
      );

    return new Response(JSON.stringify(user));
  } catch (e) {
    console.error(e);
  }
}
