import React, { createContext, useContext, useState } from 'react'
import { IAuthorization } from '@/type'

interface AuthContextType {
    jwt: string
    setJWT: (jwt: string) => void
}

const authContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [authorization, setAuthorization] = useState<IAuthorization | null>(null)

    const setJWT = (jwt: string) => {
        setAuthorization({ jwt: jwt })
    }

    return <authContext.Provider value={{ jwt: authorization?.jwt || '', setJWT }}>{children}</authContext.Provider>
}

export const useAuthorization = (): AuthContextType => {
    return useContext(authContext)!
}
