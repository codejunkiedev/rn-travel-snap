export interface IPost {}

export interface IUser {
  name: string;
  email: string;
  posts: IPost[];
  uid: string;
  createdAt: number;
  profilePicURL: string;
}
