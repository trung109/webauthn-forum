import Post from '../models/post.js'
import User from '../models/user.js'
import Comment from '../models/comment.js'

export const createPost = async (req, res) => {
    if (req.body === "{}") {
        res.status(404).send('Auth failed.')
    }
    // const {cookies} = req.headers
    const { decodedToken: { username }, title, content, tags } = JSON.parse(req.body)
    // console.log(username, title, content, tags)
    let author = await User.findOne({ username })
    author = (({ id, username, photoUrl }) => ({ id, username, photoUrl }))(author)
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
    if (id) {
        post = await Post.findOne({ id }).select('-password -_id -__v')
    }
    res.json({ post })
}

export const getPosts = async (req, res) => {
    const start = parseInt(req.params.start) || 0
    const posts = await Post.find({ state: 'approved' }).sort({ createdAt: -1 }).skip(start).limit(10)
    // console.log(posts)
    res.json({ posts })
}

export const getPendingPosts = async (req, res) => {
    // const start = parseInt(req.params.start) || 0
    const posts = await Post.find({ state: 'pending' }).sort({ createdAt: -1 }).limit(10)
    // console.log(posts)
    res.json({ posts })
}

export const getDeclinedPosts = async (req, res) => {
    // const start = parseInt(req.params.start) || 0
    const posts = await Post.find({ state: 'declined' }).sort({ createdAt: -1 }).limit(10)
    // console.log(posts)
    res.json({ posts })
}

export const declinePost = async (req, res) => {
    const { id, ...rest } = JSON.parse(req.body);
    try {
        await Post.updateOne({ id }, { state: 'declined' });
    } catch {
        res.status(404).send('Something went wrong');
    }
}

export const approvePost = async (req, res) => {
    const {id, ...rest } = JSON.parse(req.body);
    try {
        await Post.updateOne({ id }, { state: 'approved' });
    } catch {
        res.status(404).send('Something went wrong');
    }
}

export const getPostComments = async (req ,res) => {
    const postId = req.query.postId || null;
    console.log(postId)
    const comments = await Comment.find({postId}).limit(10)
    res.json({ comments })
}





