import React, { createContext, useEffect, useState } from 'react';
export const AuthContext = createContext();
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from '../firebase/firebase';
import Swal from 'sweetalert2';

const AuthProvider = ({children}) => {
    const [loading, setLoading] =useState(true);
    const [user, setUser] = useState(null);

    const createUser = (email, password) =>{
    // setLoading(true)
       return  createUserWithEmailAndPassword(auth, email, password)
    }

    const loginUser = (email, password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const updateUserProfile = (userData) =>{
        return updateProfile(auth.currentUser, userData)
    }

   useEffect(()=>{
    const subscribe  = onAuthStateChanged(auth, (currentUser)=>{
        setLoading(false)
         currentUser ? setUser(currentUser) : setUser(null)
    })
    return ()=>{
        subscribe()
    }
   }, [])

   const logoutUser = () =>{
    setLoading(false)
    Swal.fire({
        title:"Successfully Logout.",
        icon: "success",
        draggable:true,
    })
    return signOut(auth)

   }
    
    const authInfo = {
        user,
        setUser,
        loading,
        setLoading,
        createUser, 
        loginUser,
        updateUserProfile,
        logoutUser,
    }
    return (
       <AuthContext.Provider value={authInfo}>
        {children}
       </AuthContext.Provider>
    );
};

export default AuthProvider;