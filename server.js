import path from 'path'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

import posts from './routes/api/posts'
import users from "./routes/api/users";

require('dotenv').config()	// reads env file


// DB
mongoose.Promise = global.Promise
mongoose.connect(process.env.DATABASE)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err))


const app = express()

// middleware
app.use(cors());
app.use(bodyParser.json())
app.use('/images', express.static(path.join('images')))

// set API routes
app.use("/api/posts", posts);
app.use("/api/users", users);


const port = process.env.PORT || 8080
app.listen(port, console.log(`Server is running on ${port}`))