import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import CourseCard from './CourseCard';
import { AppContext } from '../../context/AppContext';

const CoursesSection = () => {
    const { allCourses } = useContext(AppContext);  

    return (
        <div className='py-16 md:px-40 px-16'>
           <h2 className='text-3xl font-medium text-gray-800'>Learn from Expert Quran Teachers</h2>
<p className='text-sm md:text-base text-gray-500 mt-3'>
    Explore our carefully designed Quran courses for all levels. Whether you’re starting with basic Arabic letters or aiming to master Tajweed and memorization,<br /> our courses are guided by qualified and experienced instructors.
</p>


            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-10'>
                {allCourses.slice(0, 4).map((course, index) => (
                    <CourseCard key={index} course={course} />
                ))}
            </div>

            <Link to="/course-list" onClick={() => scrollTo(0, 0)} className="text-gray-500 border border-gray-500/70 px-10 py-3 rounded">
                Show All Courses
            </Link>
        </div>
    );
};

export default CoursesSection;
