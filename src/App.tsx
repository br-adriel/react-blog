import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import GlobalStyle from './components/GlobalStyle';
import { setCredentials } from './features/userSlice';
import {
  getStoredRefeshToken,
  getStoredToken,
  getStoredUserProfile,
} from './utils/auth';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getStoredToken();
    const refreshToken = getStoredRefeshToken();
    const profile = getStoredUserProfile();

    if (token && refreshToken && profile) {
      dispatch(setCredentials({ token, refreshToken, profile }));
    }
  }, []);
  return (
    <>
      <GlobalStyle />
      <Outlet />
    </>
  );
}

export default App;
