export interface UpdateUserInputs {
  username: string;
  email: string;
  fullName: string;
  phoneNumber: string;
}

export interface ChangePasswordProps {
  onPasswordChangeSuccess?: () => void;
  token?: string; // Токен, если пользователь не авторизован
}

export interface ChangePasswordInputs {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
