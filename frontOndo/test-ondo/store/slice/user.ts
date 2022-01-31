import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../interfaces/User.interface';


const initialState: User = {
    nickname: 'base', email: 'base@base.com', count: 0, data: '', error: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        profileEdit: (state) => {
            
        },
        setnickname: (state, {payload}) => {
            state.nickname = payload
        },
        getKakaoKey: (state) => {
            
        },
        getKakaoKeySuccess: (state, { payload }) => {
            state.data = payload
            localStorage.setItem('Token', payload)

        },
        getKakaoKeyError: (state, { payload }) => {
            state.error = payload
        },

        getToken: (state) => {
            const token = localStorage.getItem('Token')
            state.data = token
        }
    }
})

const { actions, reducer } = userSlice;
export const userActions = actions;
export default reducer;