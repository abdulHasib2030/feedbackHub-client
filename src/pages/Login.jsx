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
import { Link, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import Swal from 'sweetalert2';
import axios from 'axios'
import toast from 'react-hot-toast';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';


const Login = () => {
    const { setUser, loginUser, googleAuth, setCountReview, setCountService } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const {lenReview, lenService} = useLoaderData()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({})
    setCountReview(lenReview)
    setCountService(lenService)

    const handleLogin = (e) => {
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        if(!email) return setError({email: "Email required"})
        if(!password) return setError({password: "Password required"})
        else setError({})
        setLoading(true)

        loginUser(email, password)
            .then(res => {
                const user = res.user;
                setUser(user)
               
                toast.success("Successfully login.")
                navigate(location.state ? location.state : "/"
                )
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
                toast.error("Invalid Email or Password")
                return
            })
    }

    const handleGoogleLogin = () => {
        googleAuth().then(res => {
            setUser(res.user)
            navigate('/')
        })
    }


    return (
        <div className='mt-20 py-16'>
             <Helmet title='Login | FeedbackHub' />
                   
            <Layout />
            <section className="" >
                <div className="place-items-center  grid  dark:bg-gray-900">
                    <Card
                        shadow={false}
                        className=" container mx-auto flex md:flex-row justify-between dark:text-white dark:bg-gray-900 border dark:border-gray-600"  >
                        <CardHeader>
                            <Lottie animationData={img} className='h-full w-full dark:bg-gray-900 border-none shadow-none'></Lottie>

                        </CardHeader>

                        {/* <CardHeader shadow={false} floated={false} className="text-center">



                        </CardHeader> */}
                        <CardBody className='md:w-1/2'>

                            <Typography
                                variant="h1"
                                color="blue-gray"
                                className="mb-4 !text-3xl font-bold lg:text-4xl w-full"
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
                                {
                                    error?.email && <p className='text-red-500'>{error?.email}</p>
                                }
                                <label className='text-start font-bold  '>Password</label>


                                <input

                                    type="password"
                                    name="password"
                                    className="w-full input input-bordered placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200 p-1 h-12"
                                    labelProps={{
                                        className: "hidden",
                                    }}
                                />
                                 {
                                    error?.password && <p className='text-red-500'>{error?.password}</p>
                                }
                                {
                                    loading ? 
                                <Button type='submit' size="lg" variant='outlined' className='flex h-12 border-gray-600 bg-gray-600 text-white items-center justify-center gap-2'>
                                    Loading...
                                </Button>:
                                <Button type='submit' size="lg" variant='outlined' className='flex h-12 border-gray-600 bg-gray-600 text-white items-center justify-center gap-2'>
                                    Login
                                </Button>
                                }
                            </form>
                            <div className='divider'>or</div>
                            <Button onClick={handleGoogleLogin}
                                variant="outlined"
                                size="lg"
                                className="flex h-12 dark:text-white border-blue-gray-200 items-center justify-center gap-2 mb-2"
                                fullWidth
                            >
                                <img
                                    src={`https://www.material-tailwind.com/logos/logo-google.png`}
                                    alt="google"
                                    className="h-6 w-6 "
                                />{" "}
                                sign in with google
                            </Button>

                            <p>Don't have an Account? <Link className='link-hover text-blue-700 ' to={'/register'}>Register</Link></p>


                        </CardBody>
                    </Card>
                </div>
            </section>
            <Footer/>
        </div>
    );
};

export default Login;