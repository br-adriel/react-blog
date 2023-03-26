import { Comment } from './comments';

export interface CommentsState {
  comments: Comment[] | null | undefined;
  prev: string | null;
  next: string | null;
}
