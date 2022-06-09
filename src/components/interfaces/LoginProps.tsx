import { Dispatch, SetStateAction } from 'react';

export interface LoginProps {
    user: User,
    setUser: Dispatch<SetStateAction<User>>
    userData: UserData,
    setUserData: Dispatch<SetStateAction<UserData>>
    loginErrors: LoginErrors,
    setLoginErrors: Dispatch<SetStateAction<LoginErrors>>
};
export interface User {
    user: string,
    password: string
};
export interface UserData {
    id: number,
    name: string,
    email: string,
    username: string,
    password: string,
    isAdmin: boolean
};
export interface LoginErrors {
    message: string
};