import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import GlobalStyle from './components/GlobalStyle';
import Header from './components/Header';
import { setProfile } from './features/userSlice';
import './lib/dayjs';
import { getStoredUserProfile } from './utils/auth';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const profile = getStoredUserProfile();

    if (profile) {
      dispatch(setProfile({ profile }));
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
