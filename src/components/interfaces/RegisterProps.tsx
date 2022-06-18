import { Dispatch, SetStateAction } from 'react';

export interface RegisterProps {
    userDataRegister: UserDataRegister,
    setUserDataRegister: Dispatch<SetStateAction<UserDataRegister>>,
    registerErrors: RegisterErrors,
    setRegisterErrors: Dispatch<SetStateAction<RegisterErrors>>
};
export interface UserDataRegister {
    name: string,
    email: string,
    password: string,
    username: string,
    isAdmin: boolean
};

export interface RegisterErrors {
    message: string
};