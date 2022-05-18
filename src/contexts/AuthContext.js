import React, {useContext, useEffect, useState} from "react"
import "firebase/auth"
import "firebase/database";
import {Auth} from "../services/firebase-config";


export const AuthContext = React.createContext(undefined);


export const useAuth = () => useContext(AuthContext);

const createUserWithEmailAndPassword = (email, password) =>
    Auth.createUserWithEmailAndPassword(email, password)

export const signInWithEmailAndPassword = (email, password) => {
    return Auth.signInWithEmailAndPassword(email, password)
}

const signOut = () => {
    return Auth.signOut()
}

const resetPassword = (email) => {
    return Auth.sendPasswordResetEmail(email)
}


export const contextValues = {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    resetPassword
}

export const AuthProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        return Auth.onAuthStateChanged(user => {
            //send UID to backend
            setCurrentUser(user)
            setLoading(false)
        })
    }, [])

    return (
        <AuthContext.Provider value={{...contextValues, currentUser}}>
            {!loading && children}
        </AuthContext.Provider>
    )
}