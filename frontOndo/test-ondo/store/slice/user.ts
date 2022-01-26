import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../interfaces/User.interface';

const initialState: User = {
    nickname: 'base', email: 'base@base.com', count: 0, data: '', error: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        increase: (state) => {
            state.count += 1;
        },
        getKakaoKey: (state) => {
            
        },
        getKakaoKeySuccess: (state, { payload }) => {
            state.data = payload
        },
        getKakaoKeyError: (state, { payload }) => {
            state.error = payload
        }
    }
})

const { actions, reducer } = userSlice;
export const userActions = actions;
export default reducer;