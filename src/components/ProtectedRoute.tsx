import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectUser } from '../features/userSlice';

interface IProps {
  children: any;
  mustBeAuthor?: boolean;
  mustBeAdmin?: boolean;
}

const ProtectedRoute = ({
  children,
  mustBeAdmin = false,
  mustBeAuthor = false,
}: IProps) => {
  const { profile } = useSelector(selectUser);
  if (!profile) return <Navigate to='/login' replace />;
  if (mustBeAuthor && !profile.isAuthor)
    return <Navigate to='/login' replace />;
  if (mustBeAdmin && !profile.isAdmin) return <Navigate to='/login' replace />;
  return children;
};

export default ProtectedRoute;
