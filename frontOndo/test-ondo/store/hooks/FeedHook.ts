// import { useCallback, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../module";
// import { userActions } from "../slice/user";
export {};
// export default function useFeed() {
//   const dispatch = useDispatch();
//   const feedId = useSelector((state: RootState) => state.Feeds.feedId);
//   const challengeId = useSelector(
//     (state: RootState) => state.Feeds.challengeId
//   );
//   const image = useSelector((state: RootState) => state.Feeds.image);
//   const content = useSelector((state: RootState) => state.Feeds.content);
//   const userId = useSelector((state: RootState) => state.Feeds.userId);
//   const createdDate = useSelector(
//     (state: RootState) => state.Feeds.createdDate
//   );
//   const modifiedDate = useSelector(
//     (state: RootState) => state.Feeds.modifiedDate
//   );
//   const feedlike = useSelector((state: RootState) => state.Feeds.feedlike);
//   const kakaoLogin = useCallback(() => {
//     dispatch(userActions.getKakaoKey());
//   }, [dispatch]);
//   const ProfileEditRequest = useCallback(
//     (e) => {
//       e.preventDefault();
//       dispatch(userActions.profileEdit());
//     },
//     [editednickname]
//   );
//   const GetUser = useCallback(() => {
//     dispatch(userActions.getUser);
//   }, [dispatch]);

//   return { count, kakaoLogin, data, nickname, ProfileEditRequest, GetUser };
// }
