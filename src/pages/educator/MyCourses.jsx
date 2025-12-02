import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import Loading from '../../components/student/Loading';

const MyCourses = () => {
    const { currency, allCourses } = useContext(AppContext);
    const [courses, setCourses] = useState(null);

    const fetchEducatorCourses = async () => {
        if (allCourses && allCourses.length > 0) {
            setCourses(allCourses);
        } else {
            setCourses([]); // Safe fallback
        }
    };

    useEffect(() => {
        fetchEducatorCourses();
    }, [courses]);

    return courses ? (
        <div className='min-h-screen flex flex-col items-center md:p-8 p-4 pt-8'>
            <div className='w-full'>
                <h1 className='pb-6 text-2xl font-semibold text-center'>My Courses</h1>
                <div className='overflow-x-auto'>
                    <table className="w-full text-left text-base">
                        <thead className='text-gray-900 border-b border-gray-500/20'>
                            <tr>
                                <th className='px-4 py-3 font-semibold truncate'>All Courses</th>
                                <th className='px-4 py-3 font-semibold truncate'>Earning</th>
                                <th className='px-4 py-3 font-semibold truncate'>Student Enrolled</th>
                                <th className='px-4 py-3 font-semibold truncate'>Publish On</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map((course, index) => (
                                <tr key={index} className='border-b border-gray-200'>
                                    <td className='px-4 py-3'>
                                        <div className="flex items-center gap-3">
                                            <img src={course.courseThumbnail} alt="" className="w-12 h-12 object-cover rounded-md" />
                                            <span>{course.title}</span>
                                        </div>
                                    </td>
                                   <td className='px-4 py-3'>
    {currency}
    {(Math.floor(course.enrolledStudents.length * (course.coursePrice - (course.discount * course.coursePrice / 100)))).toLocaleString()}
</td>

                                    <td className='px-4 py-3'>{course.enrolledStudents.length}</td>
                                    <td className='px-4 py-3'>{new Date(course.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    ) : <Loading />;
};

export default MyCourses;
