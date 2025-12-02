import React from 'react';
import { assets } from '../../assets/assets/myassets';
import SearchBar from './SearchBar';

const Hero = () => {
    return (
        <div className='flex flex-col items-center justify-center 
        w-full md:pt-36 pt-20 px-7 md:px-0 space-x-7 text-center bg-gradient-to-b from-cyan-100/70'>
            <h1 className='md:text-home-heading-large text-home-heading-small relative font-bold text-gray-800 max-w-3xl mx-auto'>
                Boost Your Career with <span className='text-blue'>
                    <img src={assets.sketch} alt="sketch" className='md:block hidden absolute -bottom-7 right-0' />
                </span>industry-ready tech courses.
            </h1>

            <p className='md:block hidden text-gray-500 max-w-2xl mx-auto'>
                Learn JavaScript, React, Node.js, and modern web development through practical, project-based courses designed to build your skills and prepare you for real-world jobs.
            </p>

            <p className='md:hidden text-gray-500 mx-x-sm mx-auto'>
                Master JavaScript, React, and web development with structured, hands-on lessons at your pace.
            </p>

            <SearchBar/>
        </div>
    );
};

export default Hero;

