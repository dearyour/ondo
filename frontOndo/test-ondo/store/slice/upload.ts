import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FileUpload } from 'store/interfaces/Upload.interface'

const initialState: FileUpload = {
  file: null,
  image: '',
  originalImg: '',
};

export const uploadSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setFile: (state, { payload }) => {
      state.file = payload
    },
    setImage: (state, { payload }) => {
      state.image = payload
    },
    setOriginalImg: (state, { payload }) => {
      state.originalImg = payload
    }
  },
});

const { actions, reducer } = uploadSlice;
export const uploadActions = actions;
export default reducer;
