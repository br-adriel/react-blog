import { Post } from './posts';

export interface GetPostsResponse {
  posts: Post[];
  page: number;
  prev?: string;
  next?: string;
}
