
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-6">
      <div className="max-w-md w-full animate-fade-in">
        <h1 className="text-9xl font-bold text-gingerbread text-center">404</h1>
        <h2 className="text-2xl font-semibold text-center mt-6 mb-4">Page Not Found</h2>
        <p className="text-muted-foreground text-center mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="text-center">
          <Link 
            to="/" 
            className="inline-flex items-center justify-center px-8 py-3 rounded-md text-white bg-gingerbread hover:bg-gingerbread-dark transition-colors duration-300 text-base font-medium shadow-sm hover:shadow-md"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
