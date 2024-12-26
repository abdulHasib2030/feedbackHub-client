import React from 'react';
import { Link } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';

const RecentReview = ({data}) => {
    return (
        <div className='my-16'>
            <div className='flex justify-between my-5'>
                <h1 className='text-3xl font-bold  text-start'>Recent reviews</h1>
            </div>
            <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5'>
                {
                    data.slice(0,8).map(item => 

                        <div className='border rounded-lg p-4 text-start'>
                    <div className='flex items-center gap-2'>
                        <img src={item.userPhoto} className='w-12 rounded-full ' alt="" />
                        <div>
                            <h4 className='font-bold'>{item.name}</h4>
                            <div className="rating-container">
                                <Rating initialValue={item.rating} readonly  size={20}></Rating>
                            </div>
                        </div>
                    </div>
                    <p className=''>{item.review_text}</p>
                    <div className='divider'></div>
                    <div className='flex items-center gap-2'>
                        <img src={item?.service_logo} className='w-12' alt="" />
                        <div>
                            <h4 className='font-bold'>{item?.service_name}</h4>
                            <p className='text-gray-400 font-semibold'>{item?.service_website}</p>
                        </div>
                    </div>
                </div>
                    )
                }
            </div>
        </div>
    );
};

export default RecentReview;