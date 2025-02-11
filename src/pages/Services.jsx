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
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';

import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
const MyServices = () => {
    const { user, setCountReview, setCountService } = useContext(AuthContext)
    const { result, lenReview } = useLoaderData()
    const [data, setData] = useState(result)
    const [order, setOrder] = useState(false)
    setCountReview(lenReview)
    setCountService(result.length)

    const handleFilter = (slug) => {


        axios.get(`${import.meta.env.VITE_URL}/service/${slug}`)
            .then(res => setData(res.data))

    }

    const handleAscenDescenOrder = () =>{
      order ? setOrder(false) : setOrder(true)

      if(order){
        const tempData = data.sort((a, b) => a._id.localeCompare(b._id));
        console.log(tempData);
      }
      else{
        const tempdata = data.sort((a, b) => b._id.localeCompare(a._id));
        console.log(tempdata);
      }
    }

    return (
        <div>
            < Helmet title='Services | FeedbackHub' />

            <Layout />
            <div className='my-10 mt-20 container mx-auto'>
                <h1 className='text-center text-3xl font-bold pt-10'>All Services</h1>

               
                <div className='flex justify-between items-center'>
                <div className="dropdown dropdown-hover flex justify-start z-50 mt-5">
                    <div tabIndex={0} role="button" className="btn bg-white dark:bg-gray-900 dark:text-white text-black">Filter by Category</div>
                    <ul tabIndex={0} className="dropdown-content menu bg-white dark:bg-gray-900 dark:text-white text-black z-[1] w-52 p-2 shadow">
                        <li onClick={() => handleFilter('home-cleaning')} className='hover:bg-gray-400' ><a>Home Cleaning</a></li>
                        <li onClick={() => handleFilter('electronics-repair')} className='hover:bg-gray-400'><a>Electronics Repair</a></li>
                        <li onClick={() => handleFilter('catering-services')} className='hover:bg-gray-400'><a>Catering Services</a></li>
                        <li onClick={() => handleFilter('moving-relocation')} className='hover:bg-gray-400'><a>Moving & Relocation</a></li>
                        <li onClick={() => handleFilter('fitness-training')} className='hover:bg-gray-400'><a>Fitness Training</a></li>
                    </ul>
                </div>
                    <div>
                        <div className="max-w-md">
                          
                          <div className='text-black dark:text-white border p-2 rounded-xl cursor-pointer' onClick={handleAscenDescenOrder}>
                            {
                                order ?  <p className='flex items-center '>Sort by ascending <FaSortUp className='mt-2' /></p>:
                            <p className='flex items-center '>Sort by descending <FaSortDown /></p>
                            }
                           
                          </div>
                            {/* <Select name='order' onClick={handleAscenDescenOrder} id="countries" >
                                <option  disabled>Sort</option>
                                <option >Sort by ascending</option>
                                <option ></option>
                            </Select> */}
                        </div>
                    </div>
                </div>


                <div className='grid  md:grid-cols-2 grid-cols-1 gap-9 mt-7'>
                    {
                        data?.length !== 0 ?
                            data?.map(item =>

                                <Card key={item._id} className="w-full  flex lg:flex-row dark:bg-gray-900 dark:text-white border dark:border-gray-600">
                                    <CardHeader
                                        shadow={false}
                                        floated={false}
                                        className="m-0 lg:w-2/5 h-72 lg:h-full  shrink-0 rounded-r-none"
                                    >
                                        <img
                                            src={item.imageURL}
                                            alt="card-image"
                                            className="h-full w-full object-cover"
                                        />
                                    </CardHeader>
                                    <CardBody className='text-start'>
                                        <Typography variant="h6" color="gray" className="mb-4 dark:text-white font-bold text-xl">
                                            Title: {item.title}
                                        </Typography>
                                        <Typography variant="h4" color="blue-gray" className="mb-2">
                                            Category: {item.category}
                                        </Typography>
                                        <Typography color="gray" className="dark:text-white font-normal">
                                            Description: {item.description.slice(0, 100)}...
                                        </Typography>
                                        <Typography color="gray" className="dark:text-white mt-2 font-normal">
                                            Price:  {item.price}
                                        </Typography>
                                        <Typography color="gray" className="dark:text-white font-normal">

                                            <Button variant="text" className="flex items-center gap-2 dark:text-white p-0 pt-4">
                                                <Link to={`/service-details/${item._id}`} className='link link-primary'>See Details</Link>
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

                                        </Typography>

                                    </CardBody>
                                </Card>
                            )
                            :
                            <div className='md:col-span-2'>
                                <h1 className='my-5 text-3xl font-bold '>No service found matching your filter criteria. Please try again with different parameters.</h1>
                            </div>
                    }
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default MyServices;