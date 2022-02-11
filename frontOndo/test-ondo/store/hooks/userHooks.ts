import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../module";
import { userActions } from "../slice/user";

export default function useUser() {
    const dispatch = useDispatch();
    const session = useSelector((state: RootState) => state.user.session);
    const nickname = useSelector((state: RootState) => state.user.nickname);
    const isLoading = useSelector((state: RootState) => state.user.isLoading);
    const profile = useSelector((state: RootState) => state.user.image);
    const users = useSelector((state: RootState) => state.user.users);
    const loadingStart = useCallback(() => {
        dispatch(userActions.loadingStart());
    }, [dispatch]);
    const loadingEnd = useCallback(() => {
        dispatch(userActions.loadingEnd());
    }, [dispatch]);
    const editednickname = useSelector(
        (state: RootState) => state.user.editednickname
    );
    const kakaoLogin = useCallback(() => {
        dispatch(userActions.getKakaoKey());
    }, [dispatch]);
    const ProfileEditRequest = useCallback(
        (e) => {
            e.preventDefault();
            dispatch(userActions.profileEdit());
        },
        [editednickname]
    );
    const GetUser = useCallback(() => {
        dispatch(userActions.getUser());
    }, [dispatch]);

    return { kakaoLogin, session, nickname, isLoading, profile, users, ProfileEditRequest, GetUser, loadingStart, loadingEnd };
}
