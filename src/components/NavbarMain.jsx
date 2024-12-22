import React, { useState } from 'react';
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
} from "@material-tailwind/react";
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom';

const NavbarMain = () => {

  const [openNav, setOpenNav] = React.useState(false);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);
 
  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Pages
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Account
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Blocks
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Docs
        </a>
      </Typography>
    </ul>
  );

  return (
    <div className="-mt-6 ">
    <Navbar className="sticky top-0 z-10 border-none h-max  rounded-none px-4 py-2 lg:px-8 lg:py-4 ">
      <div className="flex items-center justify-between text-black">
        <Typography
          as="a"
          href="#"
          className="text-4xl flex items-center font-bold cursor-pointer py-1.5 "
        >
          <Link to={'/'}>
          <img src={logo} alt="" className='md:w-28 w-20' />
         </Link>
        </Typography>
        <div className="flex items-center gap-4">
          <div className="mr-4 hidden lg:block">{navList}</div>
          <div className="flex items-center gap-x-1">
            <Button
              variant="text"
              size="sm"
              className="hidden lg:inline-block"
            >
              <Link to={'/login'}>Log In</Link >
            </Button>
            <Button
              variant="gradient"
              size="sm"
              className="hidden lg:inline-block text-black"
            >
              <Link to={'/register'}>Register</Link >
            </Button>
          </div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      <MobileNav className='text-black' open={openNav}>
        {navList}
        <div className="flex items-center gap-x-1">
          <Button fullWidth variant="text" size="sm" className="">
            <Link to={'/login'}>Log In</Link >
          </Button>
          <Button fullWidth variant="gradient" size="sm" className="text-black ">
            <Link to={'/register'} className=''>Register</Link >
          </Button>
        </div>
      </MobileNav>
    </Navbar>
  
  </div>
  );
};

export default NavbarMain;



