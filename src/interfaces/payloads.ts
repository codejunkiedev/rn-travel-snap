export interface ILoginForm {
  email: string;
  password: string;
}

export interface ISignUpForm extends ILoginForm {
  name: string;
  confirmPassword: string;
  profilePicture: string;
}
