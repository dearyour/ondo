import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import {
  takeEvery,
  call,
  put,
  takeLatest,
  all,
  fork,
  getContext,
} from "redux-saga/effects";
import { User } from "../interfaces/User.interface";
import { userActions } from "../slice/user";
import {
  KakaoLogin,
  ProfileEdit,
  GetUserState,
  getUserObjapi,
} from "../api/User.api";
import { stringify } from "querystring";

// import { useRouter } from "next/router";
// import router from "react-router-redux";
import Router from "next/router";
import { useRouter } from "next/router";

function* getKakaoKey() {
  interface tokentype extends AxiosResponse {
    token: string;
    newUser: boolean;
  }
  try {
    const code = new URL(window.location.href).searchParams.get("code");
    const response: tokentype = yield call(KakaoLogin, code);
    // console.log(response);
    // console.log(code);
    yield put(userActions.getKakaoKeySuccess(response.token));
    if (response.newUser) {
      Router.push("/user/profileEdit")
    } else {
      Router.push("/feedMain");
    }
  } catch (err) {
    yield put(userActions.getKakaoKeyError(err));
    Router.push("/")
    // Router.push("/");
  }
}

function* watchGetKakaoKey() {
  yield takeLatest(userActions.getKakaoKey, getKakaoKey);
}

function* requestprofileEdit(nickname: any) {
  try {
    const token = localStorage.getItem("Token");
    if (token) {
      yield call(ProfileEdit, nickname.data, token);
      yield put(userActions.setnickname(nickname.data));
    }
  } catch (err) {
    console.log(err);
  }
}

function* watchProfileEdit() {
  yield takeLatest(userActions.profileEdit, requestprofileEdit);
}

function* getUserState() {
  try {
    const token = localStorage.getItem("Token");
    if (token) {
      // console.log("유저통신전");
      const userdata: AxiosResponse = yield call(GetUserState, token);
      // console.log("유저통신후");
      // console.log(userdata);
      yield put(userActions.setEmail(userdata));
      yield put(userActions.setnickname(userdata));
      yield put(userActions.setuserdata(userdata));
    }
  } catch (err) {
    console.log(err);
  }
}

function* watchgetUserState() {
  yield takeLatest(userActions.getUser, getUserState);
}

///
function* getUserObjState(username: any) {
  try {
    const token = localStorage.getItem("Token");
    if (token) {
      // console.log("객체유저통신전");
      const userObjdata: AxiosResponse = yield call(
        getUserObjapi,
        username,
        token
      );
      // console.log("객체유저통신후");
      // console.log(userObjdata);
      yield put(userActions.setUserObj(userObjdata));
    }
  } catch (err) {
    console.log(err);
  }
}

function* watchgetUserObjState() {
  yield takeLatest(userActions.getUserObj, getUserObjState);
}

export default function* getKakaoKeySaga() {
  yield all([
    fork(watchGetKakaoKey),
    fork(watchProfileEdit),
    fork(watchgetUserState),
    fork(watchgetUserObjState),
  ]);
}
