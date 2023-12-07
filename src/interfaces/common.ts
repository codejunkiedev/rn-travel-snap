// this file contains the interfaces that are used in the app

interface FirebaseResource {
  createdAt: number;
  updatedAt: number;
  uid: string;
}

export interface IPost extends FirebaseResource {
  id: string;
  content: string;
  imageURL: string;
  userId: string;
  user: IUser;
  createdAt: number;
}

export interface IUser extends FirebaseResource {
  name: string;
  email: string;
  profilePicURL: string;
}
