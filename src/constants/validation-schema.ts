import * as yup from 'yup';

// validation schema is using with formik form
// so that we can validate the form before submit

export const validationSchemaSignUp = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

export const validationSchemaSignIn = yup.object().shape({
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export const validationSchemaAddPost = yup.object().shape({
  content: yup
    .string()
    .min(1, 'Content must be at least 1 characters')
    .max(250, 'Content must be at most 250 characters')
    .required('Content is required'),
});
