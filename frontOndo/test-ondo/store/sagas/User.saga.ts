import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { takeEvery, call, put, takeLatest, all, fork } from "redux-saga/effects"
import { User } from "../interfaces/User.interface";
import { userActions } from "../slice/user";
import { KakaoLogin } from '../api/User.api'
import { stringify } from "querystring";
import { Router } from "next/router";



function* getKakaoKey() {
  interface tokentype extends AxiosResponse {
    token: string;
  } 
  try {
    const code = new URL(window.location.href).searchParams.get("code");
    const response: tokentype = yield call(KakaoLogin, code);
    console.log(response.token)
    console.log(code)
    yield put(userActions.getKakaoKeySuccess(response.token))
  } catch (err) {
    yield put(userActions.getKakaoKeyError(err));
  }
}

function* watchGetKakaoKey() {
  yield takeLatest(userActions.getKakaoKey, getKakaoKey);
}

export default function* getKakaoKeySaga() {
  yield all([fork(watchGetKakaoKey)])
}