import { genRandHex } from "../helpers/secure.js";
import Comment from "../models/comment.js";
import * as s from "../helpers/secure.js"

export const addComment = async (req, res) => {
    if (req.body === "{}") {
        res.status(400).send("Bad request");
    }
    const { decodedToken: { username }, requestBody } = JSON.parse(req.body);
    console.log({
        username, content: requestBody.content, id: requestBody.postId
    })
    const comment = new Comment({
        id: genRandHex(8),
        author: username,
        content: requestBody.content,
        postId: requestBody.postId,
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
        const comment = Comment.findOne({ id: s.filterInput(id, s.hexRegex)});
        if (comment.username === username) {
            await Comment.updateOne({ id: s.filterInput(id, s.hexRegex), postId: s.filterInput(postId, s.numRegex) }, { content: s.filterInput(content, s.printableRegex) });
            res.status(302).send("Comment updated");
        }
        else {
            res.status(400).send("Can not update");
        }
    } catch {
        res.status(404).send("Something went wrong");
    }
}