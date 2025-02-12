import React, { useContext, useState } from 'react';
import Lottie from 'lottie-react';
import Swal from 'sweetalert2'

import {
    Card,

    Button,
    CardBody,
    CardHeader,
    Typography,
} from "@material-tailwind/react";
import Layout from '../Layout/Layout';
import img from '../assets/register.json'
import { Link, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import { use } from 'react';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import Footer from '../components/Footer';

const Register = () => {

    const { googleAuth, createUser, setUser, updateUserProfile, setLoading, setCountReview, setCountService } = useContext(AuthContext)
    const location = useLocation()
    const navigate = useNavigate()
    const [error, setError] = useState({})
    const { lenReview, lenService } = useLoaderData()
    setCountReview(lenReview)
    setCountService(lenService)

    const handleRegister = (e) => {
        e.preventDefault()
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photoURL = form.photoURL.value;
        const password = form.password.value;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

        if (name.length < 5) {
            setError({ name: "Name can't 5 character less." })
            return
        }
        if (!email) {
            setError({ email: 'Provide Email Address' })
            return
        }

        if (!photoURL) {
            setError({ photo: 'Provide photo-url' })
            return
        }

        if (!passwordRegex.test(password)) {
            setError({ password: "Password must meet one Uppercase, lowercase letter and at least 6 chanacters long." })
            return
        }




        createUser(email, password)
            .then((result) => {
                const user = result.user;
                setUser(user)

                updateUserProfile({ displayName: name, photoURL: photoURL })
                    .then(() => {
                        toast.success('Successfully Registered')
                        navigate(location.state ? location.state : '/')
                    })
                    .catch((error) => {
                        const err = error.message;
                        setError({ error: err })

                    })
            })
            .catch((error) => {

                if (error.code === 'auth/email-already-in-use') {
                    Swal.fire({
                        title: "Email Already Registered",
                        text: "The email you entered is already associated with an account. Please log in instead or use a different email to register.",
                        icon: "warning",
                        confirmButtonText: "Go to Login",
                        showCancelButton: true,
                        cancelButtonText: "Cancel",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            navigate("/login"); // Navigate to the login page
                        }
                    });
                }
                else {
                    const err = error.message;
                    setError({ error: err })

                }
            })



    }

    const handleGoogleLogin = () => {
        googleAuth().then(res => {
            setUser(res.user)
            navigate('/')
        })
    }

    return (
        <div className='mt-20 py-10'>
            < Helmet title='Register | FeedbackHub' />

            <Layout />
            <section className="" >
                <div className=" grid place-items-center">
                    <Card
                        shadow={false}
                        className="md:px-2 justify-between dark:text-white container mx-auto md:py-9 dark:bg-gray-900 py-8 px-4 flex items-center gap-6 md:flex-row border dark:border-gray-600"
                    >

                        <CardHeader>
                            <Lottie animationData={img} className='h-96 shadow-none dark:bg-gray-900'></Lottie>

                        </CardHeader>

                        {/* <CardHeader shadow={false} floated={false} className="text-center">



                        </CardHeader> */}
                        <CardBody className='md:w-1/2'>/

                            <Typography
                                variant="h1"
                                color="blue-gray"
                                className="mb-4 !text-3xl font-bold lg:text-4xl"
                            >
                                Create your Account
                            </Typography>
                            <form onSubmit={handleRegister}

                                className="flex flex-col gap-4 md:mt-12"
                            >
                                <div className='flex gap-2 w-full items-center'>
                                    <div className='w-full'>
                                    <label className='text-start font-bold'>Name</label>

                                    <input


                                        type="text"
                                        name="name"
                                        placeholder="Enter your name"
                                        className="w-full mt-3 input-bordered input placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200 p-1 h-12"

                                    />
                                    {
                                        error && error?.name && <div>
                                            <p className='text-red-500'>{error.name}</p>
                                        </div>
                                    }

                                    </div>
                                    <div className='w-full'>
                                    <label className='text-start font-bold  '>Gmail</label>

                                    <input


                                        type="email"
                                        name="email"
                                        placeholder="example@mail.com"
                                        className="w-full mt-3 input-bordered input placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200 p-1 h-12"

                                        />
                                        {
                                            error && error?.email && <div>
                                                <p className='text-red-500'>{error.email}</p>
                                            </div>
                                        }

                                    </div>
                                </div>

                                <label className='text-start font-bold  '>PhotoURL</label>

                                <input

                                    type="url"
                                    name="photoURL"
                                    placeholder="htttps://example.png"
                                    className="w-full input-bordered input placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200 p-1 h-12"

                                />
                                {
                                    error && error?.photo && <div>
                                        <p className='text-red-500'>{error.photo}</p>
                                    </div>
                                }
                                <label className='text-start font-bold  '>Password</label>


                                <input

                                    type="password"
                                    name="password"
                                    className="w-full input-bordered input placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200 p-1 h-12"

                                />

                                {
                                    error && error?.password && <div>
                                        <p className='text-red-500'>{error.password}</p>
                                    </div>
                                }
                                <Button type='submit' size="lg" variant='outlined' className='flex h-12 border-gray-600 bg-gray-600 text-white items-center justify-center gap-2'>
                                    Register
                                </Button>
                            </form>
                            <div className='divider'>or</div>
                            <Button onClick={handleGoogleLogin}
                                variant="outlined"
                                size="lg"
                                className="flex h-12  dark:text-white border-blue-gray-200 items-center justify-center gap-2"
                                fullWidth
                            >
                                <img
                                    src={`https://www.material-tailwind.com/logos/logo-google.png`}
                                    alt="google"
                                    className="h-6 w-6"
                                />{" "}
                                sign in with google
                            </Button>

                            <p>Already have an Account? <Link className='link-hover text-blue-700' to={'/login'}>Login</Link></p>
                            {
                                error && error?.error && Swal.fire({
                                    title: error.error,
                                    icon: "error",
                                    draggable: true,
                                })
                            }

                        </CardBody>
                    </Card>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Register;