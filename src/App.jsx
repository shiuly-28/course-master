import React from 'react';
import { Route, Routes, useMatch } from 'react-router-dom';
import Home from './pages/student/Home';
import CourseList from './pages/student/CourseList';
import CourseDeatials from './pages/student/CourseDeatials';
import MyEnrollments from './pages/student/MyEnrollments';
import Player from './pages/student/Player';
import Loading from './components/student/Loading';
import Educator from './pages/educator/Educator';
import DashBoard from './pages/educator/DashBoard';
import AddCourse from './pages/educator/AddCourse';
import StudentEnrolled from './pages/educator/StudentEnrolled';
import MyCourses from './pages/educator/MyCourses';
import Navbar from './components/student/Navbar';
import 'react-quill/dist/quill.snow.css';
import AddCourse2 from './pages/educator/AddCourse2';

const App = () => {

  const isEducatorRoute = useMatch('/educator/*');

  return (
    <div className='text-default min-h-screen bg-white'>
      {!isEducatorRoute && <Navbar />}

      <Routes>
        {/* Student Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/course-list" element={<CourseList />} />
        <Route path="/course-list/:input" element={<CourseList />} />
        <Route path="/course/:id" element={<CourseDeatials />} />
        <Route path="/my-enrollments" element={<MyEnrollments />} />
        <Route path="/player/:courseId" element={<Player />} />
        <Route path="/loading/:path" element={<Loading />} />

        {/* Educator Routes */}
        <Route path="/educator" element={<Educator />}>
          <Route index element={<DashBoard />} /> {/* Default Dashboard */}
          <Route path="add-course" element={<AddCourse2 />} />
          <Route path="student-enrolled" element={<StudentEnrolled />} />
          <Route path="my-courses" element={<MyCourses />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
