import { validationSchemaSignIn, validationSchemaSignUp } from '@/constants';
import * as yup from 'yup';

export type ILoginForm = yup.InferType<typeof validationSchemaSignIn>;
export type ISignUpForm = yup.InferType<typeof validationSchemaSignUp>;
