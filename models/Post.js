import mongoose from 'mongoose'

const Schema = mongoose.Schema

const PostSchema = new Schema({
    title: {
        required: true,
        type: String,
        maxlength: 80
    },
    content: {
        required: true,
        type: String,
        maxlength: 1000
    }
},
    { timestamps: true })


const Product = mongoose.model('posts', PostSchema)
export default Product