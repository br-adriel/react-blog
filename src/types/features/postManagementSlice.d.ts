import { PostWithoutContent } from '../posts';

export interface PostManagementState {
  posts: PostWithoutContent[] | null | undefined;
  prev: string | null;
  next: string | null;
}
