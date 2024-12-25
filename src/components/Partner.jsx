import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
const Partner = () => {
    const [partners, setPartners] = useState([])
     
    useEffect(()=>{
        axios.get(`./partner.json`)
        .then(res => setPartners(res.data))
        .catch(err => console.log(err))
    }, [])
    return (
        <div className='my-16'>
            <div className='flex justify-between my-5'>
                <h1 className='text-3xl font-bold  text-start'>Meet our partner</h1>
            </div>
            <div className='grid lg:grid-cols-4 grid-cols-1 md:grid-cols-2 gap-9'>
            {partners.map((partner, index) => (
                            <motion.div
                                key={index}
                                className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <img
                                    src={partner.logo_url}
                                    alt={`${partner.name} Logo`}
                                    className="w-24 h-24 object-contain mb-4"
                                />
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                    {partner.name}
                                </h3>
                                <p className="text-gray-600 text-sm text-justify">{partner.description}</p>
                            </motion.div>
                        ))}

            </div>
        </div>
    );
};

export default Partner;