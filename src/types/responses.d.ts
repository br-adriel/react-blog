import { Comment } from './comments';
import { PostWithoutContent } from './posts';

export interface GetPostsResponse {
  posts: PostWithoutContent[];
  page: number;
  prev?: string;
  next?: string;
}

export interface GetCommentsResponse {
  comments: Comment[];
  page: number;
  prev?: string;
  next?: string;
}
