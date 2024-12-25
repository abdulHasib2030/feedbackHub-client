import React, { useContext, useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import { Rating } from 'react-simple-star-rating';
import { MdDelete, MdEdit } from "react-icons/md";
import { AuthContext } from '../provider/AuthProvider';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const MyReviews = () => {
    const [reviews, setReviews] = useState([])
    const [error, setError] = useState({})
    const { user } = useContext(AuthContext)
    const [selectedYear, setSelectedYear] = useState(new Date())
    const [rating, setRating] = useState(0)
    const [editData, setEditData] = useState()

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_URL}/my-reviews/?email=${user.email}`)
            .then(res => {
                // console.log(res.data);
                setReviews(res.data)
                setRating(res.data.rating)
                setRating(res.data.date)
            })
            .catch(err => console.log(err))
    }, [user.email])

    const dataload = (id) =>{
       const data = reviews.find(item => item._id === id)
       setEditData(data)
    }

    const handleUpdateReview = (e) => {
        e.preventDefault()
        const text = e.target.reviewtext.value;
        // console.log(text, selectedYear, rating);
        // setRating(editData.rating)
        if(!text){
            setError({text: "Required review text."})
            return
        }
        if(!selectedYear){
            setError({yearErr: "Choose a date"})
            return
        }
        if(rating === 0 ){
            setError({ratErr: "Choose a rating"})
            return
        }
       console.log(editData);
       
        const data = {text, selectedYear, rating: rating? rating:editData.rating, id:editData._id, email:user.email}
        console.log(data);
        axios.put(`${import.meta.env.VITE_URL}/update-review`, data)
        .then(res => {
            if(res.data.result.acknowledged){
                document.getElementById('my_modal_4').classList.add('hidden')
                toast.success("Successfully updated")
                setReviews(res.data.allReviw)          
            }
        })
        .catch(err => console.log(err))


    }

    const handleDeleteReview = (id) =>{
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
                axios.delete(`${import.meta.env.VITE_URL}/review/delete/${id}`)
                .then(res => {
                    if(res.data.acknowledged && res.data.deletedCount === 1){
                    const filterData =reviews.filter(item => item._id !== id)
                    setReviews(filterData)
                    

                    }
                })
                .catch(err => console.log(err))
            }
        })
    }

    console.log(reviews);

    return (
        <div>
            <Layout></Layout>


            {/* modal */}
            {/* You can open the modal using document.getElementById('ID').showModal() method */}

            <dialog id="my_modal_4" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <div className="max-w-xl mx-auto p-6 bg-white text-black shadow-md rounded-md border border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Update a Review</h2>
                        <form onSubmit={handleUpdateReview} className='text-start font-bold space-y-4'>
                            <div className="mb-4 text-start">
                                <label className="block text-sm font-medium text-gray-700">
                                    Your Review
                                </label>
                                <textarea

                                    rows="5"
                                    defaultValue={editData?.review_text}
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
                                        selected={selectedYear || editData?.date}
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
                                        ratingValue={rating===0 && editData?.rating}
                                        initialValue={editData?.rating}
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
                                Update Review
                            </button>
                        </form>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button, it will close the modal */}
                            <button className="btn">Cancel</button>
                        </form>
                    </div>
                </div>
            </dialog>


            <div className='my-10'>
                <h1 className='text-3xl font-bold  py-4'>Your Reviews</h1>
               
                {
                    reviews.map(item =>

                        <div className='border rounded-xl p-4 text-start  md:flex items-center justify-between mb-4'>
                            <div className='space-y-3'>
                                <h1 className='text-2xl font-bold'>{item.title}</h1>
                                <p>{item.review_text}</p>
                                <div className="rating-container">
                                    <Rating initialValue={item.rating} readonly showTooltip tooltipArray={['Terrible', 'Bad', 'Average', 'Great', 'Prefect']} size={20}></Rating>
                                </div>
                            </div>
                            <div className='text-3xl flex items-center gap-4 md:mt-0 mt-4'>

                                <MdEdit onClick={() => { document.getElementById('my_modal_4').showModal(), dataload(item._id) }} className='hover:text-gray-400 cursor-pointer' />
                                <MdDelete onClick={()=> handleDeleteReview(item._id)} className='hover:text-gray-400 cursor-pointer' />
                            </div>
                        </div>
                    )
                }

            </div>
        </div>
    );
};

export default MyReviews;