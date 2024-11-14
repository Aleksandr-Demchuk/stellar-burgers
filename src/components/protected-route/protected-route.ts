import { Preloader } from '@ui';
import { AppDispatch, useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router';
import {
  getUser,
  UserChecked,
  UserData
} from '../../services/slices/userSlice';
import { getCookie } from '../../utils/cookie';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};
export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(UserChecked);
  const user = useSelector(UserData);
  const location = useLocation();
  console.log(isAuthChecked, user);

  return children;
};
