import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const user = sessionStorage.getItem('username');

  if (!user || user.trim() === '') {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default PrivateRoute;
