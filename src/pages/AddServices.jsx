import React, { useContext, useState } from 'react';
import Layout from '../Layout/Layout';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import DatePicker from "react-datepicker";
import axios from 'axios';
import Swal from 'sweetalert2';
import "react-datepicker/dist/react-datepicker.css";
import toast from 'react-hot-toast';
import Footer from '../components/Footer';
import { Helmet } from "react-helmet-async";
import useAxiosSecure from '../hooks/useAxiosSecure';

const AddServices = () => {

    const navigate = useNavigate()
    const { user, setCountService, setCountReview,} = useContext(AuthContext)
    const [selectedYear, setSelectedYear] = useState(new Date());

    const [error, setError] = useState({})
    // const [addCategory, setAddCategory] = useState('')
    const [category, setCategory] = useState([])
    const axiosSecure = useAxiosSecure()
    const {lenService, lenReview} = useLoaderData()
    setCountReview(lenReview)
    setCountService(lenService)

    const handleAddService = (e) => {
        e.preventDefault();
        const form = e.target;
        const imageURL = form.imageURL.value;
        const title = form.title.value;
        const company_name = form.company_name.value;
        const website = form.website.value;
        const description = form.description.value;
        const category = form.category.value;
        const price = form.price.value;

        

        if (!imageURL) return setError({ imageURL: "Provide a image url" })
        if (!title || title.length < 2) {
            return setError({ title: "The title must be at least 2 characters long." })
        }
        if (!company_name) {
            return setError({ company_name: "The company name field requires a non-empty value" })
        }
        if (!website) {
            return setError({ website: "The website field requires a non-empty value" })
        }
        if (!description) {
            return setError({ description: "The description field requires a non-empty value" })
        }
        if (!category || category === 'Choose category') {
            return setError({ category: "The category field requires a non-empty value" })
        }
        if (!price) {
            return setError({ price: "The price field requires a non-empty value" })
        }

        else {
            setError({ imageURL: null })
        }

        let cat = category.split('-').join(' ')
        cat = (cat.charAt(0).toUpperCase() + cat.slice(1));
        const year = selectedYear

        const data = { imageURL, title, company_name, website, description, category: cat, category_slug: category, price, year, user: user.email }

        // axios.post(`${import.meta.env.VITE_URL}/addService`, data)
        //     .then(res => {
        //         //    if(res.data.ac)
        //         if (res.data.result.acknowledged) {
        //             setCountService(res.data.lenService)
        //             toast.success('Successfully Added Service')
        //             navigate(`/my-services/${user.email}`)
        //         }
        //     })
        //     .catch(err => {
        //         Swal.fire({
        //             title: err.message,
        //             icon: "error",
        //             draggable: true,
        //         })
        //     })

        axiosSecure.post(`/addService?email=${user.email}`, data)
            .then(res => {
                //    if(res.data.ac)
                if (res.data.result.acknowledged) {
                    setCountService(res.data.lenService)
                    toast.success('Successfully Added Service')
                    navigate(`/my-services/${user.email}`)
                }
            })
            .catch(err => {
                Swal.fire({
                    title: err.message,
                    icon: "error",
                    draggable: true,
                })
            })
    }



    return (
        <div className='mt-20'>
            <Helmet
                title="Add Service | FeedbackHub" />

            <Layout></Layout>
            {/* add services form */}

            <section className="container   mx-auto  py-16 text-black dark:text-white ">
                <div className='rounded-md border dark:border-gray-600 p-6'>

            
                <h1 className="text-2xl font-bold  capitalize ">Add Your Service </h1>
                <form method='post' onSubmit={handleAddService}>
                    <div className="grid grid-cols-1 text-start font-semibold gap-6 mt-7 sm:grid-cols-2">
                        <div>
                            <label className="" >Service ImageURL</label>
                            <input name='imageURL' type="url" placeholder='e.g https://example.jpg' className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                            {
                                error && error?.imageURL && <p className='text-red-400'>
                                    {error.imageURL}
                                </p>
                            }
                        </div>

                        <div>
                            <label className="" >Service Title</label>
                            <input type="text" name='title' placeholder='Enter service title' className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                            {
                                error && error?.title && <p className='text-red-400'>
                                    {error.title}
                                </p>
                            }
                        </div>
                        <div>
                            <label className="">Company Name</label>
                            <input type="text" name='company_name' placeholder='Enter company name' className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />

                            {
                                error && error?.company_name && <p className='text-red-400'>
                                    {error.company_name}
                                </p>
                            }
                        </div>


                        <div>
                            <label className="" >Website</label>

                            <input type="text" name="website" placeholder="google.com" className="block w-full py-2 px-4 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                            {
                                error && error?.website && <p className='text-red-400'>
                                    {error.website}
                                </p>
                            }
                        </div>
                        <div className='col-span-2'>
                            <label className="" >Description</label>

                            <textarea type="text" name="description" placeholder="type..." className="block w-full py-2 px-4 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" rows={5} ></textarea>
                            {
                                error && error?.description && <p className='text-red-400'>
                                    {error.description}
                                </p>
                            }
                        </div>
                        <div>
                            <label className="" >Category</label>
                            <select name='category' className="select block select-bordered w-full max-w-xs bg-white dark:bg-[#1F2937]">
                                <option disabled selected>Choose category</option>
                                <option value="home-cleaning">Home Cleaning</option>
                                <option value="electronics-repair">Electronics Repair</option>
                                <option value="catering-services">Catering Services</option>
                                <option value="moving-relocation">Moving & Relocation</option>
                                <option value="fitness-training">Fitness Training</option>
                            </select>
                            {
                                error && error?.category && <p className='text-red-400'>
                                    {error.category}
                                </p>
                            }

                        </div>
                        <div>
                            <label className="" >Price</label>

                            <input type="number" name="price" placeholder="$500" className="block w-full py-2 px-4 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                            {
                                error && error?.price && <p className='text-red-400'>
                                    {error.price}
                                </p>
                            }
                        </div>

                        <div>
                            <label className="" for="passwordConfirmation">Added date</label> <br />
                            <div className=" w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                                <DatePicker className='text-gray-700 dark:bg-gray-800 dark:text-gray-300 bg-white '
                                    selected={selectedYear}
                                    onChange={(date) => setSelectedYear(date)}
                                    // showYearPicker
                                    // dateFormat="yyyy-day-month"
                                    placeholderText="Select a date"
                                    name='dateData'


                                />

                            </div>
                            {
                                error && error?.year && <p className='text-red-400'>
                                    {error.year}
                                </p>
                            }
                        </div>







                    </div>

                    <div className="flex justify-start mt-6">
                        <button className='group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md  bg-gradient-to-r dark:from-[#070e41] dark:to-[#263381] from-[#f6f7ff] to-[#f5f6ff] dark:border-[rgb(76_100_255)] border-2 border-[#263381]  bg-transparent px-6 font-medium dark:text-white text-black transition-all duration-100 hover:[box-shadow:5px_5px_rgb(38_51_129)] translate-x-[3px] hover:translate-x-[0px] translate-y-[3px] hover:translate-y-[0px]   [box-shadow:0px_0px_rgb(38_51_129)] dark:hover:[box-shadow:5px_5px_rgb(76_100_255)]dark:active:[box-shadow:0px_0px_rgb(76_100_255)] active:[box-shadow:0px_0px_rgb(38_51_129)] w-full active:translate-y-[3px] active:translate-x-[3px]'>Add service</button>
                    </div>
                </form>    
                </div>
            </section>

            <Footer></Footer>
        </div>
    );
};

export default AddServices;