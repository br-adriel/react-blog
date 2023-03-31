import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { PostManagementState } from '../types/features/postManagementSlice';
import { PostWithoutContent } from '../types/posts';

const initialState: PostManagementState = {
  prev: null,
  next: null,
  posts: undefined,
};

const postManagementSlice = createSlice({
  name: 'postManagement',
  initialState,
  reducers: {
    removePost(state, action: PayloadAction<{ id: string }>) {
      if (state.posts) {
        state.posts = state.posts.filter((p) => p._id !== action.payload.id);
      }
    },
    setPosts(
      state,
      action: PayloadAction<{ posts: PostWithoutContent[] | null }>
    ) {
      state.posts = action.payload.posts;
    },
    setPaginationLinks(
      state,
      action: PayloadAction<{ prev: string | null; next: string | null }>
    ) {
      state.prev = action.payload.prev;
      state.next = action.payload.next;
    },
  },
});

export const { removePost, setPaginationLinks, setPosts } =
  postManagementSlice.actions;

export const selectPostManagement = (state: RootState) => state.postManagement;

const postManagementReducer = postManagementSlice.reducer;
export default postManagementReducer;
