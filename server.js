import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

import Post from './models/Post'

require('dotenv').config()	// reads env file

mongoose.Promise = global.Promise
mongoose.connect(process.env.DATABASE)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err))


const app = express()

app.use(cors());
app.use(bodyParser.json())


app.get('/api/posts/:id', async (req,res) => {
    const post = await Post.findOne({ _id: req.params.id });
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(204);
    }
})

app.get('/api/posts', async (req, res) => {
    const posts = await Post.find({})
    res.status(200).json(posts)
})

app.post('/api/posts', async (req, res) => {
    const post = new Post({title: req.body.title, content: req.body.content})
    await post.save()
    res.status(200).json(post)
})

app.delete('/api/posts/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (post) {
        await post.remove()
        res.status(201).json(post)
    } else {
        res.status(204)
    }
})

app.patch('/api/posts/:id', async (req, res) => {
    const updatedPost = await Post.update({ _id: req.params.id }, {
        title: req.body.title,
        content: req.body.content
    })
    console.log(updatedPost)
    res.status(200);
})


const port = process.env.PORT || 8080
app.listen(port, console.log(`Server is running on ${port}`))