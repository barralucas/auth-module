import { createContext, ReactNode, useState } from "react";
import { api } from "../services/api";
import Router from 'next/router';

type User = {
    email: string;
    permissions: string[];
    roles: string[];
}

type Credentials = {
    email: string;
    password: string;
}

type AuthContextData = {
    signIn(credentials: Credentials): Promise<void>;
    user: User | undefined;
    isAuthenticated: boolean;
}

type AuthProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>();
    const isAuthenticated = !!user;

    async function signIn({ email, password }: Credentials) {
        try {
            const response: any = await api.post('sessions', {
                email,
                password
            })

            const { permissions, roles } = response.data;

            setUser({
                email,
                permissions,
                roles
            })

            Router.push('/dashboard')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, signIn, user }}>
            {children}
        </AuthContext.Provider>
    );
}