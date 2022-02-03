import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { takeEvery, call, put, takeLatest, all, fork } from "redux-saga/effects"
import { CommentParams, CommentParamType } from "../interfaces/Comment.interface";
import { challengeAction } from "../slice/challenge";
import { commentAction } from "../slice/comment";

// get Saga
function* getCommentSaga(action: { payload: CommentParamType }) {
  try {
    // call은 미들웨어에게 함수와 인자들을 실행하라는 명령
    const response: CommentParams = yield call(CommentAPI.getComment, action.payload);
    // put은 dispatch 를 뜻한다.
    yield put(commentAction.getCommentSuccess(response));
  } catch (err) {
    yield put(commentAction.getCommentFailure(err));
  }
}

function* watchGetComment() {
  yield takeLatest(commentAction.getComment, getCommentSaga)
}

export default function* commentSaga() {
  yield all([fork(watchGetComment)]);
}