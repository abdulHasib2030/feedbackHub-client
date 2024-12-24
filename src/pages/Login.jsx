import React, { useContext } from 'react';
import Lottie from 'lottie-react';
import {
    Card,
    Input,
    Button,
    CardBody,
    CardHeader,
    Typography,
} from "@material-tailwind/react";
import Layout from '../Layout/Layout';
import img from '../assets/login.json'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import Swal from 'sweetalert2';
import axios from 'axios'


const Login = () => {
   const {setUser, setLoading, loginUser} = useContext(AuthContext)
   const navigate = useNavigate()
   const location = useLocation()

    const handleLogin = (e) =>{
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password);
        loginUser(email, password)
        .then(res =>{
            const user = res.user;
            setUser(user)
            const jwtUser = {email:email}
            axios.post(`${import.meta.env.VITE_URL}/jwt`, jwtUser,{
                withCredentials:true,
            })
            .then(res => {
                console.log(res.data);
            })
            Swal.fire({
                title:"Successfully login",
                icon: "success",
                draggable:true,
            })
           navigate( location.state ? location.state : "/"
)
        })
        .catch(err => {
            setLoading(false)
            Swal.fire({
                title:"Invalid email && password.",
                icon:"error",
                draggable:true,
            })
            return
        })
    }
    return (
        <div>
            <Layout/>
            <section className=" my-10" >
                <div className="place-items-center h-screen grid ">
                    <Card
                        shadow={false}
                        className="md:px-24 md:py-14 py-8 px-4 flex md:flex-row border border-gray-300"
                    >

                        <CardHeader>
                        <Lottie animationData={img}></Lottie>

                        </CardHeader>

                        <CardHeader shadow={false} floated={false} className="text-center">


                          
                        </CardHeader>
                        <CardBody>
                            
                        <Typography
                                variant="h1"
                                color="blue-gray"
                                className="mb-4 !text-3xl font-bold lg:text-4xl"
                            >
                               Welcome Back Login
                            </Typography>
                            <form
                                onSubmit={handleLogin}
                                className="flex flex-col gap-4 md:mt-12"
                            >
                             <label className='text-start font-bold  '>Gmail</label>
                                        
                                    <input
                                       
                                     
                                        type="email"
                                        name="email"
                                        placeholder="example@mail.com"
                                        className="w-full input input-bordered placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200 p-1 h-12"
                                       
                                    />
                                    <label className='text-start font-bold  '>Password</label>
                         
                                          
                                    <input
                                       
                                        type="password"
                                        name="password"
                                        className="w-full input input-bordered placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200 p-1 h-12"
                                        labelProps={{
                                            className: "hidden",
                                        }}
                                    />
                          
                                <Button type='submit' size="lg" variant='outlined' className='flex h-12 border-gray-600 bg-gray-600 text-white items-center justify-center gap-2'>
                                    Login
                                </Button>
                                </form>
                                <div className='divider'>or</div>
                                <Button
                                    variant="outlined"
                                    size="lg"
                                    className="flex h-12 border-blue-gray-200 items-center justify-center gap-2"
                                    fullWidth
                                >
                                    <img
                                        src={`https://www.material-tailwind.com/logos/logo-google.png`}
                                        alt="google"
                                        className="h-6 w-6"
                                    />{" "}
                                    sign in with google
                                </Button>

                                <p>Don't have an Account? <Link className='link-hover text-blue-700' to={'/register'}>Register</Link></p>
                            
                           
                        </CardBody>
                    </Card>
                </div>
            </section>
        </div>
    );
};

export default Login;