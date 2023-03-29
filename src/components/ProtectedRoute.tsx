import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectUser } from '../features/userSlice';

interface IProps {
  children: any;
  mustBeAuthor?: boolean;
  mustBeAdmin?: boolean;
  mustBeAdminOrAuthor?: boolean;
  mustBeAdminAndAuthor?: boolean;
}

const ProtectedRoute = ({
  children,
  mustBeAdmin = false,
  mustBeAuthor = false,
  mustBeAdminOrAuthor = false,
  mustBeAdminAndAuthor = false,
}: IProps) => {
  const { profile } = useSelector(selectUser);

  if (!profile) return <Navigate to='/login' replace />;
  if (
    (mustBeAuthor && profile.isAuthor) ||
    (mustBeAdmin && profile.isAdmin) ||
    (mustBeAdminAndAuthor && profile.isAdmin && profile.isAuthor) ||
    (mustBeAdminOrAuthor && (profile.isAuthor || profile.isAdmin))
  ) {
    return children;
  }
  return <Navigate to='/login' replace />;
};

export default ProtectedRoute;
