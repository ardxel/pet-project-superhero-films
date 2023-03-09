export const signUpValidation = (values) => {
  const errors: Partial<typeof values> = {};

  if (!values.email) {
    errors.email = 'email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.username) {
    errors.username = 'username is required';
  } else if (
    !/^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/i.test(
      values.username
    )
  ) {
    errors.username = 'username must be is 6-20 characters long';
  }

  if (!values.password) {
    errors.password = 'password is required';
  } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/i.test(values.password)) {
    errors.password =
      'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters';
  }

  if (values.confirm_password !== values.password) {
    errors.confirm_password = 'both passwords must match';
  }

  return errors;
};

export const loginValidation = (values) => {
  const errors: Partial<typeof values> = {};

  if (!values.login) {
    errors.login = 'login is required';
  }
  return errors;
};
