import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { takeEvery, call, put, takeLatest, all, fork } from "redux-saga/effects"
import { FeedParams, FeedParamType } from "../interfaces/Feed.interface";
import { feedAction } from "../slice/feed";

// get Saga
function* getFeedSaga(action: { payload: FeedParamType }) {
  try {
    // call은 미들웨어에게 함수와 인자들을 실행하라는 명령
    const response: FeedParams = yield call(FeedAPI.getFeed, action.payload);
    // put은 dispatch 를 뜻한다.
    yield put(feedAction.getFeedSuccess(response));
  } catch (err) {
    yield put(feedAction.getFeedFailure(err));
  }
}

function* watchGetFeed() {
  yield takeLatest(feedAction.getFeed, getFeedSaga);
}

export default function* feedSaga() {
  yield all([fork(watchGetFeed)]);
}