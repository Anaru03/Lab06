//main.js

import express from 'express';
import { db } from './database/DataBase.js';
import { getAllPosts, getPostById, createPost, updatePost, deletePost } from './database/DataBase.js';

const app = express();
app.use(express.json());

app.get('/posts', async (req, res) => {
    const posts = await getAllPosts();
    res.json(posts);
});

app.get('/posts/:postId', async (req, res) => {
    const postId = req.params.postId;
    const post = await getPostById(postId);
    if (post) {
        res.json(post);
    } else {
        res.status(404).json({ error: 'Post not found' });
    }
});

app.post('/posts', async (req, res) => {
    const newPost = req.body;
    const createPost = await createPost(newPost);
    res.json(createPost);
});

app.put('/posts/:postId', async (req, res) => {
    const postId = req.params.postId;
    const updatedPostData = req.body;
    const updatedPost = await updatePost(postId, updatedPostData);
    if (updatedPost) {
        res.json(updatedPost);
    } else {
        res.status(404).json({ error: 'Post not found' });
    }
});

app.delete('/posts/:postId', async (req, res) => {
    const postId = req.params.postId;
    const deletedPost = await deletePost(postId);
    if (deletedPost) {
        res.json({ message: 'Post deleted successfully' });
    } else {
        res.status(404).json({ error: 'Post not found' });
    }
});

app.get('/', (req, res) => {
  res.send('Ruth de León');
}); //Tengo que transformar esto para subir archivos estáticos.

const port = 3000;
app.listen(port, () => {
    console.log(`Server listening at http://127.0.0.1:${port}`);
});













