import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserParams } from "../interfaces/User.interface";

const initialState: UserParams | any = {
  users: [],
  userObj: [],
  nickname: "",
  email: "base@base.com",
  session: "",
  error: null,
  ondo: 30,
  image: "https://cdn.entermedia.co.kr/news/photo/202112/28096_52173_2023.jpg",
  isLoading: false,
  following: [],
  follower: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    profileEdit: (state) => { },
    getUser: (state) => { },
    loadingStart: (state) => {
      state.isLoading = true;
    },
    loadingEnd: (state) => {
      state.isLoading = false;
    },
    setnickname: (state, { payload }) => {
      state.nickname = payload.username;
    },
    setEmail: (state, { payload }) => {
      state.email = payload.email;
    },
    setuserdata: (state, { payload }) => {
      state.users = payload;
    },
    getKakaoKey: (state) => {
      state.isLoading = true;
    },
    getKakaoKeySuccess: (state, { payload }) => {
      state.session = payload;
      state.isLoading = false;
      localStorage.setItem("Token", payload);
    },
    getKakaoKeyError: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },

    getToken: (state) => {
      const token = localStorage.getItem("Token");
      state.session = token;
    },
    getUserObj: (state, { payload }) => { },
    setUserObj: (state, { payload }) => {
      state.userObj = payload;
    },
    getFollowing: (state, { payload }) => {
      state.following = payload;
    },
  },
});

const { actions, reducer } = userSlice;
export const userActions = actions;
export default reducer;
