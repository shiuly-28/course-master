import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import humanizeDuration from 'humanize-duration';
import { useParams } from 'react-router-dom';
import { assets } from '../../assets/assets/myassets';
import YouTube from 'react-youtube';
import Rating from '../../components/student/Rating';

const Player = () => {
    const { enrolledCourse, calculateChapterTime } = useContext(AppContext);
    const { courseId } = useParams();
    const [courseData, setCourseData] = useState(null);
    const [openSection, setOpenSection] = useState({});
    const [playerData, setPlayerData] = useState(null);

    const getCourseData = async () => {
        enrolledCourse.map((course) => {
            if (course._id === courseId) {
                setCourseData(course);
            }
        });
    };

    useEffect(() => {
        getCourseData();
    }, [enrolledCourse]);

    const toggleSection = (index) => {
        setOpenSection((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    return (
        <div className='p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36'>
            {/* Left Column */}
            <div className='text-gray-300'>
                <h2 className='text-xl font-bold mb-4'>Course Structure</h2>

                <div className='pt-5'>
                    {courseData &&
                        courseData.courseContent.map((chapter, index) => (
                            <div key={index} className='mb-5 border border-gray-100 rounded bg-white'>
                                <div
                                    className='flex items-center justify-between px-4 py-3 cursor-pointer select-none'
                                    onClick={() => toggleSection(index)}
                                >
                                    <div className='flex items-center gap-2'>
                                        <img
                                            src={assets.down_arrow_icon}
                                            alt='arrow-icon'
                                            className={`w-4 h-4 transform transition-transform ${
                                                openSection[index] ? 'rotate-180' : ''
                                            }`}
                                        />
                                        <p className='font-semibold md:text-base text-sm text-black'>{chapter.chapterTitle}</p>
                                    </div>
                                    <p className='text-sm text-gray-500 ml-6'>
                                        {chapter.chapterContent.length} lecture
                                        {chapter.chapterContent.length > 1 && 's'} - {calculateChapterTime(chapter)}
                                    </p>
                                </div>

                                {openSection[index] && (
                                    <ul className='px-4 pb-4'>
                                        {chapter.chapterContent.map((lecture, idx) => (
                                            <li key={idx} className='flex items-start gap-3 mt-3'>
                                                <img
                                                    src={false ? assets.blue_tick_icon : assets.play_icon}
                                                    alt='play_icon'
                                                    className='w-4 h-4 mt-1'
                                                />
                                                <div className='flex items-center w-full justify-between'>
                                                    <p className='font-medium text-black'>{lecture.lectureTitle}</p>
                                                    <div className='flex items-center gap-4 text-sm text-gray-500 mt-1'>
                                                        {lecture.lectureUrl && (
                                                            <span
                                                                onClick={() =>
                                                                    setPlayerData({
                                                                        ...lecture,
                                                                        chapter: index + 1,
                                                                        lecture: idx + 1,
                                                                    })
                                                                }
                                                                className='text-green-500 cursor-pointer hover:underline'
                                                            >
                                                                Watch
                                                            </span>
                                                        )}
                                                        <span>
                                                            {humanizeDuration(lecture.lectureDuration * 60 * 1000, {
                                                                units: ['h', 'm'],
                                                                round: true,
                                                            })}
                                                        </span>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                </div>

                <div className='flex items-center mt-10 gap-2 py-3'>
                    <h1 className='textxl font-bold'>Rate this course :</h1>
                    <Rating/>
                </div>
            </div>

            {/* Right Column */}
            <div>
                {playerData ? (
                    <>
                        <YouTube
                            videoId={playerData.lectureUrl.split('/').pop()}
                            iframeClassName='w-full h-full aspect-video'
                        />
                        <div className='mt-4 text-white'>
                            <h3 className='text-xl font-semibold'>{playerData.lectureTitle}</h3>
                            <p className='text-gray-400'>
                                Chapter {playerData.chapter} - Lecture {playerData.lecture}
                            </p>
                            <button>Mark as Complete</button>
                        </div>
                    </>
                ) : (
                    <img
                        src={courseData?.courseThumbnail}
                        alt='Course Thumbnail'
                        className='w-full aspect-video object-cover'
                    />
                )}
            </div>
        </div>
    );
};

export default Player;
