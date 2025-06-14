
export const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  if (password.length < 8) return "Min 8 characters required";
  if (!/[a-z]/.test(password)) return "At least one lowercase required";
  if (!/[A-Z]/.test(password)) return "At least one uppercase required";
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) return "At least one special character required";
  return "";
};
