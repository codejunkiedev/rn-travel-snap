import { IUser } from './common';

// this file contains the interfaces for the redux slices

export interface IAppState {
  user: IUser | null;
  isLoading: boolean;
  isLoggedIn: boolean;
}
