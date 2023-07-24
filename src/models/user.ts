export interface UserCredentials {
  email_address: string
  password: string
  confirm_password?: string
}

export interface User extends UserCredentials {
  id?: string
  fullname: string,
}
