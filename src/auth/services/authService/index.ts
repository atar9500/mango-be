import {CognitoIdentityServiceProvider, DynamoDB, SNS} from 'aws-sdk';

import confirmForgotPassword, {
  ConfirmForgotPasswordArgs,
} from './confirmForgotPassword';
import confirmSignUp, {
  ConfirmSignUpArgs,
  ConfirmSignUpResponse,
} from './confirmSignUp';
import forgotPassword, {ForgotPasswordArgs} from './forgotPassword';
import login, {LoginArgs, LoginResponse} from './login';
import refresh, {RefreshArgs, RefreshResponse} from './refresh';
import sendOtp, {SendOtpArgs} from './sendOtp';
import signUp, {SignUpArgs} from './signUp';
import verifyOtp, {VerifyOtpArgs} from './verifyOtp';

const cognito = new CognitoIdentityServiceProvider();
const db = new DynamoDB.DocumentClient();
const sns = new SNS();

export type AuthService = {
  confirmForgotPassword: (args: ConfirmForgotPasswordArgs) => Promise<void>;
  confirmSignUp: (args: ConfirmSignUpArgs) => Promise<ConfirmSignUpResponse>;
  forgotPassword: (args: ForgotPasswordArgs) => Promise<void>;
  login: (args: LoginArgs) => Promise<LoginResponse>;
  refresh: (args: RefreshArgs) => Promise<RefreshResponse>;
  sendOtp: (args: SendOtpArgs) => Promise<void>;
  signUp: (args: SignUpArgs) => Promise<void>;
  verifyOtp: (args: VerifyOtpArgs) => Promise<void>;
};

const authService: AuthService = {
  confirmForgotPassword: async args =>
    await confirmForgotPassword(cognito, args),
  confirmSignUp: async args => await confirmSignUp(cognito, db, args),
  forgotPassword: async args => await forgotPassword(cognito, args),
  login: async args => await login(cognito, db, args),
  refresh: async args => await refresh(cognito, args),
  sendOtp: async args => await sendOtp(cognito, sns, args),
  signUp: async args => await signUp(cognito, db, args),
  verifyOtp: async args => await verifyOtp(cognito, args),
};

export default authService;
