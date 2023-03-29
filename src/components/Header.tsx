import {
  BoxArrowRight,
  CardHeading,
  HouseFill,
  PencilSquare,
} from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { selectUser } from '../features/userSlice';
import { logout } from '../utils/auth';
import Container from './Container';

const Header = () => {
  const { profile } = useSelector(selectUser);

  return (
    <header>
      <Wrapper>
        <nav>
          <NavList>
            <Link to='/' className='btn' title='Página inicial'>
              <HouseFill />
            </Link>
            {profile && profile.isAuthor ? (
              <>
                <li>
                  <Link to='/posts/new' className='btn' title='Novo post'>
                    <PencilSquare />
                  </Link>
                </li>
                <li>
                  <Link to='' className='btn' title='Gerenciar postagens'>
                    <CardHeading />
                  </Link>
                </li>
              </>
            ) : null}

            {profile ? (
              <li>
                <button title='Sair' onClick={logout}>
                  <BoxArrowRight />
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link to='/login' className='btn'>
                    Entrar
                  </Link>
                </li>
                <li>
                  <Link to='/signup' className='btn'>
                    Cadastrar-se
                  </Link>
                </li>
              </>
            )}
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

  li {
    display: flex;
  }

  a,
  a:hover,
  a:visited {
    color: #fff;
    text-decoration: none;
  }
`;

export default Header;
