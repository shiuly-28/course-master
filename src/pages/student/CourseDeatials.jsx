import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import Loading from '../../components/student/Loading';
import { assets } from '../../assets/assets/myassets';
import humanizeDuration from 'humanize-duration';
import Footer from '../../components/student/Footer';
import YouTube from 'react-youtube';

const CourseDetails = () => {
    const { id } = useParams();
    const {
        allCourses,
        calculateRating,
        calculateChapterTime,
        calculateNoOfLectures,
        calculateCourseDuration,
        currency
    } = useContext(AppContext);

    const [courseData, setCourseData] = useState(null);
    const [openSection, setOpenSection] = useState({});

    const [isAllreadyInrolld, setIsAllreadyInrolld] = useState(false);
    const [playerData,setPlayerData]=useState(null)

    const toggleSection = (index) => {
        setOpenSection((prev) => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    useEffect(() => {
        const findSingleData = allCourses?.find(course => course._id === id);
        setCourseData(findSingleData);
    }, [id, allCourses]);

    return courseData ? (
        <>
            <div className="flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-16 px-8 md:pt-30 pt-20 text-left">
                <div className='absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-cyan-100/70 z-10'></div>

                <div className='max-w-2xl z-100 lg:ml-20'>
                    <h1 className="text-5xl font-bold mb-4">{courseData.courseTitle}</h1>
                    <p dangerouslySetInnerHTML={{ __html: courseData.courseDescription.slice(0, 200) + '...' }}></p>

                    {/* Review and Rating */}
                    <div className="flex items-center mb-3 mt-4">
                        <p className="text-yellow-500 font-bold mr-2">{calculateRating(courseData).toFixed(1)}</p>
                        <div className="flex space-x-1">
                            {[...Array(5)].map((_, index) => (
                                <img
                                    key={index}
                                    src={index < Math.floor(calculateRating(courseData)) ? assets.star : assets.star_blank}
                                    alt="star"
                                    className="w-4 h-4"
                                />
                            ))}
                        </div>
                        <p className="text-blue-500 text-sm ml-2">({courseData.courseRatings.length} {courseData.courseRatings.length > 1 ? 'ratings' : 'rating'})</p>
                        <p className='text-gray-500 ml-2'>{courseData.enrolledStudents.length} {courseData.enrolledStudents.length > 1 ? 'students' : 'student'}</p>
                    </div>

                    <p className='text-gray-500'>Course by <span className='text-blue-500'>Abdul Baset</span></p>

                    <div className='pt-8 text-gray-800'>
                        <h2 className='text-xl font-semibold'>Course Structure</h2>
                        <div className='pt-5'>
                            {courseData.courseContent.map((chapter, index) => (
                                <div key={index} className='mb-5 border border-gray-100 rounded bg-white'>
                                    <div
                                        className='flex items-center justify-between px-4 py-3 cursor-pointer select-none'
                                        onClick={() => toggleSection(index)}
                                    >
                                        <div className='flex items-center gap-2'>
                                            <img src={assets.down_arrow_icon} alt="arrow-icon" className={`w-4 h-4 transform transition-transform ${openSection[index] ? 'rotate-180' : ''}`} />
                                            <p className='font-semibold md:text-base text-sm'>{chapter.chapterTitle}</p>
                                        </div>
                                        <p className='text-sm text-gray-500 ml-6'>
                                            {chapter.chapterContent.length} lecture{chapter.chapterContent.length > 1 && 's'} - {calculateChapterTime(chapter)}
                                        </p>
                                    </div>

                                    {openSection[index] && (
                                        <ul className='px-4 pb-4'>
                                            {chapter.chapterContent.map((lecture, idx) => (
                                                <li key={idx} className='flex items-start gap-3 mt-3'>
                                                    <img src={assets.play_icon} alt="play_icon" className='w-4 h-4 mt-1' />
                                                    <div className='flex items-center w-full justify-between'>
                                                        <p className='font-medium'>{lecture.lectureTitle}</p>
                                                        <div className='flex items-center gap-4 text-sm text-gray-500 mt-1'>
                                                            {lecture.isPreviewFree && <span
                                                            onClick={()=>setPlayerData({
                                                                videoId: lecture.lectureUrl.split('/').pop(),
                                                            })}
                                                            className='text-green-500'>Preview</span>}
                                                            <span>{humanizeDuration(lecture.lectureDuration * 60 * 1000, { units: ["h", "m"], round: true })}</span>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='py-20 text-sm'>
                     <h3 className='text-xl font-semibold text-gray-800'>Course Description</h3>
                      <p className='p-4 rich-text' dangerouslySetInnerHTML={{ __html: courseData.courseDescription}}></p>

                    </div>

                </div>
    {/*  right side  */}
                <div className='max-w-course-card z-10 shadow custom-card rounded-t md:rounded-none overflow-hidden bg-white min-w-[300px sm:min-w-[420px] lg:mr-20'>
                    {
            playerData ? 
            <YouTube videoId={playerData.videoId}  opts={{playerVars:{autoplay:1 }}} iframeClassName='w-ful aspect-video'></YouTube>
            :   <img src={courseData.courseThumbnail} alt="" />
         }

                 
                  <div className='p-5'>
                  <div className='flex items-center gap-3'>
                    <img src={assets.time_left_clock_icon} alt="" />
                    <p className='text-red-500 text-2xl'><span className='font-semibold'>5 days</span> left at the price</p>
                  </div>
                  <div className='flex items-center gap-3 pt-4'>
                    <p className='text-4xl font-bold'>{currency}{(courseData.coursePrice-courseData.discount *courseData.coursePrice /100).toFixed(2)}</p>
                    <p className='text-xl text-gray-700 line-through'>{currency}{courseData.coursePrice}</p>
                    <p className='text-xl text-gray-700'>{courseData.discount} % off</p>
                  </div>
                   <div className='flex items-center text-sm gap-4 pt-2 text-gray-500'>
                <div className='flex items-center gap-2'>
                  <img src={assets.star}alt="star icon" />
                  <p>{calculateRating(courseData)}</p>
                </div>
                <div className='h-4 w-px bg-gray-500/40'></div>
                 <div className='flex items-center gap-2'>
         

         
                <img src={assets.time_clock_icon}alt="clock icon" />
                  <p>{calculateCourseDuration(courseData)}</p>
                </div>
                <div className='h-4 w-px bg-gray-500/40'></div>
 <div className='flex items-center gap-2'>
                  <img src={assets.lesson_icon}alt="star icon" />
                  <p>{calculateNoOfLectures(courseData)}lesson</p>
                </div>
               

                  </div>

                    <button className='md:mt-6 mt-4 py-3 rounded-lg bg-blue-600 text-white font-medium w-full'>
                    {isAllreadyInrolld? 'Already Enrolled' : 'Enroll Now'}
                  </button>


                  <div className='pt-6'>
    <p className='md:text-xl text-lg font-semibold text-gray-800'>What’s in the course?</p>
    <ul className='ml-5 pt-3 space-y-2 list-disc text-gray-600 text-sm md:text-base'>
        <li>Lifetime access with free updates.</li>
        <li>Comprehensive course materials and resources.</li>
        <li>Quizzes and assignments for practice.</li>
        <li>Certificate of completion after finishing.</li>
        <li>Access to instructor Q&A and support.</li>
    </ul>
</div>



                 

                  </div>


                 


                </div>



            </div>
            <Footer/>
        </>
    ) : <Loading />;
};

export default CourseDetails;
