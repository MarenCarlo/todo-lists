import React from 'react'
import { CssBaseline } from '@mui/material';
import { UserDataContext } from '../../App';
import { useContext } from 'react'

export const ModalForm = () => {
    const userData: any = useContext(UserDataContext);

    return (
        <>
            <CssBaseline />
            {userData.username}
        </>
    )
}
