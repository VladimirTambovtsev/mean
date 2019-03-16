import express from 'express'
import Post from '../../models/Post'

const router = express.Router()


// @descr: get post
router.get('/:id', async (req, res) => {
    const post = await Post.findOne({ _id: req.params.id });
    if (post) {
        res.status(200).json(post);
    } else {
        res.status(204);
    }
})

// @descr: get all posts
router.get('/', async (req, res) => {
    const posts = await Post.find({})
    res.status(200).json(posts)
})

// @descr: create post
router.post('/', async (req, res) => {
    const post = new Post({ title: req.body.title, content: req.body.content })
    await post.save()
    res.status(200).json(post)
})

// @descr: delete post
router.delete('/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (post) {
        await post.remove()
        res.status(201).json(post)
    } else {
        res.status(204)
    }
})

// @descr: update post
router.patch('/:id', async (req, res) => {
    const post = await Post.findById(req.params.id)
    
    await Post.update({ _id: req.params.id }, {
        title: req.body.title,
        content: req.body.content
    })
    res.status(200).json(post);
})



export default router;