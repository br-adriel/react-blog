import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import GlobalStyle from './components/GlobalStyle';
import { setCredentials } from './features/userSlice';
import {
  getStoredRefreshToken,
  getStoredToken,
  getStoredUserProfile,
} from './utils/auth';
import './lib/dayjs';
import Header from './components/Header';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getStoredToken();
    const refreshToken = getStoredRefreshToken();
    const profile = getStoredUserProfile();

    if (token && refreshToken && profile) {
      dispatch(setCredentials({ token, refreshToken, profile }));
    }
  }, []);
  return (
    <>
      <GlobalStyle />
      <Header />
      <Outlet />
    </>
  );
}

export default App;
