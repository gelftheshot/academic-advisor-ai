"use client";
import { useState } from 'react';

const CoursePlanner = () => {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState('');
  const [credits, setCredits] = useState('');
  const [semester, setSemester] = useState('Fall');

  const addCourse = () => {
    if (course && credits) {
      setCourses([...courses, { name: course, credits: parseInt(credits), semester }]);
      setCourse('');
      setCredits('');
    }
  };

  const removeCourse = (index) => {
    const newCourses = courses.filter((_, i) => i !== index);
    setCourses(newCourses);
  };

  const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Course Planner</h1>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Course Name</label>
            <input
              type="text"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Credits</label>
            <input
              type="number"
              value={credits}
              onChange={(e) => setCredits(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Semester</label>
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option>Fall</option>
            <option>Spring</option>
            <option>Summer</option>
          </select>
        </div>
        <button
          onClick={addCourse}
          className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Add Course
        </button>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Planned Courses</h2>
        <p className="text-sm text-gray-600 mb-4">Total Credits: {totalCredits}</p>
        {courses.length > 0 ? (
          <ul className="space-y-2">
            {courses.map((course, index) => (
              <li key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                <span>{course.name} - {course.credits} credits ({course.semester})</span>
                <button
                  onClick={() => removeCourse(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No courses planned yet.</p>
        )}
      </div>
    </div>
  );
};

export default CoursePlanner;
