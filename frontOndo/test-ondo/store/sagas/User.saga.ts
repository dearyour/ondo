import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { takeEvery, call, put, takeLatest, all, fork } from "redux-saga/effects"
import { User } from "../interfaces/User.interface";
import { userActions } from "../slice/user";
import { KakaoLogin } from '../api/User.api'

function* getKakaoKey() {
  try {
    const code = new URL(window.location.href).searchParams.get("code");;
    const response: AxiosResponse = yield call(KakaoLogin, code);
    console.log(response)
    yield put(userActions.getKakaoKeySuccess(response.data))
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