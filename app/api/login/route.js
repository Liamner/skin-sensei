import { clientPromise } from 'lib/mongodb';
import { compareHash } from 'lib/bycrypt';

const getPwd = async (db, username) => {
  return await db
    .collection('users')
    .find({ username: username })
    .project({ password: 1 })
    .toArray();
};

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DATABASE);
    const body = await request.json();

    const { username, password } = body;

    const userExists = await db
      .collection('users')
      .count({ username: username }, { limit: 1 });

    if (!userExists) return new Response('Incorrect login', { status: 401 });

    const user = await getPwd(db, username);
    const userPwd = user[0].password;

    const pwdCorrect = await compareHash(password, userPwd);

    if (pwdCorrect) {
      return new Response('Logged in successfully', { status: 200 });
    }
    return new Response('Incorrect login', { status: 401 });
  } catch (e) {
    console.error(e);
  }
}
