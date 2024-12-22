import React from 'react';
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
import { Link } from 'react-router-dom';


const Login = () => {
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
                                action="#"
                                className="flex flex-col gap-4 md:mt-12"
                            >
                             <label className='text-start font-bold  '>Gmail</label>
                                        
                                    <Input
                                        id="email"
                                        color="gray"
                                        size="lg"
                                        type="email"
                                        name="email"
                                        placeholder="example@mail.com"
                                        className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200 p-1 h-12"
                                        labelProps={{
                                            className: "hidden",
                                        }}
                                    />
                                    <label className='text-start font-bold  '>Password</label>
                         
                                          
                                    <Input
                                        id="email"
                                        color="gray"
                                        size="lg"
                                        type="password"
                                        name="password"
                                        className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200 p-1 h-12"
                                        labelProps={{
                                            className: "hidden",
                                        }}
                                    />
                          
                                <Button size="lg" variant='outlined' className='flex h-12 border-gray-600 bg-gray-600 text-white items-center justify-center gap-2'>
                                    Login
                                </Button>
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
                            
                            </form>
                        </CardBody>
                    </Card>
                </div>
            </section>
        </div>
    );
};

export default Login;