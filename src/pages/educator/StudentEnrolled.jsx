import React, { useEffect, useState } from 'react';
import { dummyStudentEnrolled } from '../../assets/assets/myassets';
import Loading from '../../components/student/Loading';

const StudentEnrolled = () => {
    const [enrolledStudents, setEnrolledStudents] = useState(null);

    const fetchEnrolledStudents = async () => {
        setEnrolledStudents(dummyStudentEnrolled);
    };

    useEffect(() => {
        fetchEnrolledStudents();
    }, []);

    return enrolledStudents ? (
        <div className="min-h-screen flex flex-col items-center md:p-8 p-4 pt-8">
            <div className="w-full max-w-4xl">
                <h1 className="pb-6 text-2xl font-semibold text-center">Enrolled Students</h1>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-base">
                        <thead className="text-gray-900 border-b border-gray-500/20">
                            <tr>
                                <th className="px-4 py-3 font-semibold">Student</th>
                                <th className="px-4 py-3 font-semibold">Course Title</th>
                                <th className="px-4 py-3 font-semibold">Purchase Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {enrolledStudents.map((item, index) => (
                                <tr key={index} className="border-b border-gray-200">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <img src={item.student.imageUrl} alt={item.student.name} className="w-10 h-10 rounded-full object-cover" />
                                            <span>{item.student.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">{item.courseTitle}</td>
                                    <td className="px-4 py-3">{new Date(item.purchaseDate).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    ) : <Loading />;
};

export default StudentEnrolled;
