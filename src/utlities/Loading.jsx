import React from 'react';

import loading2 from '../assets/loading2.json';
import Lottie from 'lottie-react';
const Loading = () => {
    return (
        <div>
            <div className='min-h-screen flex items-center justify-center'>
                <Lottie animationData={loading2}></Lottie>
            </div>
        </div>
    );
};

export default Loading;