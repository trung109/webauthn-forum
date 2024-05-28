import Post from '../models/post.js'
import User from '../models/user.js'


export const createPost = async (req, res) => {
    // const {cookies} = req.headers
    const {username, title, content, tags } = req.body
    const author = User.findOne({username})
    const post = new Post({
        author,
        title,
        content,
        tags
    })
    try {
        await post.save();
        console.log('New post created:', post);
        res.status(200).send('Post created.')
    } catch (err) {
        console.error('Error creating post.', err);
    }

    
}

export const getPostById = async (req, res) => {
    const id = parseInt(req.query.postId) || null
    let post = {}
    if(id) {
        post = await Post.find({id})
    }
    res.json({post})
}

export const getPosts = async (req, res) => {
    const start = parseInt(req.params.start) || 0
    const posts = await Post.find().skip(start).limit(5)
    res.json({posts})
}





