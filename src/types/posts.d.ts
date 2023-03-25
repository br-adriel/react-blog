export interface PostAuthor {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  isAuthor: boolean;
}

export interface Post {
  _id: string;
  author: PostAuthor;
  title: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  commentsCount: number;
}
