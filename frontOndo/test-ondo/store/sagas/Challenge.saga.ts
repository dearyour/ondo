import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { takeEvery, call, put, takeLatest, all, fork } from "redux-saga/effects"
import { ChallengeParams, ChallengeParamType } from "../interfaces/Challenge.interface";
import { challengeAction } from "../slice/challenge";
import ChallengeAPI from "store/api/Challenge.api";

// get Saga
function* getChallengeSaga(action: { payload: ChallengeParamType }) {
  try {
    // call은 미들웨어에게 함수와 인자들을 실행하라는 명령
    const response: ChallengeParams = yield call(ChallengeAPI, action.payload);
    // put은 dispatch 를 뜻한다.
    yield put(challengeAction.getChallengeSuccess(response));
  } catch (err) {
    yield put(challengeAction.getChallengeFailure(err));
  }
}

function* watchGetChallenge() {
  yield takeLatest(challengeAction.getChallenge, getChallengeSaga);
}

export default function* challengeSaga() {
  yield all([fork(watchGetChallenge)]);
}