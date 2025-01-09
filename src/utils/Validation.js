export const validateRequired = (value) => {
  return value.trim() !== '' ? '' : 'This field is required';
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email) ? '' : 'Invalid email address';
};

export const validatePassword = (password) => {
  return password.length >= 8 ? '' : 'Password must be at least 8 characters long';
};