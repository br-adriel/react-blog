export interface CommentAuthor {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  isAuthor: boolean;
}

export interface Comment {
  _id: string;
  author: CommentAuthor;
  content: string;
  createdAt: string;
  updatedAt: string;
}
