import React, { useContext, useState } from 'react';
import Layout from '../Layout/Layout';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import DatePicker from "react-datepicker";
import axios from 'axios';
import Swal from 'sweetalert2';
import "react-datepicker/dist/react-datepicker.css";

const AddServices = () => {

    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const [selectedYear, setSelectedYear] = useState(new Date());

    const [error, setError] = useState({})
    const [addCategory, setAddCategory] = useState('')
    const [category, setCategory] = useState([])

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


 console.log(category);
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
        if (!category) {
            return setError({ category: "The category field requires a non-empty value" })
        }
        if (!price) {
            return setError({ price: "The price field requires a non-empty value" })
        }

        else {
            setError({ imageURL: null })
        }
        const year = selectedYear

        const data = { imageURL, title, company_name, website, description, category, price, year, user: user.email }

        axios.post(`${import.meta.env.VITE_URL}/addService`, data)
            .then(res => {
                //    if(res.data.ac)
                if (res.data.acknowledged) {
                    Swal.fire({
                        title: "Successfully Added Service",
                        icon: "success",
                        draggable: true,
                    })
                    navigate('/my-services')
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

    const handleAddCategory = (e) => {
        e.preventDefault()
        console.log(e.target.category.value);

    }

    const showCategory = (bool) => {
        if (bool === true)
            document.getElementById('show-category').classList.remove('hidden')
        else
            document.getElementById('show-category').classList.add('hidden')

    }
    console.log(category);
    return (
        <div>
            <Layout></Layout>
            {/* add services form */}

            <section className="max-w-4xl p-6 mx-auto  rounded-md shadow-md my-10">
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
                            <select name='category' className="select block select-bordered w-full max-w-xs">
                                <option disabled selected>Choose category</option>
                                {
                                    category.map(item => 
                                        <option value={item}>{item}</option>
                                    )
                                }
                            </select>
                            {
                                error && error?.category && <p className='text-red-400'>
                                    {error.category}
                                </p>
                            }
                            <div className='hidden' id='show-category' >
                                <input type="text" onChange={(e) => setAddCategory(e.target.value)} placeholder="Enter category" className="block w-full py-2 px-4 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                <div>
                                    <button onClick={(() => showCategory(false))} className='px-6 py-2 border-2 my-2 mr-2'>Cancel </button>
                                    <button onClick={() => { setCategory([...category, addCategory]); showCategory(false) }} className='px-6 py-2 border-2 my-2'>Add </button>
                                </div>
                            </div>
                            <button onClick={() => showCategory(true)} className='px-6 py-2 rounded-lg border-2 mt-2'>Add Category</button>
                        </div>
                        <div>
                            <label className="" >Price</label>

                            <input type="text" name="price" placeholder="$500" className="block w-full py-2 px-4 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                            {
                                error && error?.price && <p className='text-red-400'>
                                    {error.price}
                                </p>
                            }
                        </div>

                        <div>
                            <label className="" for="passwordConfirmation">Added date</label> <br />
                            <div className=" w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                                <DatePicker className='text-gray-700 dark:bg-gray-800 dark:text-gray-300'
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
                        <button className=" py-3 leading-5 text-white w-full font-bold text-xl transition-colors duration-200 transform bg-gray-600 hover:bg-gray-400 hover:rounded-lg hover:border hover:border-black">Add service</button>
                    </div>
                </form>
            </section>

        </div>
    );
};

export default AddServices;