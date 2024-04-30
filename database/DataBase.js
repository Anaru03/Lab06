import conn from './conn.js';

export const getPosts= async () => {
  const [rows] = await conn.query('SELECT * FROM Post_Content');
  return rows
}

export async function createPost(title, content, images_content, author_name) {
  const [result] = await conn.query('INSERT INTO Post_Content (title, content, images_content, author_name) VALUES (?, ?, ?, ?)', [title, content, author_name, images_content]);
  return result;
}


export async function getPostId(id) {
  const [rows] = await conn.query('select * from Post_Content where id = ?', [id]);
  return rows
}

export async function updatePost(id, title, content, author_name, images_content) {
  const [result] = await conn.query('update Post_Content set title = ?, content = ?, author_name = ?, images_content = ? where id = ?', [title, content, author_name, images_content, id])
  return result  
}

export async function deletePost(id) {
  const [result] = await conn.query('delete from Post_Content where id = ?', [id])
  return result
}

export async function insertImage(images_content) {
  const [result] = await conn.query('INSERT INTO Post_Content (images_content) VALUES (?)', [images_content]);
  return result;
}

export async function userCreat(usuario, contra) {
  const [result] = await conn.query('INSERT INTO User (usuario, contra) VALUES (?, ?)', [usuario, contra]);
  return result;
}

export async function getUser(usuario) {
  const [rows] = await conn.query('SELECT * FROM User WHERE usuario = ?', [usuario]);
  return rows
}