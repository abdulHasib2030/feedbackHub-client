import React, { useContext, useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";
import { Link, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import axios from 'axios';

const MyServices = () => {
    const {user} = useContext(AuthContext)
    const Service = useLoaderData()
  
    return (
        <div>
            <Layout />
            <div className='my-10'>
                <h1 className='text-center text-3xl font-bold'>All Services</h1>
            <div className='grid  md:grid-cols-2 grid-cols-1 gap-5 mt-7'>
            {
                Service.map(item =>

                    <Card key={item._id} className="w-full  flex-row">
                    <CardHeader
                        shadow={false}
                        floated={false}
                        className="m-0 w-2/5 shrink-0 rounded-r-none"
                    >
                        <img
                            src={item.imageURL}
                            alt="card-image"
                            className="h-full w-full object-cover"
                        />
                    </CardHeader>
                    <CardBody className='text-start'>
                        <Typography variant="h6" color="gray" className="mb-4 font-bold text-xl">
                           Title: {item.title}
                        </Typography>
                        <Typography variant="h4" color="blue-gray" className="mb-2">
                           Category: {item.category}
                        </Typography>
                        <Typography color="gray" className="mb-8 font-normal">
                          Description: {item.description}
                        </Typography>
                        <Typography color="gray" className="mb-8 font-normal">
                         Price:  {item.price}
                        </Typography>
                        <a href="#" className="inline-block">
                            <Button variant="text" className="flex items-center gap-2">
                               <Link to={`/service-details/${item._id}`} className='link link-primary'> View Details</Link>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    className="h-4 w-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                    />
                                </svg>
                            </Button>
                        </a>
                    </CardBody>
                </Card>
                )
            }
            </div>
            </div>
        </div>
    );
};

export default MyServices;