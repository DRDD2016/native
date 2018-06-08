
export function loginValidator ({ email, password }) {
  const errors = {};

  if (!email) {
    errors.email = 'Required field';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = 'Invalid email address';
  }
  if (!password) {
    errors.password = 'Required field';
  } else if (password.length < 5) {
    errors.password = 'Password is too short';
  }

  return errors;
}


export function signupValidator ({ firstname, surname, email, password, confirmPassword }) {
  const errors = {};

  if (!firstname) {
    errors.firstname = 'Required field';
  }
  if (!surname) {
    errors.surname = 'Required field';
  }
  if (!email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = 'Invalid email address';
  }
  if (!password) {
    errors.password = 'Password is required';
  } else if (password.length < 5) {
    errors.password = 'Password is too short. Must be a minimum of 4 characters';
  }
  if (!confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
  }
  if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords must match';
  }

  return errors;
}

export function emailValidator ({ email }) {
  const errors = {};

  if (!email) {
    errors.email = 'Required field';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
}

export function passwordValidator ({ password, confirmPassword }) {
  const errors = {};

  if (!password) {
    errors.password = 'Password is required';
  } else if (password.length < 5) {
    errors.password = 'Password is too short';
  }
  if (!confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
  }
  if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords must match';
  }

  return errors;
}

export function codeValidator ({ code }) {
  const errors = {};

  if (!code) {
    errors.code = 'Required field';
  }

  return errors;
}
