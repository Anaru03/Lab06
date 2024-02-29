import conn from './conn.js';

export const db = {
  async query(sql, args) {
    try {
      const [rows] = await conn.query(sql, args);
      return rows;
    } catch (error) {
      throw new Error(`Error executing query: ${error}`);
    }
  }
};

export async function getPosts() {
  const [rows] = await conn.query('select * from post_content');
  return rows
}

export async function createPost(title, content, author_name, images_content) {
  const [result] = await conn.query('insert into post_content (title, content, author_name, images_content) values (?, ?, ?, ?)', [title, content, author_name])
  return result
}

export async function getPostId(id) {
  const [rows] = await conn.query('select * from post_content where id = ?', [id]);
  return rows
}

export async function updatePost(id, title, content, author_name, images_content) {
  const [result] = await conn.query('update post_content set title = ?, content = ?, author_name = ?, images_content = ? where id = ?', [title, content, author_name, images_content, id])
  return result  
}

export async function deletePost(id) {
  const [result] = await conn.query('delete from post_content where id = ?', [id])
  return result
}

export async function insertImage(images_content) {
  const [result] = await conn.query('INSERT INTO post_content (images_content) VALUES (?)', [images_content]);
  return result;
}

/**
const imageUrl = 'https://lukascondie.files.wordpress.com/2015/01/slytherin_wallpaper_by_dragonlover28-d45jhse.jpg?w=640';
const imagePath = './slytherin_wallpaper.jpg';

downloadImage(imageUrl, imagePath)
  .then((imagePath) => {
    console.log('Imagen descargada correctamente en:', imagePath);
    // Aquí puedes continuar con el procesamiento de la imagen
  })
  .catch((err) => {
    console.error('Error al descargar la imagen:', err);
  });

   */
