import express from 'express'
import multer from 'multer'

// Models
import Post from '../../models/Post'

const router = express.Router()


// file upload
const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpg"
};  

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log('req, ', req)
        const isValid = MIME_TYPE_MAP[file.mimetype]
        let error = new Error('Invalid mime type')
        if (isValid) {
            error = null
        } 
        console.log(file)
        console.log('err', error)
        cb(error, 'images')  // path to folder
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-')
        const ext = MIME_TYPE_MAP[file.mimetype]
        console.log('file 2', file)
        console.log('ext ', ext)
        cb(null, name + '-' + Date.now() + '.' + ext)
    }
})


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
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    let posts;
    if (pageSize && currentPage) {
        posts = await Post.find()
            .skip(pageSize * (currentPage - 1))
            .limit(pageSize)
    } else {
        posts = await Post.find({})
    }
    res.status(200).json(posts)
})

// @descr: create post
router.post('/', multer({storage: storage}).single('image'), async (req, res) => {
    const url = req.protocol + '://' + req.get('host')
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      imagePath: url + '/images/' + req.file.filename
    });
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
router.patch('/:id', multer({ storage: storage }).single('image'), async (req, res) => {
    let imagePath = req.body.imagePath
    if (req.file) {
        const url = req.protocol + '://' + req.get('host')
        imagePath = url + '/images/' + req.file.filename
    }
    const post = await Post.findById(req.params.id)
    
    await Post.update({ _id: req.params.id }, {
        title: req.body.title,
        content: req.body.content,
        imagePath
    })
    res.status(200).json(post);
})



export default router;