import React from 'react';
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import { motion } from "motion/react"

const MostReviewService = ({data}) => {
    return (
            <div className='my-16'> 
               <div className='flex justify-between my-5' id='most-service'>
                   <h1 className='text-3xl font-bold  text-start'>Most Review Service</h1>
               </div>
               <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-9'>
                   {
                       data.slice(0, 6).map((item , index)=>  
                     <motion.div  key={index}
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.5, delay: index * 0.1 }}
                     >
                         <Card className="border mt-4 ">
                       <CardBody while>
                          <img src={item.img} alt="" className='w-full h-96'/>
                           <Typography variant="h5" color="blue-gray" className="mb-2 text-3xl text-black">
                               {item.title}
                           </Typography>
                           <Typography>
                              {item.description}
                           </Typography>
                           <Typography>
                              Price: ${item.price}
                           </Typography>

                       </CardBody>
                       <p>Total Review: {item.total_review}</p>
                       <CardFooter className="pt-0">
                           <Link to={`/service-details/${item.id}`} className="inline-block">
                               <Button size="sm" variant="text" className="flex items-center gap-2">
                                  see details
                                   <svg
                                       xmlns="http://www.w3.org/2000/svg"
                                       fill="none"
                                       viewBox="0 0 24 24"
                                       strokeWidth={2}
                                       stroke="currentColor"
                                       className="h-4 w-4"
                                   >
                                       <path
                                           strokeLinecap="round"
                                           strokeLinejoin="round"
                                           d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                       />
                                   </svg>
                               </Button>
                           </Link>
                       </CardFooter>
                   </Card>
                     </motion.div>
       
               )
           }
         
                  
               </div>
               </div>
    );
};

export default MostReviewService;