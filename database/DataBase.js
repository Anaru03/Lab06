import conn from './conn.js';

const getPosts = async () => {
  const [rows] = await conn.query('SELECT * FROM Post_Content');
  return rows
}

const createPost = async (title, content, images_content, author_name) => {
  const [result] = await conn.query('INSERT INTO Post_Content (title, content, images_content, author_name) VALUES (?, ?, ?, ?)', [title, content, author_name, images_content]);
  return result;
}


const getPostId = async (id) => {
  const [rows] = await conn.query('select * from Post_Content where id = ?', [id]);
  return rows
}

const pdatePost = async (id, title, content, author_name, images_content) => {
  const [result] = await conn.query('update Post_Content set title = ?, content = ?, author_name = ?, images_content = ? where id = ?', [title, content, author_name, images_content, id])
  return result  
}

const deletePost = async (id) => {
  const [result] = await conn.query('delete from Post_Content where id = ?', [id])
  return result
}

export async function insertImage(images_content) {
  const [result] = await conn.query('INSERT INTO Post_Content (images_content) VALUES (?)', [images_content]);
  return result;
}

const userCreate = async (username, password) => {
  const [result] = await conn.query('INSERT INTO Usuarios (username, password) VALUES (?, ?)', [username, password],)
  return result;
}

const getUser = async (username) => {
  const [result] = await conn.query('SELECT * FROM Usuarios WHERE username = ?', [username]);
  return result[0];
}

export default {
  getPosts,
  userCreate,
  getUser,
  createPost,
  getPostId,
  pdatePost, 
  deletePost
}

