import { clientPromise, ObjectId } from '../../../../../../lib/mongodb';
import { hashText, compareHash } from '../../../../../../lib/bycrypt';

const parseParams = (params) => {
  const lastPwd = params.get('lastPwd');
  const newPwd = params.get('newPwd');

  return { lastPwd, newPwd };
};

const getPwd = async (db, id) => {
  return await db
    .collection('users')
    .find({ _id: ObjectId(id) })
    .project({ password: 1 })
    .toArray();
};

export async function GET(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DATABASE);
    const id = params.id;

    const user = await getPwd(db, id);

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

    const user = await getPwd(db, id);
    const userPwd = user[0].password;

    const { lastPwd, newPwd } = parseParams(searchParams);

    const isCorrect = await compareHash(lastPwd, userPwd);

    if (isCorrect) {
      const user = await db
        .collection('users')
        .updateOne(
          { _id: ObjectId(id) },
          { $set: { password: await hashText(newPwd) } }
        );

      return new Response(JSON.stringify(user));
    }
    return new Response('Last Password is incorrect', { status: 401 });
  } catch (e) {
    console.error(e);
  }
}
