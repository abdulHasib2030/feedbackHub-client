import React, { useContext, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import Layout from '../Layout/Layout';
import { FaExternalLinkAlt, FaRegStar, FaStar } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from '../provider/AuthProvider';
import DatePicker from "react-datepicker";
import { Rating } from 'react-simple-star-rating'
import Swal from 'sweetalert2';
import axios from 'axios';
import toast from 'react-hot-toast';


const MyServiceDetails = () => {
    const { user , setCountReview} = useContext(AuthContext)
    const [rating, setRating] = useState(0);
    const [selectedYear, setSelectedYear] = useState(null);
    const [error, setError] = useState({})

    const { result, review } = useLoaderData()
    const [data, setData] = useState(review)
    const { title, imageURL, category, description, year, company_name, website, price, _id } = result;
    // let yearFormat = year = String(year.getDate()) + '/' + String(year.getMonth()) + '/' + String(year.getFullYear())
    const dateFormat = (data)=>{
     const date = new Date(String(data));

    // Extract day, month, and year
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year_ = date.getFullYear();
    
    // Format as DD/MM/YYYY
    const formattedDate = `${day}/${month}/${year_}`;   
    console.log(formattedDate, day, );
    return formattedDate
    }
    
    
    const handleReview = (e) => {
        e.preventDefault()
        // const reviewtext(e.target.reviewtext.value);
        if (!e.target.reviewtext.value) {
            setError({ text: "Required review text" })
            return;
        }

        if (!selectedYear) {
            setError({ yearErr: "Choose a date." })
            return
        }
        if (rating === 0) {
            setError({ ratErr: "choose a rating" })
            return
        }
        else {
            setError({ err: "Something wrong" })
        }
        // console.log(e.target.reviewtext.value, selectedYear, rating);
        const data = {
            review_text: e.target.reviewtext.value, date: selectedYear, rating: rating,
            userPhoto: user.photoURL, name: user.displayName, service_id: _id, email:user.email, title: title
        }
        document.getElementById('my_modal_4').classList.add('hidden')
        // console.log(data);
        axios.post(`${import.meta.env.VITE_URL}/add-review`, data)
            .then(res => {
                // console.log(res.data.result);
                // setData(res.data.allReviw)
                setCountReview(res.data.lenReview)
                location.reload()
            
                    toast.success("Successfully added your review.")
                    
            
            })
            .catch(err => {
                console.log(err.message);
            })

    }
    console.log(data.length);
    
    return (
        <div>
            <Layout />
            <div className='my-10 gap-6 md:flex justify-evenly border py-5'>
                <div className='flex gap-4 items-center '>
                    <img src={imageURL} alt="" className='w-32' />

                    <div className='text-start space-y-4'>
                        <h1 className='text-3xl  mt-6 font-bold'>{title}</h1>
                        <p className='text-gray-400 text-xl'>Reviews {review.length}</p>

                        <p>In the <span className='font-bold'>{category}</span> category</p>

                    </div>
                </div>
                <div className='mt-5 md:mt-0'>
                    <p className='border text-start border-blue-500 p-3'>
                        <Link to={website} className=' font-bold flex text-xl items-center gap-2'><FaExternalLinkAlt /> {website}</Link>
                        Visit this website</p>
                </div>
            </div>


            {/* add a review */}
            {/* modal */}
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_4" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <div className="max-w-xl mx-auto p-6 bg-white text-black shadow-md rounded-md border border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Write a Review</h2>
                        <form onSubmit={handleReview} className='text-start font-bold space-y-4'>
                            <div className="mb-4 text-start">
                                <label className="block text-sm font-medium text-gray-700">
                                    Your Review
                                </label>
                                <textarea

                                    rows="5"
                                    className="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Write your review here..."
                                    name='reviewtext'
                                ></textarea>
                                {
                                    error?.text && <p className='text-red-600'>{error.text}</p>
                                }
                            </div>

                            <div>
                                <label className=" text-start" for="passwordConfirmation">Select Date</label> <br />
                                <div className=" w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                                    <DatePicker className='text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                                        selected={selectedYear}
                                        onChange={(date) => setSelectedYear(date)}
                                        // showYearPicker

                                        placeholderText="Select a Date"
                                        name='dateData'
                                    />

                                </div>
                                {
                                    error?.yearErr && <p className='text-red-600'>{error.yearErr}</p>
                                }

                            </div>


                            <div>
                                <label className="" > Give Your Rating</label>
                                <div className="rating-container">
                                    <Rating onClick={(rate) => setRating(rate)}
                                        ratingValue={rating}
                                        showTooltip
                                        tooltipArray={['Terrible', 'Bad', 'Average', 'Great', 'Prefect']}
                                    ></Rating>
                                    {
                                        error?.ratErr && <p className='text-red-600'>{error.ratErr}</p>
                                    }
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Add Review
                            </button>
                        </form>
                    </div>
                    <div className="modal-action">

                        <form method="dialog">
                            {/* if there is a button, it will close the modal */}
                            <button className="btn bg-gray-400 font-bold">Cancel</button>
                        </form>
                    </div>
                </div>
            </dialog>

            <div className='my-3'>
                <button onClick={() => document.getElementById('my_modal_4').showModal()} className='py-3 font-bold bg-black w-full text-white hover:rounded-xl hover:bg-gray-500 hover:border hover:border-black '>Add review</button>
            </div>

            <div className='grid md:grid-cols-12 gap-7'>
                {/* review technique */}

                <div className='md:col-span-8  md:order-1 order-2 '>
                    {
                        data.map(item =>
                            <div className='border rounded-xl p-4 mb-4'>


                                <div className='flex items-center gap-2 '>
                                    <div className="avatar">
                                        <div className="w-12 rounded-full">
                                            <img src={item.userPhoto} srcSet='' />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className='font-bold'>{item.name}</h4>
                                    </div>
                                </div>

                                <div className='divider  '></div>
                                <div className='text-start space-y-3'>
                                <div className="rating-container">
                                <Rating initialValue={item.rating} readonly showTooltip tooltipArray={['Terrible', 'Bad', 'Average', 'Great', 'Prefect']} size={20}></Rating>
                                   
                                </div>
                                    <p className='text-justify'>
                                        {item.review_text}
{
    item.rating
}
                                    </p>
                                    <h4 className='font-bold'>Date or experience: <span className='font-normal'>{dateFormat(item.date)}</span></h4>
                                </div>

                            </div>
                        )
                    }
                </div>



                <div className='md:col-span-4   md:order-2  ' >
                   <div className='space-y-2 border rounded-xl mb-4 p-4  md:mt-0 text-start '>
                   <h4 className='font-bold '>Company name: <span className='font-normal'>{company_name}</span>
                    </h4>
                    <h4 className='font-bold '>Price: <span className='font-normal'>$ {price}</span>
                    </h4>
                    <h4 className='font-bold '>Added Date: <span className='font-normal'>{dateFormat(year)}</span>
                    </h4>
                    <h4 className='font-bold '>Description: <span className='font-normal'>{description}</span>
                    </h4>
                   </div>

                </div>
            </div>
        </div>
    );
};

export default MyServiceDetails;