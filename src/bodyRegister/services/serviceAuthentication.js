import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../../../database/DataBase.js';

const saltRounds = 10;

async function registro(username, password) {
  const passwordHashed = await bcrypt.hash(password, saltRounds);
  return db.userCreate(username, passwordHashed);
}

async function login(username, password) {
  const userlogin = await db.getUser(username);
  if (userlogin && (await bcrypt.compare(password, userlogin.password))) {
    const tokenEnter = jwt.sign(
      { id: userlogin.id },
      process.env.JWT_HASH_SECRET,
    );
    return tokenEnter;
  }
  throw new Error('Error: Login invalido');
}

export default { registro, login };