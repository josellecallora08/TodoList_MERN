import {createContext, useReducer} from 'react'

export const TasksContext = createContext();

export const TaskReducer = (state, action) => {
    switch(action.type){
        case 'SET_TASK': 
            return {
                tasks: action.payload
            }
        case 'CREATE_TASK':
            return{
                tasks: [action.payload, ...state.tasks]
            }
        case 'EDIT_TASK':
            return {
                tasks: state.tasks.map(task =>
                    task._id === action.payload._id ? { ...task, ...action.payload } : task
                )
            }
        case 'DELETE_TASK':
            return{
                tasks: state.tasks.filter(t => t._id !== action.payload._id) 
            }
        default:
            return state
    }
}

export const TaskContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(TaskReducer, {
        tasks: null
    })



    return (
        <TasksContext.Provider value={{...state,dispatch}}>
            {children}
        </TasksContext.Provider>
    )
}