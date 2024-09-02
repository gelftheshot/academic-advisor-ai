import Link from 'next/link';

const Page = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-green-600 mb-2">Welcome to Academic Advisor AI</h1>
        <p className="text-sm md:text-lg text-gray-700">Your ultimate tool for academic planning, finding professors, and getting career advice.</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-bold text-green-600 mb-2">Find a Professor</h2>
          <p className="text-sm text-gray-700 mb-4">Search and rate professors based on their teaching style, course difficulty, and more.</p>
          <Link href="/chat?new=true" className="inline-block bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300">Start Now</Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-bold text-green-600 mb-2">Major Advisor</h2>
          <p className="text-sm text-gray-700 mb-4">Get personalized advice on choosing your major and career path based on your interests and strengths.</p>
          <Link href="/majorAdvisor" className="inline-block bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300">Get Advice</Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-bold text-green-600 mb-2">Course Planner</h2>
          <p className="text-sm text-gray-700 mb-4">Plan your courses and ensure you meet all graduation requirements with our course planning tool.</p>
          <Link href="/coursePlanner" className="inline-block bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300">Plan Courses</Link>
        </div>
      </div>
    </div>
  );
}

export default Page;
