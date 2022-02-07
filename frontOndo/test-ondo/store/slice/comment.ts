import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Comment,
  CommentParams,
  CommentParamType,
} from "../interfaces/Comment.interface";

// initialState
export const initialState: Comment = {
  comments: [
    {
      createdDate: new Date(),
      modifiedDate: new Date(),
      commentId: 1,
      content: "댓글 컨텐츠 test",
    },
    {
      createdDate: new Date(),
      modifiedDate: new Date(),
      commentId: 2,
      content: "댓글 컨텐츠 test22",
    },
  ],
  isLoading: false,
  error: null,
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    getComment: (state, action: PayloadAction<CommentParamType>) => {
      state.isLoading = false;
    },
    getCommentSuccess: (state, action: PayloadAction<CommentParams>) => {
      state.isLoading = true;
      state.comments.length = 0;
      state.comments = [...state.comments, action.payload];
    },
    getCommentFailure: (state, { payload: error }) => {
      state.isLoading = false;
      state.error = error;
    },
  },
});

export const comment = commentSlice.name;
export const commentReducer = commentSlice.reducer;
export const commentAction = commentSlice.actions;
export default commentReducer;