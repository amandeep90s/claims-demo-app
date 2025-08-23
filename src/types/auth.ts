export interface SignInCredentials {
  userId: string;
  password: string;
}

export interface SignUpCredentials {
  firstName: string;
  lastName: string;
  email: string;
  personalId: string;
  mobileNumber?: string;
}

export interface ForgotPasswordCredentials {
  email: string;
}

export interface ResetPasswordCredentials {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface SetPasswordCredentials {
  password: string;
  confirmPassword: string;
  securityQuestion1: string;
  securityQuestion2: string;
}

export interface CompleteSignupCredentials {
  otp: string;
}

export interface SignInFormProps {
  onSubmit?: (data: SignInCredentials) => Promise<void> | void;
  isLoading?: boolean;
  error?: string;
}

export interface SignUpFormProps {
  onSubmit?: (data: SignUpCredentials) => Promise<void> | void;
  isLoading?: boolean;
  error?: string;
}

export interface ForgotPasswordFormProps {
  onSubmit?: (data: ForgotPasswordCredentials) => Promise<void> | void;
  isLoading?: boolean;
  error?: string;
}

export interface ResetPasswordFormProps {
  onSubmit?: (data: ResetPasswordCredentials) => Promise<void> | void;
  isLoading?: boolean;
  error?: string;
}

export interface SetPasswordFormProps {
  onSubmit?: (data: SetPasswordCredentials) => Promise<void> | void;
  isLoading?: boolean;
  error?: string;
}

export interface CompleteSignupFormProps {
  onSubmit?: (data: CompleteSignupCredentials) => Promise<void> | void;
  onResendOTP?: () => Promise<void> | void;
  isLoading?: boolean;
  error?: string;
}

export interface AuthLayoutProps {
  children: React.ReactNode;
}
