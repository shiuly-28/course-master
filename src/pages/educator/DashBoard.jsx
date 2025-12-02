import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { assets, dummyDashboardData } from '../../assets/assets/myassets';
import Loading from '../../components/student/Loading';

const DashBoard = () => {
    const currency = useContext(AppContext);
    const [dashboardData, setDashboardData] = useState(null);

    const fetchdashBoardData = async () => {
        setDashboardData(dummyDashboardData);
    };

    useEffect(() => {
        fetchdashBoardData();
    }, []);

    return dashboardData ? (
        <div className="min-h-screen flex flex-col gap-8 md:p-8 p-4 pt-8 bg-white">
            {/* Statistic Cards */}
            <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                <div className="flex items-center gap-3 bg-blue-50 p-4 w-56 rounded-md shadow-sm">
                    <img src={assets.patients_icon} alt="Enrollments Icon" className="w-10" />
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-700">{dashboardData.enrolledStudentsData.length}</h2>
                        <p className="text-sm text-gray-500">Total Enrollments</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 bg-green-50 p-4 w-56 rounded-md shadow-sm">
                    <img src={assets.my_course_icon} alt="Courses Icon" className="w-10" />
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-700">{dashboardData.totalCourses}</h2>
                        <p className="text-sm text-gray-500">Total Courses</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 bg-yellow-50 p-4 w-56 rounded-md shadow-sm">
                    <img src={assets.earning_icon} alt="Earnings Icon" className="w-10" /> 
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-700">${dashboardData.totalEarnings}</h2>
                        <p className="text-sm text-gray-500">Total Earnings</p>
                    </div>
                </div>
            </div>

            {/* Latest Enrollments Table */}
            <div className="w-full ">
                <h2 className="pb-4 text-lg font-semibold text-gray-700">Latest Enrollments</h2>
                <div className="overflow-x-auto rounded-md border border-gray-200 shadow-sm">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-500/20 text-gray-600 border-b text-sm text-left">
                            <tr>
                                <th className="px-4 py-3 font-semibold">#</th>
                                <th className="px-4 py-3 font-semibold">Student Name</th>
                                <th className="px-4 py-3 font-semibold">Course Title</th>
                                <th className="px-4 py-3 font-semibold">Enrollment Date</th>
                            </tr>
                        </thead>
                        <tbody className='text-sm text-gray-500'>
                            {dashboardData.enrolledStudentsData.map((item, index) => (
                                <tr key={index} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2">
                                        
                                        <img src={item.student.imageUrl} alt="" className='w-9 h-9 rounded-full'/>
                                       <span>{item.student.name}</span> </td>
                                    <td className="px-4 py-2">{item.courseTitle}</td>
                                    <td className="px-4 py-2">{item.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    ) : (
        <Loading />
    );
};

export default DashBoard;
