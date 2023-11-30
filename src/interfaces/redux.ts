import { IUser } from './common';

export interface IAppState {
  user: IUser | null;
  isLoading: boolean;
  isLoggedIn: boolean;
}
