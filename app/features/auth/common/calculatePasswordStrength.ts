export const calculatePasswordStrength = (password: string) => {
  const checks = [
    /[a-z]/.test(password),
    /[A-Z]/.test(password),
    /\d/.test(password),
    /[@$!%*?&]/.test(password),
    password.length >= 5
  ];
  return {
    strength: checks.filter(Boolean).length * 20
  };
};
