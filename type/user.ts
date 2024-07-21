export interface IUser {
    name: string
    email: string
    birthdate: Date
    gender: number
    occupation: string
    oauthId: string
}

export interface IUserDetail extends IUser {
    major: string
    jobObjectives: string
    address: string
}

export interface ISignUpInputs {
    id: string
    passwd1: string
    passwd2: string
    name: string
    birthDate: Date
    email: string
    gender: number // 0: male, 1: female
    occupation: string
}

export interface IAuthorization {
    jwt: string
}

export interface ISignInRequest {
    oauthId: string
    password: string
}

export interface ISignInResponse extends IAuthorization {}

export interface ISignUpRequest {
    oauthId: string
    password: string
    oauthProvider: string
    email: string
    name: string
    birthDate: Date
    gender: number
    occupation: string
}

export interface IUserDetailResponse extends IUserDetail {}

export interface ISignUpResponse {
    oauthId: string
}

export interface IUpdateUserRequest {
    body: {
        occupation: string
        major: string
        jobObjectives: string
        address: string
    }
    secret: {
        token: string
    }
}

export interface IUpdateUserResponse extends IUser {}
