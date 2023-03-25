export interface PostAuthor {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  isAuthor: boolean;
}

export interface PostWithoutContent {
  _id: string;
  author: PostAuthor;
  title: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  commentsCount: number;
  image?: string;
}

export interface PostWithContent extends PostWithoutContent {
  content: string;
}
