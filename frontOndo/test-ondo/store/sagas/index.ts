import { all, call } from "redux-saga/effects";
import getKakaoKeySaga from "./User.saga";



function* rootSaga() {
  yield all([call(getKakaoKeySaga)]);
}

export default rootSaga;