import { all, call } from "redux-saga/effects";
import { GetFeedState } from "store/api/Feed.api";
import commentSaga from "./Comment.saga";
import feedSaga from "./Feed.saga";
import getKakaoKeySaga from "./User.saga";

function* rootSaga() {
  yield all([call(getKakaoKeySaga), call(feedSaga), call(commentSaga)]);
}
export default rootSaga;
