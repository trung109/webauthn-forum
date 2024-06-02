import { genRandHex } from "../helpers/secure.js";
import Comment from "../models/comment.js";

export const addComment = async (req, res) => {
    if (req.body === "{}") {
        res.status(400).send("Bad request");
    }
    const { decodedToken: { username }, content, postId } = JSON.parse(req.body);
    const comment = new Comment({
        id: genRandHex(8),
        author: username,
        content: content,
        postId: postId,
        createdAt: Date.now()
    });

    try {
        await comment.save();
        res.status(200).send("Comment added");
    } catch {
        res.status(404).send("Something went wrong");
    }
}

export const editComment = async (req, res) => {
    if (req.body === "{}") {
        res.status(400).send("Bad request");
    }
    const { id, decodedToken: { username }, content, postId } = JSON.parse(req.body);
    try {
        const comment = Comment.findOne({ id });
        if (comment.username === username) {
            await Comment.updateOne({ id: id, postId: postId }, { content: content });
            res.status(302).send("Comment updated");
        }
        else {
            res.status(400).send("Can not update");
        }
    } catch {
        res.status(404).send("Something went wrong");
    }
}