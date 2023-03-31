import { Route, Routes } from 'react-router';
import { HashRouter } from 'react-router-dom';
import App from './App';
import ProtectedRoute from './components/ProtectedRoute';
import EditPost from './pages/EditPost';
import Home from './pages/Home';
import Login from './pages/Login';
import ManagePosts from './pages/ManagePosts';
import NewPost from './pages/NewPost';
import Post from './pages/Post';
import SignUp from './pages/SignUp';

const RouteHandler = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='' element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='posts'>
            <Route
              path='new'
              element={
                <ProtectedRoute mustBeAuthor>
                  <NewPost />
                </ProtectedRoute>
              }
            />
            <Route
              path='manage'
              element={
                <ProtectedRoute mustBeAdminOrAuthor>
                  <ManagePosts />
                </ProtectedRoute>
              }
            />
            <Route path=':id' element={<Post />} />
            <Route
              path=':id/edit'
              element={
                <ProtectedRoute mustBeAdminOrAuthor>
                  <EditPost />
                </ProtectedRoute>
              }
            />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default RouteHandler;
