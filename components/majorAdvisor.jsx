"use client";
import { useState } from 'react';

const MajorAdvisor = () => {
  const [interests, setInterests] = useState('');
  const [strengths, setStrengths] = useState('');
  const [careerGoals, setCareerGoals] = useState('');
  const [recommendation, setRecommendation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simulate an API call to get recommendations
    const response = await fetch('/api/majorAdvisor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ interests, strengths, careerGoals }),
    });
    const data = await response.json();
    setRecommendation(data.recommendation);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Major and Career Advisor</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Interests</label>
          <input
            type="text"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Strengths</label>
          <input
            type="text"
            value={strengths}
            onChange={(e) => setStrengths(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Career Goals</label>
          <input
            type="text"
            value={careerGoals}
            onChange={(e) => setCareerGoals(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Get Recommendation
        </button>
      </form>
      {recommendation && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-md">
          <h2 className="text-xl font-bold">Recommended Major and Career Path</h2>
          <p>{recommendation}</p>
        </div>
      )}
    </div>
  );
};

export default MajorAdvisor;
