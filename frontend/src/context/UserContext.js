import { createContext, useEffect, useReducer } from 'react'

export const UserContext = createContext();

export const UserReducer = (state, action) => {
    switch(action.type){
        case 'LOGIN' :
            return {
                users: action.payload
            }
        case 'LOGOUT' :
            return{
                users: null
            }
        default :
            return state
    }
}

export const UserContextProvider = ({ children }) => {
    
    const [state, dispatch] = useReducer(UserReducer, {
        users: null
    })

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("users"))
        if(token){
            dispatch({
                type: 'LOGIN',
                payload: token
            })
        }
    }, [])

    console.log('AuthContext state:', state)
    return (
        <UserContext.Provider value={{...state, dispatch}}>
            {children}
        </UserContext.Provider>
    )
}