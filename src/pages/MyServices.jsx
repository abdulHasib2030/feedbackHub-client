import { useContext, useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useLoaderData } from "react-router-dom";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../hooks/useAxiosSecure";


const MyServices = () => {
    const { user ,  setCountReview,setCountService,} = useContext(AuthContext)
    const [error, setError] = useState({})
    const [selectedYear, setSelectedYear] = useState(null)
    const [singleItem, setSingleItem] = useState()
    const [search, setSearch] = useState("")
    const {result, lenReview, lenService} = useLoaderData()
    const [myService, setMyServices] = useState(result)

    const axiosSecure = useAxiosSecure()
   setCountReview(lenReview)
   setCountService(lenService)


   


    useEffect(() => {
        fetch(`${import.meta.env.VITE_URL}/myServices/${user.email}?searchParams=${search}`)
            .then((res) => res.json())
            .then((searchData) => {
                setMyServices(searchData.result)
          
            })

    }, [search]);

    const handleUpdateService = (e) => {
        e.preventDefault()
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
        const year = selectedYear ? selectedYear : singleItem?.year

        const data = { imageURL, title, company_name, website, description, category, price, year, user: user.email, service_id: singleItem?._id }

        // axios.patch(`${import.meta.env.VITE_URL}/update-service`, data)
        //     .then(res => {

        //         if (res.data.result.acknowledged) {
        //             document.getElementById('closeModal').click()
        //             setSelectedYear(null)
        //             setMyServices(res.data.allService)
        //             toast.success("Successfully updated service.")


        //         }
        //     })
        //     .catch(err => {

        //     })

        axiosSecure.patch(`/update-service?email=${user.email}`, data)
            .then(res => {

                if (res.data.result.acknowledged) {
                    document.getElementById('closeModal').click()
                    setSelectedYear(null)
                    setMyServices(res.data.allService)
                    toast.success("Successfully updated service.")


                }
            })
            .catch(err => {

            })
    }

    const dataload = (id) => {
        const singleData = myService.find(item => item._id === id)

        setSingleItem(singleData)
    }

    const handleDeleteService = (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {


                axiosSecure.delete(`/service/delete/${id}?email=${user.email}`)
                    .then(res => {
                        const filterData = myService.filter(item => item._id !== id)
                        toast.success("Successfully deleted service.")
                        setMyServices(filterData)
                    })
                    .then(err => {

                    })
            }
        })


    }

    return (
        <div className="mt-20 text-black dark:text-white">
            <Helmet title='My Services | FeedbackHub' />

            <Layout />


            {/* modal */}
            {/* You can open the modal using document.getElementById('ID').showModal() method */}

            <dialog id="my_modal_4" className="modal ">
                <div className="modal-box w-11/12 max-w-5xl dark:text-white text-black bg-white dark:bg-gray-900">
                    <div>
                        <h1 className="font-bold text-3xl text-center text-white">Update Service</h1>
                        <form method='post' onSubmit={handleUpdateService}>
                            <div className="grid grid-cols-1 text-start font-semibold gap-6 mt-7 sm:grid-cols-2">
                                <div>
                                    <label className="" >Service ImageURL</label>
                                    <input name='imageURL' type="url" defaultValue={singleItem?.imageURL && singleItem.imageURL} placeholder='e.g https://example.jpg' className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                    {
                                        error && error?.imageURL && <p className='text-red-400'>
                                            {error.imageURL}
                                        </p>
                                    }
                                </div>

                                <div>
                                    <label className="" >Service Title</label>
                                    <input type="text" name='title' defaultValue={singleItem?.title && singleItem.title} placeholder='Enter service title' className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                    {
                                        error && error?.title && <p className='text-red-400'>
                                            {error.title}
                                        </p>
                                    }
                                </div>
                                <div>
                                    <label className="">Company Name</label>
                                    <input type="text" name='company_name' defaultValue={singleItem?.company_name && singleItem.company_name} placeholder='Enter company name' className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />

                                    {
                                        error && error?.company_name && <p className='text-red-400'>
                                            {error.company_name}
                                        </p>
                                    }
                                </div>


                                <div>
                                    <label className="" >Website</label>

                                    <input type="text" name="website" defaultValue={singleItem?.website && singleItem.website} placeholder="google.com" className="block w-full py-2 px-4 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                    {
                                        error && error?.website && <p className='text-red-400'>
                                            {error.website}
                                        </p>
                                    }
                                </div>
                                <div className='col-span-2'>
                                    <label className="" >Description</label>

                                    <textarea type="text" name="description" placeholder="type..." defaultValue={singleItem?.description && singleItem.description} className="block w-full py-2 px-4 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" rows={5} ></textarea>
                                    {
                                        error && error?.description && <p className='text-red-400'>
                                            {error.description}
                                        </p>
                                    }
                                </div>
                                <div>
                                    <label className="" >Category</label>

                                    <select name='category' className="select block select-bordered w-full max-w-xs bg-white dark:bg-gray-900">
                                        <option disabled selected>Choose category</option>
                                        {
                                            singleItem?.category_slug === 'home-cleaning' ?
                                                <option selected value="home-cleaning">Home Cleaning</option> :
                                                <option value="home-cleaning">Home Cleaning</option>
                                        }
                                        {
                                            singleItem?.category_slug === 'electronics-repair' ?
                                                <option selected value="electronics-repair">Electronics Repair</option>
                                                : <option value="electronics-repair">Electronics Repair</option>

                                        }
                                        {
                                            singleItem?.category_slug === 'Catering Services' ?
                                                <option selected value="catering-services">Catering Services</option>
                                                : <option value="catering-services">Catering Services</option>

                                        }

                                        {
                                            singleItem?.category_slug === 'moving-relocation' ?
                                                <option selected value="moving-relocation">Moving & Relocation</option>
                                                : <option value="moving-relocation">Moving & Relocation</option>

                                        }
                                        {
                                            singleItem?.category_slug === 'fitness-training' ?
                                                <option selected value="fitness-training">Fitness Training</option>
                                                : <option value="fitness-training">Fitness Training</option>
                                        }
                                    </select>
                                    {
                                        error && error?.category && <p className='text-red-400'>
                                            {error.category}
                                        </p>
                                    }
                                </div>
                                <div>
                                    <label className="" >Price</label>

                                    <input type="text" defaultValue={singleItem?.price && singleItem.price} name="price" placeholder="$500" className="block w-full py-2 px-4 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                    {
                                        error && error?.price && <p className='text-red-400'>
                                            {error.price}
                                        </p>
                                    }
                                </div>

                                <div>
                                    <label className="" for="passwordConfirmation">Added date</label> <br />
                                    <div className=" w-full px-4 py-2 mt-2 text-white bg-white border dark:bg-gray-900 border-gray-300 rounded-md  dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                                        <DatePicker className='bg-white text-black dark:bg-gray-900 dark:text-white'
                                            selected={!selectedYear ? singleItem?.year : selectedYear}
                                            onChange={(date) => setSelectedYear(date)}
                                            
                                            placeholderText="Select a date"



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
                                <button className="w-full px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Update service</button>
                            </div>
                        </form>
                    </div>

                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button, it will close the modal */}
                            <button id="closeModal" className="btn">Cancel</button>
                        </form>
                    </div>
                </div>
            </dialog>


            <div className="container mx-auto py-4" >
                <div className="overflow-x-auto my-10 border p-6 dark:border-gray-600 rounded-xl">
                <h1 className="text-center text-3xl font-bold">My Services</h1>
                <div className="my-5 w-full md:w-1/2">
                    <label className="input input-bordered flex mt-4 p-2 bg-white dark:bg-gray-900 items-center gap-2">

                        <input type="text" placeholder="Search title company name & category" onChange={(e) => setSearch(e.target.value)} value={search} className="grow" />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                fillRule="evenodd"
                                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                clipRule="evenodd" />
                        </svg>
                    </label>
                </div>
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>

                            <th>Service Info</th>
                            <th>Update</th>
                            <th>Delete</th>

                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            myService.map(item => <tr key={item._id}>

                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={item.imageURL}
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{item.title}</div>
                                            <div className="text-sm opacity-50">Company name: {item.company_name}, Category: {item.category}, Price: {item.price}</div>
                                        </div>

                                    </div>
                                </td>
                                <td>
                                    <p onClick={() => {
                                        document.getElementById('my_modal_4').showModal();
                                        dataload(item._id);
                                    }} className="cursor-pointer text-yellow-600 font-bold">Edit</p>
                                </td>
                                <td>
                                    <p onClick={() => handleDeleteService(item._id)} className="cursor-pointer text-red-600 font-bold">Delete</p>
                                </td>

                            </tr>)
                        }

                    </tbody>

                </table>
                </div>
            
            
            </div>

            <Footer />
        </div>
    );
};

export default MyServices;