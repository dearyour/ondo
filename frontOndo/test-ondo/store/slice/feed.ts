import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Comment } from "store/interfaces/Comment.interface";
import { Feed, FeedParams, FeedParamType } from "../interfaces/Feed.interface";

//initialState
export const initialState: Feed | any = {
  feeds: [
    {
      feedId: 1,
      challengeId: 1,
      image:
        "https://png.pngtree.com/background/20210710/original/pngtree-climbing-silhouette-life-challenge-picture-image_1031961.jpg",
      content: "111 도전 가즈아!!",
      userId: 1,
      createdDate: new Date(),
      modifiedDate: new Date(),
      feedlike: [],
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
    },
    {
      feedId: 2,
      challengeId: 2,
      image:
        "https://png.pngtree.com/background/20210711/original/pngtree-climbing-silhouette-life-challenge-picture-image_1124009.jpg",
      content: "222 도전 너무좋아",
      userId: 2,
      createdDate: new Date(),
      modifiedDate: new Date(),
      feedlike: [],
      comments: [
        {
          createdDate: new Date(),
          modifiedDate: new Date(),
          commentId: 1,
          content: "댓글 컨텐츠 test33",
        },
        {
          createdDate: new Date(),
          modifiedDate: new Date(),
          commentId: 2,
          content: "댓글 컨텐츠 test44",
        },
      ],
    },
  ],
  isLoading: false,
  error: null,
};

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    getFeed: (state, action: PayloadAction<FeedParamType>) => {
      state.isLoading = false;
    },
    getFeedSuccess: (state, action: PayloadAction<FeedParams>) => {
      state.isLoading = true;
      state.feeds.length = 0;
      state.feeds = [...state.feeds, action.payload];
    },
    getFeedFailure: (state, { payload: error }) => {
      state.isLoading = false;
      state.error = error;
    },
  },
});

export const feed = feedSlice.name;
export const feedReducer = feedSlice.reducer;
export const feedAction = feedSlice.actions;
export default feedReducer;
