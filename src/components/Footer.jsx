import React from 'react';
import { Typography } from "@material-tailwind/react";
import logo from '../assets/logo.png'
const Footer = () => {
    return (
        <div>
            <footer className="w-full bg-white p-8 mt-24 ">
                <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-white text-center md:justify-between">
                    <img src={logo} alt="logo-ct" className="w-36" />
                    
                    <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
                        <li>
                            <Typography
                                as="a"
                                href="#"
                                color="blue-gray"
                                className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                            >
                                About Us
                            </Typography>
                        </li>
                        <li>
                            <Typography
                                as="a"
                                href="#"
                                color="blue-gray"
                                className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                            >
                                License
                            </Typography>
                        </li>
                        <li>
                            <Typography
                                as="a"
                                href="#"
                                color="blue-gray"
                                className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                            >
                                Contribute
                            </Typography>
                        </li>
                        <li>
                            <Typography
                                as="a"
                                href="#"
                                color="blue-gray"
                                className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                            >
                                Contact Us
                            </Typography>
                        </li>
                    </ul>
                    <p className='text-justify'>Feedback Hub is your go-to platform for sharing and exploring service experiences. Join our community to add services, post reviews, and connect with others through authentic feedback. Built with a focus on user engagement, security, and seamless interaction, Feedback Hub empowers users to make informed decisions and manage their contributions effortlessly. Your voice matters – start 
                        reviewing today!</p>
                </div>
                <hr className="my-8 border-blue-gray-50" />
                <Typography color="blue-gray" className="text-center font-normal">
                    &copy; 2023 FeedbackHub
                </Typography>
            </footer>
        </div>
    );
};

export default Footer;