import React from 'react';
import { assets, dummyEducatorData } from '../../assets/assets/myassets';
import { UserButton, useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const educatorData = dummyEducatorData;
    const { user } = useUser();

    return (
        <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white shadow-sm">
            {/* Logo */}
            <Link to='/'>
                <img src={assets.logo} alt="Ufuq Academy Logo" className="h-10" />
            </Link>

            {/* User Info */}
            <div className='flex items-center gap-4 text-gray-600'>
                <h1 className="text-sm md:text-base font-medium">
                    Hi! {user ? `${user.firstName} ${user.lastName}` : 'Developer'}
                </h1>
                
                {user ? (
                    <UserButton />
                ) : (
                    <img 
                        src={assets.profile_img} 
                        alt="Profile Placeholder" 
                        className="w-8 h-8 rounded-full object-cover cursor-pointer hover:scale-105 transition-transform duration-200" 
                    />
                )}
            </div>
        </div>
    );
};

export default Navbar;
