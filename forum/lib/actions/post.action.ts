"use server";

import Post from "@/database/post.model";
import Tag from "@/database/tag.model";
import { connectToDatabase } from "../mongoose";
import { CreatePostParams, GetPostsParams } from "./shared.types";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";

export async function getPosts(params: GetPostsParams) {
  try {
    connectToDatabase();
    const posts = await Post.find({})
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .sort({ createdAt: -1 });

    return { posts };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createPost(params: CreatePostParams) {
  try {
    connectToDatabase();

    const { title, content, tags, author, path } = params;

    const post = await Post.create({
      title,
      content,
      author,
    });

    const tagDocuments = [];

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { post: post._id } },
        { upsert: true, new: true }
      );

      tagDocuments.push(existingTag._id);
    }

    await Post.findByIdAndUpdate(post._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    // Get user who created the post and + rep

    revalidatePath(path);
  } catch (error) {
    console.error(error);
  }
}
