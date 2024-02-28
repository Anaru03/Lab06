//Hacer los endpoints

/*
import express from 'express'

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`)
})
*/

import express from 'express'
import { getAllPosts } from './database/DataBase.js'

const app = express()
app.use(express.json())

app.get('/posts', async (req, res) => {
    const posts = await getAllPosts()
    res.json(posts)
})

//... resto de su codigo ...
