const regexps = {
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  username: /^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/i,
  password: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/i,
  emailAndUsername:
    /^(?:[A-Z\d][A-Z\d_-]{5,10}|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$/i,
  name: /^[a-z ,.'-]+$/i,
  url: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
};

type fieldValidationFn = (arg: string) => string | void;

type fieldValidationWithTwoArgsFn = (
  arg1: string,
  arg2: string
) => string | void;

const _email: fieldValidationFn = (email) => {
  if (!email) {
    return 'email is required';
  } else if (!regexps.email.test(email)) {
    return 'Invalid email address';
  }
};

const _name: fieldValidationFn = (name) => {
  if (!name) {
    return 'name is required';
  }
  if (!regexps.name.test(name)) {
    return 'invalid name';
  }
};

const _username: fieldValidationFn = (username) => {
  if (!username) {
    return 'username is required';
  } else if (!regexps.username.test(username)) {
    return 'username must be is 6-20 characters long';
  }
};
const _login: fieldValidationFn = (login) => {
  if (!login) {
    return 'email or username is required';
  } else if (!regexps.emailAndUsername.test(login)) {
    return 'invalid email address or username';
  }
};
const _password: fieldValidationFn = (password) => {
  if (!password) {
    return 'password is required';
  } else if (!regexps.password.test(password)) {
    return 'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters';
  }
};

const _url: fieldValidationFn = (url) => {
  if (!url) {
    return 'url is required';
  } else if (!regexps.url.test(url)) {
    return 'invalid url';
  }
};

const _confirmPassword: fieldValidationWithTwoArgsFn = (
  confirm_password,
  password
) => {
  if (confirm_password !== password) {
    return 'both passwords must match';
  } else return undefined;
};

const isEmptyErrors: (errors: object) => object | void = (errors) => {
  for (const error of Object.values(errors)) {
    if (error) return errors;
  }
};

export const signUpValidation = (values) => {
  const errors: Partial<typeof values> = {};
  errors.email = _email(values.email);

  errors.username = _username(values.username);

  errors.password = _password(values.password);

  errors.confirm_password = _confirmPassword(
    values.confirm_password,
    values.password
  );

  return isEmptyErrors(errors);
};

export const loginValidation = (values) => {
  const errors: Partial<typeof values> = {};

  errors.login = _login(values.login);
  errors.password = _password(values.password);

  return isEmptyErrors(errors);
};

export const editProfileValidation = (values) => {
  const errors: Partial<typeof values> = {};

  errors.name = _name(values.name);

  errors.avatar = _url(values.avatar);

  if (!values.biography) {
    void 0;
  }
  if (values.biography.length > 250) {
    errors.biography = 'maximum length 250 characters';
  }

  return isEmptyErrors(errors);
};

export const changePasswordValidation = (values) => {
  const errors: Partial<typeof values> = {};

  errors.password = _password(values.password);

  errors.confirm_password = _confirmPassword(
    values.confirm_password,
    values.password
  );

  return isEmptyErrors(errors);
};
