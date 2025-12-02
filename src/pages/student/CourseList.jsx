import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { useParams } from 'react-router-dom';
import SearchBar from '../../components/student/SearchBar';
import CourseCard from '../../components/student/CourseCard';
import { assets } from '../../assets/assets/myassets';
import Footer from '../../components/student/Footer';

const CourseList = () => {
    const { navigate, allCourses } = useContext(AppContext);
    const { input } = useParams();

    const [filteredCourses, setFilteredCourses] = useState([]);

    useEffect(() => {
        if (allCourses && allCourses.length > 0) {
            const tempCourses = allCourses;

            if (input) {
                const filtered = tempCourses.filter(item =>
                    item.courseTitle.toLowerCase().includes(input.toLowerCase())
                );
                setFilteredCourses(filtered);
            } else {
                setFilteredCourses(tempCourses);
            }
        }
    }, [input, allCourses]);

    return (
        <>
            <div className='relative md:px-36 px-8 pt-20 text-left'>
                {/* Header & SearchBar Section */}
                <div className='flex flex-col md:flex-row gap-6 justify-between items-center w-full'>
 
                    <div>
                        <h1 className='text-4xl font-bold text-gray-800'>Course List</h1>
                        <p className='text-gray-500'>
                            <span onClick={() => navigate('/')} className='text-blue-600 cursor-pointer hover:underline'>
                                Home
                            </span> / Course List
                        </p>
                    </div>

                    <div className="flex-shrink-0 w-full md:w-auto">
                        <SearchBar data={input} variant="inline" />
                    </div>
                </div>

                {/* Filter Badge (Input Tag) */}
                {input && (
                    <div className='flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full w-fit mt-6'>
                        <span className='text-sm font-medium'>{input}</span>
                        <img 
                            src={assets.cross_icon} 
                            alt="Clear" 
                            className='w-4 h-4 cursor-pointer' 
                            onClick={() => navigate('/course-list')} 
                        />
                    </div>
                )}

                {/* Course Cards Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12'>
                    {filteredCourses.map((course, index) => (
                        <CourseCard key={index} course={course} />
                    ))}
                </div>

                {filteredCourses.length === 0 && (
                    <p className='text-center text-gray-500 mt-12'>No Courses Found</p>
                )}
            </div>

            <Footer/>
        </>
    );
};

export default CourseList;
