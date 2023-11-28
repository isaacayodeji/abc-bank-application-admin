export namespace ApiResponse {
  export class Api {
    data?: any;
    responseMessage?: string;
    status?: number;
    token?: string;
  }
  export class UserInfo {
    id?: number;
    fullName?: string;
    address?: string;
    approvedBy?: string;
    email?: string;
    branch?: string;
    userName?: string;
    hashedPassword?: string;
    roleId?: number;
    isActive?: boolean;
    isApproved?: boolean;
    dateCreated?: string;
    dateModified?: any;
  }
  export class SignUpInfo {
    firstName?: string;
    middleName?: string;
    surname?: string;
    phoneNumber?: string;
    email?: string;
    dob?: string;
    address?: string;
    gender?: string;
    password?: string;
  }
}
