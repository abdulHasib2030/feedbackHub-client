import React, { createContext, useEffect, useState } from 'react';
export const AuthContext = createContext();
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from '../firebase/firebase';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import axios from 'axios';


const provider = new GoogleAuthProvider()
const AuthProvider = ({children}) => {
    const [loading, setLoading] =useState(true);
    const [user, setUser] = useState(null);
    const [countService, setCountService] = useState(0)
    const [countReview, setCountReview] = useState(0)

    const createUser = (email, password) =>{
    // setLoading(true)
       return  createUserWithEmailAndPassword(auth, email, password)
    }

    const loginUser = (email, password) =>{
        // setLoading(true)
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
        currentUser ? setUser(currentUser) : setUser(null)
        
        if(currentUser?.email){
            const user = {email: currentUser.email}
            axios.post(`${import.meta.env.VITE_URL}/jwt`, user, {
                withCredentials:true
            })
            .then(res => {
                setLoading(false)
            })
        }
        else{
            axios.post(`${import.meta.env.VITE_URL}/logout`, {},{
                withCredentials:true
            })
            .then(res => {
                setLoading(false)
            })
        }

      
        
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
        countReview, 
        setCountReview,setCountService,
        countService, 
    }
    return (
       <AuthContext.Provider value={authInfo}>
        {children}
       </AuthContext.Provider>
    );
};

export default AuthProvider;