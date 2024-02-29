import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getPosts, getPostId, createPost, updatePost, deletePost } from './database/DataBase.js';
import cors from 'cors';


const app = express();
const PORT = 3000;
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

app.use(express.json());

const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Blog API',
        version: '1.0.0',
        description: 'API for managing blog posts',
      },
      servers: [{ url: 'http://localhost:3000' }],
    },
    apis: ['main.js'],
  };

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec)
);

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error interno del servidor');
  });

app.get('/posts', async (req, res, next) => {
    console.log(getPosts())
    try {
        const posts = await getPosts();
        res.json(posts);
    } catch (error) {
        next(error); 
    }
});

app.get('/posts/:postId', async (req, res, next) => {
    try {
        const postId = req.params.postId;
        const post = await getPostId(postId);
        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ error: '404 Not Found' });
        }
    } catch (error) {
        next(error);
    }
});

app.post('/posts', async (req, res, next) => {
    try {
        const newPost = req.body;
        const createPost = await createPost(newPost);
        res.status(200).json(createPost);
    } catch (error) {
        next(error);
    }
});

app.put('/posts/:postId', async (req, res, next) => {
    try {
        const postId = req.params.postId;
        const updatedPostData = req.body;
        const updatedPost = await updatePost(postId, updatedPostData);
        if (updatedPost) {
            res.json(updatedPost);
        } else {
            res.status(404).json({ error: '404 Not Found' });
        }
    } catch (error) {
        next(error);
    }
});

app.delete('/posts/:postId', async (req, res, next) => {
    try {
        const postId = req.params.postId;
        const deletedPost = await deletePost(postId);
        if (deletedPost) {
            res.json({ message: 'Post deleted successfully' });
        } else {
            res.status(404).json({ error: '404 Not Found'});
        }
    } catch (error) {
        next(error);
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
  
app.get('/html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'autores.html'));
});

app.get('/html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'crearpost.html'));
});

app.get('/html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'multimedia.html'));
});
  
app.get('/styles.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'css', 'styles.css'));
});
  
app.get('/script.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'js', 'script.js'));
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://127.0.0.1:${PORT}/`);
});