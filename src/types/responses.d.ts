import { PostWithoutContent } from './posts';

export interface GetPostsResponse {
  posts: PostWithoutContent[];
  page: number;
  prev?: string;
  next?: string;
}
