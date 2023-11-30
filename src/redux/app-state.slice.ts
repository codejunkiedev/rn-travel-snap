import { IAppState } from '@/interfaces/redux';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: IAppState = {
  isLoading: false,
  isLoggedIn: false,
  user: null,
};

export const appStateSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<IAppState['user']>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    removeUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
    updateLoading: (state, action: PayloadAction<IAppState['isLoading']>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { removeUser, updateLoading, updateUser } = appStateSlice.actions;

export default appStateSlice.reducer;
