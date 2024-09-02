"use client";
import { useState } from 'react';

const CoursePlanner = () => {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState('');

  const addCourse = () => {
    setCourses([...courses, course]);
    setCourse('');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Course Planner</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Add Course</label>
          <input
            type="text"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={addCourse}
            className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Add
          </button>
        </div>
        <div>
          <h2 className="text-xl font-bold">Planned Courses</h2>
          <ul className="list-disc pl-5">
            {courses.map((course, index) => (
              <li key={index}>{course}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CoursePlanner;
