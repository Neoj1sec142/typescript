import React, {useCallback, useReducer} from 'react'

type ActionType = 
    | { type: "ADD", text: string }
    | { type: "DELETE", id: number }
  
interface Todo {
    id: number;
    done: boolean;
    text: string;
}

export function useTodos(initialTodos: Todo[]): {
    todos: Todo[];
    addTodo: (text: string) => void;
    removeTodo: (id: number) => void;

} {
    const [todos, dispatch] = useReducer(
        (state: Todo[], action: ActionType) => {
        switch(action.type){
            case "ADD":
            return [
                ...state,
                {
                id: state.length,
                text: action.text,
                done: false,
                }
            ]
            case "DELETE":
            return state.filter(({ id }) => id !== action.id)
            default: 
            throw new Error();
        }
    }, initialTodos)

    const removeTodo = useCallback((id: number) => {
        dispatch({
            type: "DELETE",
            id,
        })
    }, [])

    const addTodo = useCallback((text: string) => {
        dispatch({
            type: "ADD",
            text,
        })
    }, [])

    return { todos }
}