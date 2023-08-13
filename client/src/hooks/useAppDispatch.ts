import { useDispatch } from 'react-redux';
import { AppDispatch } from '@reduxproj//store';

export const useAppDispatch: () => AppDispatch = useDispatch;
