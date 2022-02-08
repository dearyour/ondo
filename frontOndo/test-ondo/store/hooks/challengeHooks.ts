import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../module';
import { userActions } from '../slice/user';

export default function useUser() {
    const dispatch = useDispatch();
    const data = useSelector((state:RootState) => state.user.data);
    const nickname = useSelector((state:RootState) => state.user.nickname);
    const editednickname = useSelector((state:RootState) => state.user.editednickname);
    const kakaoLogin = useCallback(() => {
        dispatch(userActions.getKakaoKey());
    }, [dispatch]);
    const ProfileEditRequest = useCallback((e) => {
        e.preventDefault();
        dispatch(userActions.profileEdit());
    }, [editednickname])
    const GetUser = useCallback(() => {
        dispatch(userActions.getUser)
    }, [dispatch])


    return { kakaoLogin, data, nickname, ProfileEditRequest, GetUser };
}