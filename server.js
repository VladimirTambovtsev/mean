import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()

app.use(cors());
app.use(bodyParser.json())


app.get('/api/posts', (req, res) => {
    const posts = [
        { id: '1', title: "Title 1", content: "content 1" },
        { id: '2', title: "Title 2", content: "content 2" },
        { id: '3', title: "Title 3", content: "content 3" }
    ];
    res.status(200).json(posts)
})

app.post('/api/posts', (req, res) => {
    const post = req.body
    console.log('post ', post)
    res.status(200).json(post)
})


const port = process.env.PORT || 8080
app.listen(port, console.log(`Server is running on ${port}`))