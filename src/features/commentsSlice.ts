import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/dist/createAction';
import { RootState } from '../store';
import { Comment } from '../types/comments';
import { CommentsState } from '../types/features/commentsSlice';

const initialState: CommentsState = {
  comments: undefined,
  next: null,
  prev: null,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments(state, action: PayloadAction<CommentsState>) {
      state.comments = action.payload.comments;
      state.prev = action.payload.prev;
      state.next = action.payload.next;
    },
    clearComments(state) {
      state.comments = undefined;
      state.next = null;
      state.prev = null;
    },
    addComment(state, action: PayloadAction<Comment>) {
      if (state.comments) state.comments = [action.payload, ...state.comments];
      else state.comments = [action.payload];
    },
    removeComment(state, action: PayloadAction<{ id: string }>) {
      if (state.comments) {
        state.comments = state.comments.filter(
          (c) => c._id !== action.payload.id
        );
      }
    },
  },
});

export const { clearComments, setComments, addComment, removeComment } =
  commentsSlice.actions;

export const selectComments = (state: RootState) => state.comments;

const commentsReducer = commentsSlice.reducer;
export default commentsReducer;
