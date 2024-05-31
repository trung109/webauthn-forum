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
}

export interface Post {
  id: string;
  title: string;
  tags: string[];
  author: User;
  upvotes: number;
  views: number;
  commentsCount: number;
  comments: string[];
  createdAt: Date;
}