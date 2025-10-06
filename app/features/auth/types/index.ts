export interface AuthLoginForm {
  email: string;
  password: string;
}

export interface AuthRegisterForm extends AuthLoginForm {
  username: string;
  fullName: string;
  address: string;
  phoneNumber: string;
  legalForm: string;
  activity: string;
  organizationName: string;
  consent: boolean;
  confirmation: boolean;
}
