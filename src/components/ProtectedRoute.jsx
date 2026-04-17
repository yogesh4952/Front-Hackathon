import { useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useContext(AppContext);

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      toast.error('You need to login to access this page');
    }
  }, [isLoggedIn, loading]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to='/login' />;
  }

  return children;
};

export default ProtectedRoute;
