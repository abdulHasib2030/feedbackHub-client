import React from 'react';
import { Link } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';

const RecentReview = () => {
    return (
        <div className='my-16'>
            <div className='flex justify-between my-5'>
                <h1 className='text-3xl font-bold  text-start'>Recent reviews</h1>
                <Link to={'/services'} className='rounded-full border-2 cursor-pointer border-blue-600 text-blue-600 font-bold px-2 py-1'>See more</Link>
            </div>
            <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5'>
                <div className='border rounded-lg p-4 text-start'>
                    <div className='flex items-center gap-2'>
                        <img src="https://i.ibb.co.com/vYhC5Rh/Frame-2.png" className='w-10 rounded-full border-2' alt="" />
                        <div>
                            <h4 className='font-bold'>Jamic Farrell</h4>
                            <div className="rating-container">
                                <Rating initialValue={3} readonly  size={20}></Rating>
                            </div>
                        </div>
                    </div>
                    <p className=''>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure delectus placeat voluptatem temporibus illum! Vitae natus nesciunt quaerat aut neque saepe consequatur, 
                        asperiores, delectus error esse fugit nulla? Minima, velit.</p>
                    <div className='divider'></div>
                    <div className='flex items-center gap-2'>
                        <img src="https://i.ibb.co.com/vYhC5Rh/Frame-2.png" className='w-16' alt="" />
                        <div>
                            <h4 className='font-bold'>Virgin Media</h4>
                            <p className='text-gray-400 font-semibold'>www.google.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecentReview;