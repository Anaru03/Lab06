import express from 'express'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPosts, getPostId, createPost, updatePost, deletePost} from './database/DataBase.js'
import tokenauth from './src/validation/Tokenauth.js'
import postContentValidation from './src/bodyRegister/controllers/postContentValidation.js'
import errorValidation from './src/validation/errorValidation.js'
import { registro, login } from './src/bodyRegister/controllers/controllerAuthentication.js';
import cors from 'cors'


const app = express();
const PORT = 3000;
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

app.use(cors());
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
    apis: ['./database/DataBase.js'],
  };

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

const Endopointvalid = (req, res, next) => {
    if (!['/posts', '/posts/:postId', '/users', '/user'].includes(req.path)) {
        return res.status(404).json({ error: 'El endpoint no ha sido localizado, es inexistente' });
    }
    next();
};

const Structuretvalid = (req, res, next) => {
    if(['PUT', 'POST'].includes(req.method) && !req.is('application/json')) {
        return res.status(400).json({ error: 'El contenido del request no es JSON' });
    }
    next();
};

app.use(Structuretvalid);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error interno del servidor');
  })

app.get('/', (req, res) => {
    res.sendFile(join(myDirname, 'public', 'index.html'), (err) => {
        if (err) {
        res.status(500).send('Error serving index.html')
    }
    })
  })



app.use(express.static(path.join(__dirname, 'public')));


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
            res.status(404).json({ error: 'ID no encontrado'});
        }
    } catch (error) {
        next(error);
    }
});

app.post('/posts', tokenauth, postContentValidation.PostNew, errorValidation,  async (req, res, next) => {
    try {
        const { ...post} = req.body; 

        const createPostResult = await createPost(post.title, post.content, post.images_content, post.author_name); 
        res.status(201).json(createPostResult);
    } catch (error) {
        next(error);
    }
});

app.put('/posts/:postId', tokenauth, postContentValidation.PostUp, errorValidation, async (req, res, next) => {
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

app.delete('/posts/:postId', tokenauth, async (req, res, next) => {
    try {
        const postId = req.params.postId;
        const deletedPost = await deletePost(postId);
        if (deletedPost) {
            res.json({ message: 'Post deleted successfully' });
        } else {
            res.status(500).json({ error: 'Erro al eliminar el post según el id: ?' [postId] });
        }
    } catch (error) {
        next(error);
    }
});


app.post('/registro', registro)
app.post('/login', login)


app.use(Endopointvalid);
app.use((req, res) => {
    res.status(501).json({ error: 'No se implementó el método HTTP' });
});


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://127.0.0.1:${PORT}`);
});