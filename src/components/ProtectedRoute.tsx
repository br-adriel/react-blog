import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectUser } from '../features/userSlice';

interface IProps {
  children: any;
}

const ProtectedRoute = ({ children }: IProps) => {
  const { profile } = useSelector(selectUser);
  if (!profile) return <Navigate to='/login' replace />;
  return children;
};

export default ProtectedRoute;
