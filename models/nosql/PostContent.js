import mongoose from 'mongoose'


const PostContentSchema = new mongoose.Schema({
    postId: {
        type: BigInt,
        require: true
    },
    contentText: {
        type: String,
        default: ""
    },
    contentImagesUrl: [{
        imageUrl: { type: String }
    }],
    contentVideosUrl: [{
        videoUrl: { type: String }
    }]
},
    {
        timestamps: true
    }
)


const PostContent = mongoose.model('PostContent', PostContentSchema)


export default PostContent