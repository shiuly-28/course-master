import React, { useContext } from 'react';
import { assets } from '../../assets/assets/myassets';

import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

const CourseCard = ({ course }) => {
  const { currency,calculateRating } = useContext(AppContext);
  console.log("Course Data:", course);
console.log("Course Ratings:", course.courseRatings);
console.log("Calculated Rating:", calculateRating(course));



  return (
    <Link to={`/course/`+course._id} className='border border-gray-500/70 pb-6 overflow-hidden rounded-lg'>
         <div className="">
      <img
        src={course.courseThumbnail}
        alt={course.courseTitle}
        className="w-full "
      />
      <div className="p-4 text-left">
        <h3 className="text-base font-semibold text-gray-900 mb-1">{course.courseTitle}</h3>
        <p className="text-sm text-gray-600 mb-3">{course.educator.name || "Rased"}</p>

        <div className="flex items-center mb-3">
          <p className="text-yellow-500 font-bold mr-2">{calculateRating(course)}</p>
          <div className="flex space-x-1">
            {[...Array(5)].map((_, index) => (
              <img key={index} src={index<Math.floor(calculateRating(course))?assets.star:assets.star_blank} alt="star" className="w-4 h-4" />
            ))}
          </div>
          <p className="text-gray-500 text-sm ml-2">{course.courseRatings.length}</p>
        </div>

        <p className="text-xl font-bold text-blue-600">
          {currency}
          {(course.coursePrice - (course.discount * course.coursePrice) / 100).toFixed(2)}
        </p>
      </div>
    </div>
    </Link>
   
  );
};

export default CourseCard;
