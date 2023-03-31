import styled from 'styled-components';
import Container from './Container';

interface IProps {
  children?: any;
}

const AuthFormLayout = ({ children }: IProps) => {
  return (
    <Wrapper>
      {children}
      <img
        src={`${import.meta.env.BASE_URL}/img/auth_ilustration.svg`}
        alt=''
        width={750}
      />
    </Wrapper>
  );
};

const Wrapper = styled(Container)`
  padding: 16px;
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 72px;

  img {
    max-width: 463px;
    height: auto;
    display: none;
  }

  @media screen and (min-width: 768px) {
    img {
      display: block;
    }
  }

  @media screen and (min-width: 1024px) {
    flex-direction: row-reverse;
  }
`;

export default AuthFormLayout;
