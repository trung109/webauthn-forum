export const UserModel = {
  username: "",
  id: "",
  email: "",
  photoUrl: "",
  role: "",
  status: "",
};

export interface User {
  username: string;
  id: string;
  email: string;
  photoUrl: string;
  role: string;
  status: string;
  bio: string;
}

export interface Post {
  id: string;
  title: string;
  tags: string[];
  author: User;
  content: string;
  upvotes: number;
  views: number;
  commentsCount: number;
  state: string;
  comments: string[];
  createdAt: Date;
}