import { Dispatch, SetStateAction } from 'react';

export interface HomeProps {
    userData: UserData,
    setUserData: Dispatch<SetStateAction<UserData>>
    token: Token,
    setToken: Dispatch<SetStateAction<Token>>,
    loginErrors: LoginErrors,
    setLoginErrors: Dispatch<SetStateAction<LoginErrors>>,
    setAdmin: Dispatch<SetStateAction<Boolean>>,
    setLogged: Dispatch<SetStateAction<Boolean>>
};
export interface UserData {
    id: number,
    name: string,
    email: string,
    username: string,
    isAdmin: boolean
};
export interface Token {
    token: string
}
export interface LoginErrors {
    message: string
};