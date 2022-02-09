import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../module';
import { uploadActions } from '../slice/upload';

export default function useImg() {
  const dispatch = useDispatch();
  const file = useSelector((state: RootState) => state.upload.file);
  const image = useSelector((state: RootState) => state.upload.image);
  const originalImg = useSelector((state: RootState) => state.upload.originalImg);
  const setFile = useCallback((e) => {
    dispatch(uploadActions.setFile(e));
  }, [dispatch]);
  const setImage = useCallback((e) => {
    dispatch(uploadActions.setImage(e));
  }, [dispatch]);
  const setOriginalImage = useCallback((e) => {
    dispatch(uploadActions.setOriginalImg(e));
  }, [dispatch]);

  return { file, image, originalImg, setFile, setImage, setOriginalImage };
}