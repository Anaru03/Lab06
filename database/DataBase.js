import conn from './conn.js'

export async function createPost(title, content) {
    const [result] = await db.query('INSERT INTO blog_posts (title, content) VALUES (?, ?)', [title, content])
    return result
 }