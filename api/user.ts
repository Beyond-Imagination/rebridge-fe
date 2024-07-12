import { SERVER_URL } from '@/config'
import {
    ISignInResponse,
    ISignInRequest,
    ISignUpRequest,
    ISignUpResponse,
    IAuthorization,
    IUpdateUserRequest,
    IUpdateUserResponse,
    IUserDetail,
} from '@/type'

export async function postSignIn(request: ISignInRequest): Promise<ISignInResponse> {
    const res = await fetch(`${SERVER_URL}/user/signIn`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
    })
    if (res.status === 401) {
        return res.json()
    } else if (!res.ok) {
        throw new Error('network response was not ok')
    }
    return res.json()
}

export async function postSignUp(request: ISignUpRequest): Promise<ISignUpResponse> {
    const res = await fetch(`${SERVER_URL}/user/signUp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
    })
    if (!res.ok) {
        throw new Error('network response was not ok')
    }
    return res.json()
}

export async function getUserDetail(auth: IAuthorization): Promise<IUserDetail> {
    const res = await fetch(`${SERVER_URL}/user/detail`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${auth.jwt}` },
    })
    if (!res.ok) {
        throw new Error('network response was not ok')
    }
    return res.json()
}

export async function updateUserDetail(request: IUpdateUserRequest): Promise<IUpdateUserResponse> {
    const res = await fetch(`${SERVER_URL}/user/detail`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${request.secret.token}` },
        body: JSON.stringify(request.body),
    })
    if (!res.ok) {
        throw new Error('network response was not ok')
    }
    return res.json()
}
