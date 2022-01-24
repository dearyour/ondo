import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User { 
    nickname: string;
    email: string;
    count: number;
  }
const initialState: User = {
    nickname: 'base', email: 'base@base.com', count: 0
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        increase: (state) => {
            state.count += 1;
        }
    }
})

const { actions, reducer } = userSlice;
export const {increase} = actions;
export default reducer;