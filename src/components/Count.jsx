import React, { useContext } from 'react';
import CountUp from 'react-countup';
import { AuthContext } from '../provider/AuthProvider';

const Count = () => {
    const { countReview, setCountReview,
        countService, setCountService, } = useContext(AuthContext)
    return (
        <div className='my-16'>
            <div
                className="bg-cover bg-center py-10 "
                style={{
                    backgroundImage: "url('https://i.ibb.co.com/DKn032f/towfiqu-barbhuiya-0-ZUo-Bt-Lw3y4-unsplash.jpg')",
                }}
            >
                <div className=" mx-auto flex justify-evenly gap-10 w-full  ">

                    <div

                        className="flex flex-col items-center bg-white bg-opacity-70 rounded-lg p-4 "
                    >
                        <div className="font-bold text-4xl mb-2">Total Service </div>
                        <CountUp
                            start={0}
                            end={countService}
                            duration={5}
                            className="text-3xl font-bold text-gray-800"
                        />
                        <p className="text-gray-600 mt-2"></p>
                    </div>
                    
                    <div

                        className="flex flex-col items-center bg-white bg-opacity-70 rounded-lg p-4 "
                    >
                        <div className="font-bold text-4xl mb-2">Total Review</div>
                        <CountUp
                            start={0}
                            end={countReview}
                            duration={5}
                            className="text-3xl font-bold text-gray-800"
                        />
                        <p className="text-gray-600 mt-2"></p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Count;