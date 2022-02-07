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
import { KakaoLogin, ProfileEdit, GetUserState } from "../api/User.api";
import { stringify } from "querystring";

// import { useRouter } from "next/router";
// import router from "react-router-redux";
import Router from "next/router";

function* getKakaoKey() {
  interface tokentype extends AxiosResponse {
    token: string;
  }
  try {
    const code = new URL(window.location.href).searchParams.get("code");
    const response: tokentype = yield call(KakaoLogin, code);
    console.log(response.token);
    console.log(code);
    yield put(userActions.getKakaoKeySuccess(response.token));
    // Router.push("/");
  } catch (err) {
    yield put(userActions.getKakaoKeyError(err));
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
      const userdata: AxiosResponse = yield call(GetUserState, token);
      console.log(userdata);
      yield put(userActions.setEmail(userdata));
      yield put(userActions.setnickname(userdata));
      // yield put(userActions.getToken);
    }
  } catch (err) {
    console.log(err);
  }
}

function* watchgetUserState() {
  yield takeLatest(userActions.getUser, getUserState);
}

export default function* getKakaoKeySaga() {
  yield all([
    fork(watchGetKakaoKey),
    fork(watchProfileEdit),
    fork(watchgetUserState),
  ]);
}
