export const validateLogin = ({ email, password }) => {
  if (!email.trim() || !password.trim()) {
    return {
      valid: false,
      message: "Please fill in all fields.",
    };
  }

  return {
    valid: true,
    message: "Login Successful!",
  };
};

// Register Validation
export const validateRegister = ({
  fullName,
  email,
  password,
  confirmPassword,
  terms,
}) => {
  if (
    !fullName.trim() ||
    !email.trim() ||
    !password.trim() ||
    !confirmPassword.trim()
  ) {
    return {
      valid: false,
      message: "Please fill in all fields.",
    };
  }

  if (password !== confirmPassword) {
    return {
      valid: false,
      message: "Passwords do not match.",
    };
  }

  if (!terms) {
    return {
      valid: false,
      message: "Please accept the Terms & Conditions.",
    };
  }

  return {
    valid: true,
    message: "Registration Successful!",
  };
};