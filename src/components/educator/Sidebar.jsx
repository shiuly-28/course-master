import React, { useContext } from 'react';
import { assets } from '../../assets/assets/myassets';
import { AppContext } from '../../context/AppContext';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const { isEducator } = useContext(AppContext); // Destructure isEducator from context

    const menuItems = [
        { name: 'Dashboard', path: '.', icon: assets.home_icon },
        { name: 'Add Course', path: 'add-course', icon: assets.add_icon },
        { name: 'My Courses', path: 'my-courses', icon: assets.my_course_icon },
        { name: 'Student Enrolled', path: 'student-enrolled', icon: assets.person_tick_icon },
    ];

    return isEducator && (
        <div className='md:w-64 w-20 bg-white shadow-lg min-h-screen border-r border-gray-200 flex flex-col py-6'>
            <div className="flex flex-col gap-2">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        end={item.path === '.'}
                        className={({ isActive }) =>
                            `flex items-center md:justify-start justify-center md:gap-4 gap-1 md:px-6 px-2 py-3 rounded-lg mx-2 
                             transition-all duration-200 ease-in-out
                             ${isActive ? 'bg-blue-100 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-100 hover:text-blue-500'}`
                        }
                    >
                        <img src={item.icon} alt="icon" className="w-6 h-6" />
                        <span className='md:block hidden text-sm'>{item.name}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
