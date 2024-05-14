import { Schema } from "mongoose";

import { IUser } from "@/mongodb";

export interface CreateCommentParams {
  content: string;
  author: string;
  post: string;
  path: string;
}

export interface GetCommentsParams {
  postId: string;
  sortBy?: string;
  page?: number;
  pageSize?: number;
}

export interface CommentVoteParams {
  commentId: string;
  userId: string;
  hasupVoted: boolean;
  hasdownVoted: boolean;
  path: string;
}

export interface DeleteCommentParams {
  commentId: string;
  path: string;
}

export interface SearchParams {
  query?: string | null;
  type?: string | null;
}

export interface RecommendedParams {
  userId: string;
  page?: number;
  pageSize?: number;
  searchQuery?: string;
}

export interface ViewPostParams {
  postId: string;
  userId: string | undefined;
}

export interface JobFilterParams {
  query: string;
  page: string;
}

export interface GetPostsParams {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
}

export interface CreatePostParams {
  title: string;
  content: string;
  tags: string[];
  author: Schema.Types.ObjectId | IUser;
  path: string;
}

export interface GetPostByIdParams {
  postId: string;
}

export interface PostVoteParams {
  postId: string;
  userId: string;
  hasupVoted: boolean;
  hasdownVoted: boolean;
  path: string;
}

export interface DeletePostParams {
  postId: string;
  path: string;
}

export interface EditPostParams {
  postId: string;
  title: string;
  content: string;
  path: string;
}

export interface GetAllTagsParams {
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string;
}

export interface GetPostsByTagIdParams {
  tagId: string;
  page?: number;
  pageSize?: number;
  searchQuery?: string;
}

export interface GetTopInteractedTagsParams {
  userId: string;
  limit?: number;
}

export interface CreateUserParams {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  picture: string;
}

export interface GetUserByIdParams {
  userId: string;
}

export interface GetAllUsersParams {
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string; // Add searchQuery parameter
}

export interface UpdateUserParams {
  clerkId: string;
  updateData: Partial<IUser>;
  path: string;
}

export interface ToggleSavePostParams {
  userId: string;
  postId: string;
  path: string;
}

export interface GetSavedPostsParams {
  clerkId: string;
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string;
}

export interface GetUserStatsParams {
  userId: string;
  page?: number;
  pageSize?: number;
}

export interface DeleteUserParams {
  clerkId: string;
}
