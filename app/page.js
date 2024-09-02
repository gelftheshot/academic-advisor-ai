import Link from 'next/link';

const Page = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-green-600">Welcome to Rate My Professor AI</h1>
        <p className="text-lg text-gray-700 mt-2">Your ultimate tool for finding and rating professors, planning your courses, and getting career advice.</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-green-600">Find a Professor</h2>
          <p className="text-gray-700 mt-2">Search and rate professors based on their teaching style, course difficulty, and more.</p>
          <Link href="/chat?new=true" className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300">Start Now</Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-green-600">Major Advisor</h2>
          <p className="text-gray-700 mt-2">Get personalized advice on choosing your major and career path based on your interests and strengths.</p>
          <Link href="/majorAdvisor" className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300">Get Advice</Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-green-600">Course Planner</h2>
          <p className="text-gray-700 mt-2">Plan your courses and ensure you meet all graduation requirements with our course planning tool.</p>
          <Link href="/coursePlanner" className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300">Plan Courses</Link>
        </div>
      </div>
    </div>
  );
}

export default Page;