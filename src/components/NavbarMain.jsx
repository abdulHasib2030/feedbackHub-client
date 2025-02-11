import React, { useContext, useState } from 'react';

import { MdOutlineDarkMode, MdLightMode, MdDarkMode } from "react-icons/md";

import logo from '../assets/logo.png'
import lightlogo from '../assets/logo_light.png'
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';


const NavbarMain = () => {
  const { user, logoutUser, countReview, countService } = useContext(AuthContext)
  const [themeicon, setThemeIcon] = useState(localStorage.getItem('theme') === 'dark' ? true : false)
  const [openNav, setOpenNav] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const handleLogout = () => {
    logoutUser()
  }

  const toggleDarkMode = () => {
    const htmlElement = document.documentElement;
    if (htmlElement.classList.contains('dark')) {
      htmlElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setThemeIcon(false)
    } else {
      htmlElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setThemeIcon(true)
    }
  };

  // Apply the saved theme on page load
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');

  } else {
    document.documentElement.classList.remove('dark');

  }

console.log(isMenuOpen);
  return (
    <div className="fixed left-0 right-0 top-0 z-10  ">


      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to={'/'} className="flex items-center space-x-3 rtl:space-x-reverse">
            {
              themeicon ?
                <img src={lightlogo} className="h-12" alt="Flowbite Logo" />
                : <img src={logo} className="h-12" alt="Flowbite Logo" />

            }
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button className='md:hidden'>  {
                    themeicon ? <MdDarkMode onClick={toggleDarkMode} className='mr-3 text-2xl text-white cursor-pointer' /> :
                      <MdLightMode onClick={toggleDarkMode} className='mr-3 text-2xl cursor-pointer ' />
                  }</button>
            <button data-collapse-toggle="navbar-sticky" type="button" onClick={()=> isMenuOpen?setIsMenuOpen(false):setIsMenuOpen(true)} className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
             
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>

            <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
              <ul className="flex flex-col items-center p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <Link to={'/'} className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500">    <Link to={'/'} >
                    Home
                  </Link></Link>
                </li>
                <li>
                <NavLink to={'/services'} className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
          Services
        </NavLink>
                </li>
                {
                  user &&  <>
                   <li>
                 
                  <NavLink to={'/add-services'} state={'/add-services'} className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
              Add Service
            </NavLink>
               </li>
               <li>
               <NavLink to={'/my-reviews'} state={'/my-reviews'} className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
              My Reviews
            </NavLink>
               </li>
               <li>
               <NavLink to={`/my-services/${user.email}`} state={`/my-services/${user.email}`} className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
              My Services
            </NavLink>
               </li>
               <li>
               <button type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={handleLogout}>Logout</button>
               </li>
                  </>
                }
               
                <li>
                  <a href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
                </li>
               
                <li className='flex items-center gap-3'>
                <button type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"><Link to={'/login'}>Login</Link></button>
                <button type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"><Link to={'/register'}>Register</Link></button>
                  {
                    themeicon ? <MdDarkMode onClick={toggleDarkMode} className='mr-3 text-2xl text-white cursor-pointer' /> :
                      <MdLightMode onClick={toggleDarkMode} className='mr-3 text-2xl cursor-pointer ' />
                  }
                </li>
              
              </ul>
            </div>

            <div className={`absolute right-0 top-14 ${isMenuOpen ? 'block': 'hidden'} md:hidden`}>
            <ul className="flex flex-col items-center p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <Link to={'/'} className="block py-2 px-3 text-white rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500">    <Link to={'/'} >
                    Home
                  </Link></Link>
                </li>
                <li>
                <NavLink to={'/services'} className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
          Services
        </NavLink>
                </li>
                {
                  user &&  <>
                   <li>
                 
                  <NavLink to={'/add-services'} state={'/add-services'} className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
              Add Service
            </NavLink>
               </li>
               <li>
               <NavLink to={'/my-reviews'} state={'/my-reviews'} className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
              My Reviews
            </NavLink>
               </li>
               <li>
               <NavLink to={`/my-services/${user.email}`} state={`/my-services/${user.email}`} className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
              My Services
            </NavLink>
               </li>
               <li>
               <button type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={handleLogout}>Logout</button>
               </li>
                  </>
                }
               
                <li>
                  <a href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
                </li>
               
                <li>
                <button type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"><Link to={'/login'}>Login</Link></button>
                </li>
               <li>
                <button type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"><Link to={'/register'}>Register</Link></button>

               </li>
                
              
              
              </ul>
            </div>
          </div>

        </div>
      </nav>

    </div>
  );
};

export default NavbarMain;



