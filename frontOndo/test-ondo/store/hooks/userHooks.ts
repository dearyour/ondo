import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../module';
import { increase } from '../slice/user';

export default function useUser() {
    const dispatch = useDispatch();
    const count = useSelector((state:RootState) => state.user.count);
    const plus = useCallback(() => {
        dispatch(increase());
    }, [dispatch]);

    return { count, plus };
}