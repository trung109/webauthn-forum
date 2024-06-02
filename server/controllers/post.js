import Post from '../models/post.js'
import User from '../models/user.js'


export const createPost = async (req, res) => {
    if(req.body === "{}") {
        res.status(404).send('Auth failed.')
    }
    // const {cookies} = req.headers
    const {decodedToken : { username }, title, content, tags } = JSON.parse(req.body)
    // console.log(username, title, content, tags)
    let author = await User.findOne({username})
    author = (({id, username, photoUrl}) => ({id, username, photoUrl}))(author)
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
        res.status(404).send('Post not created.')
    }

    
}

export const getPostById = async (req, res) => {
    const id = parseInt(req.query.postId) || null
    let post = {}
    if(id) {
        post = await Post.findOne({id}).select('-password -_id -__v')
    }
    res.json({post})
}

export const getPosts = async (req, res) => {
    const start = parseInt(req.params.start) || 0
    const posts = await Post.find().sort({id: -1}).skip(start).limit(10)
    // console.log(posts)
    res.json({posts})
}





