import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Comment,
  CommentParams,
  CommentParamType,
} from "../interfaces/Comment.interface";

// initialState
export const initialState: Comment = {
  comments: [],
  isLoading: false,
  error: null,
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    getComment: (state, action) => {
      state.isLoading = true;
    },
    getCommentSuccess: (state, action) => {
      state.isLoading = false;
      state.comments = action.payload;
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
