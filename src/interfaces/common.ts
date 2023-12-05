interface FirebaseResource {
  createdAt?: number;
  updatedAt?: number;
  uid?: string;
}

export interface IPost extends FirebaseResource {
  content: string;
  imageURL: string;
  user: IUser;
}

export interface IUser extends FirebaseResource {
  name: string;
  email: string;
  profilePicURL: string;
}
