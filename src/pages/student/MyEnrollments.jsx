import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { Line } from 'rc-progress';
import Footer from '../../components/student/Footer';

const MyEnrollments = () => {
    const { enrolledCourse, calculateCourseDuration, navigate } = useContext(AppContext);

    const [progressArray, setProgressArray] = useState([
        { lectureCompleted: 4, totalLecture: 4 },
        { lectureCompleted: 3, totalLecture: 6 },
        { lectureCompleted: 1, totalLecture: 8 },
        { lectureCompleted: 4, totalLecture: 8 },
        { lectureCompleted: 8, totalLecture: 8 },
        { lectureCompleted: 3, totalLecture: 5 },
        { lectureCompleted: 3, totalLecture: 5 },
        { lectureCompleted: 2, totalLecture: 5 },
        { lectureCompleted: 2, totalLecture: 5 },
    ]);

    return (
        <>
        <div className="max-w-5xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">My Enrollments</h1>
            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Course</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Duration</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Completed</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enrolledCourse && enrolledCourse.length > 0 ? (
                            enrolledCourse.map((course, index) => {
                                const progress = progressArray[index];
                                const percent = (progress.lectureCompleted / progress.totalLecture) * 100;
                                const isCompleted = progress.lectureCompleted === progress.totalLecture;
                                const statusStyle = isCompleted
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-yellow-100 text-yellow-800';
                                const statusText = isCompleted ? 'Completed' : 'In Progress';

                                return (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm text-gray-800 flex items-center gap-3">
                                            <img src={course.courseThumbnail} alt={course.courseTitle} className="w-12 h-12 rounded object-cover" />
                                            <span>{course.courseTitle}</span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-800">{calculateCourseDuration(course)}</td>
                                        <td className="px-6 py-4 text-sm text-green-600 font-semibold w-64">
                                            <div className="mb-1">
                                                {progress.lectureCompleted}/{progress.totalLecture}
                                            </div>
                                            <Line 
                                                strokeWidth={4} 
                                                percent={percent} 
                                                strokeColor={isCompleted ? '#16a34a' : '#facc15'} 
                                                trailColor="#e5e7eb" 
                                                className="rounded-full"
                                            />
                                        </td>
                                        <td 
                                            onClick={() => navigate('/player/' + course._id)} 
                                            className="px-6 py-4 text-sm cursor-pointer"
                                        >
                                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusStyle}`}>
                                                {statusText}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">No Enrollments Found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            
        </div>

         <Footer/>
        </>
    );
};

export default MyEnrollments;
