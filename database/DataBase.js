import conn from './conn.js';

export const getPosts= async () => {
  const [rows] = await conn.query('SELECT * FROM Post_content');
  return rows
}

export async function createPost(title, content, author_name, images_content) {
  const [result] = await conn.query('insert into Post_content (title, content, author_name, images_content) values (?, ?, ?, ?)', [title, content, author_name])
  return result
}

export async function getPostId(id) {
  const [rows] = await conn.query('select * from Post_content where id = ?', [id]);
  return rows
}

export async function updatePost(id, title, content, author_name, images_content) {
  const [result] = await conn.query('update Post_content set title = ?, content = ?, author_name = ?, images_content = ? where id = ?', [title, content, author_name, images_content, id])
  return result  
}

export async function deletePost(id) {
  const [result] = await conn.query('delete from Post_content where id = ?', [id])
  return result
}

export async function insertImage(images_content) {
  const [result] = await conn.query('INSERT INTO Post_content (images_content) VALUES (?)', [images_content]);
  return result;
}
