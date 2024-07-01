import { SERVER_URL } from '@/config'
import { ISignInResponse, ISignInRequest, ISignUpRequest, ISignUpResponse } from '@/type'

export async function postSignIn(request: ISignInRequest): Promise<ISignInResponse> {
    const res = await fetch(`${SERVER_URL}/user/signIn`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
    })
    if (!res.ok) {
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
