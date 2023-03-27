import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { selectUser } from '../features/userSlice';
import Container from './Container';

const Header = () => {
  const { profile } = useSelector(selectUser);

  if (!profile?.isAuthor) return null;
  return (
    <header>
      <Wrapper>
        <nav>
          <NavList>
            <li>
              <Link to='/posts/new' className='btn'>
                Novo post
              </Link>
            </li>
            <li>
              <Link to='' className='btn'>
                Gerenciar postagens
              </Link>
            </li>
          </NavList>
        </nav>
      </Wrapper>
    </header>
  );
};

const Wrapper = styled(Container)`
  display: flex;
  justify-content: flex-end;
  padding: 12px;
`;

const NavList = styled.ul`
  display: flex;
  gap: 8px;

  a,
  a:hover,
  a:visited {
    color: #fff;
    text-decoration: none;
  }
`;

export default Header;
