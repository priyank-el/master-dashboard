import React, { createContext, useState } from 'react'
export const JwtAuth = createContext()

export default function ContextProvider({ children }) {
    const [loginUser, setLoginUser] = useState({})
    const [isAuthenticated, setAsAuthenticated] = useState(false)
    return (
        <JwtAuth.Provider value={{ loginUser, setLoginUser, isAuthenticated, setAsAuthenticated }} >
            {children}
        </JwtAuth.Provider>
    )
}