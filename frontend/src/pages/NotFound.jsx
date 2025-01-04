import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center px-4 lg:px-40 py-8">
        <h1 className="text-6xl md:text-8xl font-bold text-gray-800 mb-8">404</h1>
        <h2 className="text-2xl md:text-4xl font-semibold text-gray-600 mb-4">Page Not Found</h2>
        <p className="text-gray-500 text-lg md:text-xl mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link
          to="/"
          className="inline-block bg-[#ff450d] hover:bg-[#ff450d] text-gray-100 font-medium py-2 px-4 rounded-lg transition-colors duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
