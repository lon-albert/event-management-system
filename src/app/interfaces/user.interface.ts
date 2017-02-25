export interface User {
  _id?: any,
  email: string;
  password: string;
  confirmPassword: string; // required, value must be equal to password
  fullname: string;
  middlename: string;
  is_admin:boolean;
}
