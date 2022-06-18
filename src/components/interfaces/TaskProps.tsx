import { Dispatch, SetStateAction } from 'react';

export interface TaskProps {
    newTask: TaskData,
    setNewTask: Dispatch<SetStateAction<TaskData>>
    ownTodoArray: OwnTodoArray,
    setOwnTodo: Dispatch<SetStateAction<OwnTodoArray>>
};

export interface TaskData {
    task: string,
    checked: boolean
    idUserOwner: number
}
export interface OwnTodo {
    id: number
    task: string,
    checked: boolean
    idUserOwner: number
}

export type OwnTodoArray = OwnTodo[];