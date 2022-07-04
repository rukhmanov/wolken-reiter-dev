export enum FormBreakPoints {
  LARDGE = "60vw",
  SMALL = "35vW",
}

export interface SignupData {
  name: string,
  surname: string,
  email: string,
  phone: string,
  passwordGroup: {
    password: string,
    r_password: string,
  }
}

export interface LoginData {
  email: string,
  password: string,
}

export interface UserData {
  name: string,
  surname: string,
  email: string,
  token: string
}

export interface Token {
  token: string,
}

export interface EmailExistsResponse {
  emailExists: boolean,
}

export interface Email {
  email: string,
}

export enum FormStaus {
  valid = 'VALID',
  invalid = 'INVALID',
}

export interface PhoneCode {
  code: string,
  dial_code: string,
  flag: string,
  name: string,
}
