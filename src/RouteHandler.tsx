import { Route, Routes } from 'react-router';
import { HashRouter } from 'react-router-dom';
import App from './App';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
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
          <Route
            path='/posts/new'
            element={
              <ProtectedRoute mustBeAuthor>
                <NewPost />
              </ProtectedRoute>
            }
          />
          <Route path='/posts/:id' element={<Post />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default RouteHandler;
