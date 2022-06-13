import { Dispatch, SetStateAction } from 'react';

export interface OwnTodoProps {
    ownTodoArray: OwnTodo,
    setOwnTodo: Dispatch<SetStateAction<OwnTodo>>
};

export interface OwnTodo {
    id: number
    title: string,
    todo: [
        {
            task: string,
            checked: boolean
        }
    ],
    importancy: number,
    status: boolean,
    idUserOwner: number
}

export type OwnTodoArray = OwnTodo[];