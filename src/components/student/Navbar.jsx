import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { assets } from '../../assets/assets/myassets';
import { useClerk,UserButton,useUser } from '@clerk/clerk-react';
import { AppContext } from '../../context/AppContext';

const Navbar = () => {
    const {navigate,iseducator}=useContext(AppContext);
    const location = useLocation();
    const isCourseListPage = location.pathname.includes('/course-list');

    const {openSignIn}= useClerk();
    const { user } = useUser();

    return (
        <div className={`flex justify-between items-center px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${isCourseListPage ? "bg-white" : "bg-cyan-100/70"} `}>
      <Link to="/" className="inline-block">
  <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 tracking-wide hover:text-blue-900 transition-colors duration-300">
  Course Master
  </h1>
</Link>



            {/* Desktop Menu */}
            <div className='hidden md:flex items-center text-gray-500 gap-4'>
                {user && <>
                 <button onClick={()=>{navigate('/educator')}}>{iseducator?"Educator-Dashboard":"Become-Educator"}</button>
                <Link to="/my-enrollments" className="ml-4">My Enrollments</Link>
                </>}
               
                {user ?<UserButton/>: <button onClick={()=>openSignIn()}className='bg-blue-600 text-white px-5 py-2 rounded-full'>Create Account</button>}
               
            </div>

            {/* Mobile Menu */}
            <div className='flex md:hidden items-center gap-2 sm:gap-5 text-gray-500'>
                <div className='flex items-center gap-1 max-sm:text-xs'>
            {user && <>
                 <button onClick={()=>{navigate('/educator')}}>{iseducator?"Educator-Dashboard":"Become-Educator"}</button>
                <Link to="/my-enrollments" className="ml-2">My Enrollments</Link>
                </>}
                </div>
               
                {
                    user?<UserButton/>: <button onClick={()=>openSignIn()}><img src={assets.user_icon} alt="User Icon" className='w-6 h-6' /></button>
                }
               
                
               
            </div>
        </div>
    );
};

export default Navbar;
