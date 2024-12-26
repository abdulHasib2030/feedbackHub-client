import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


const axiosInstance = axios.create({
    baseURL:`${import.meta.env.VITE_URL}`,
    withCredentials: true,
})
const useAxiosSecure = () => {
    const {logoutUser} = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(()=>{
        axiosInstance.interceptors.response.use( response=>{
            return response
        }, error =>{
            console.log("error cot in ");
            console.log(error);
            if(error.status === 401 || error.status === 403){
                console.log("logout the user")
                logoutUser()
                .then(()=> {
                    console.log("logout user");
                    navigate('/login')
                })
                .catch(err => {
                    console.log(err);
                })
            }
            return Promise.reject(error)
        } )
    }, [])

    // useEffect(()=>{
    //     axiosInstance.interceptors.response.use(response =>{
    //         return response
    //     },error=>{
    //         if(error.status === 401 || error.status === 403){
    //             logoutUser()
    //             .then(()=>{
    //                 navigate('/login')
    //                 toast.success("Invalid credentials.")
    //             })
    //             .catch(err => (err))
    //         }
    //         return Promise.reject(error)
    //     })
    // })
    return axiosInstance;
};

export default useAxiosSecure;