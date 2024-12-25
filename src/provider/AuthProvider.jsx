import React, { createContext, useEffect, useState } from 'react';
export const AuthContext = createContext();
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from '../firebase/firebase';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

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

    const googleAuth = () =>{
        return signInWithPopup(auth, provider)
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
   toast.success("Successfully logout.")
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
        googleAuth,
    }
    return (
       <AuthContext.Provider value={authInfo}>
        {children}
       </AuthContext.Provider>
    );
};

export default AuthProvider;