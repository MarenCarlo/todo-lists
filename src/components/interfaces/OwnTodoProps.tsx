import { Dispatch, SetStateAction } from 'react';

export interface OwnTodoProps {
    ownTodoArray: OwnTodoArray,
    setOwnTodo: Dispatch<SetStateAction<OwnTodoArray>>
};

export interface OwnTodo {
    id: number
    task: string,
    checked: boolean
    idUserOwner: number
}

export type OwnTodoArray = OwnTodo[];