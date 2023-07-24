import { TimeStamp } from "./common"

export interface UserCredentials {
  email_address: string
  password: string
  confirm_password?: string
}

export interface User extends UserCredentials, TimeStamp {
  id?: string
  fullname: string,
}
