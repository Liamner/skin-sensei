import { clientPromise } from 'lib/mongodb';
import { hashText } from 'lib/bycrypt';

const parseParams = (params) => {
  const username = params.get('username');
  const name = params.get('name');
  const password = params.get('password');

  return { username, name, password };
};

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DATABASE);
    const { searchParams } = new URL(request.url);
    const { username, name, password } = parseParams(searchParams);

    const encriptedPwd = await hashText(password);

    const post = await db.collection('users').insertOne({
      username,
      name,
      password: encriptedPwd,
    });

    return new Response(JSON.stringify(post));
  } catch (e) {
    console.error(e);
  }
}
