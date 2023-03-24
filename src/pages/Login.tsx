import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import AuthFormLayout from '../components/AuthFormLayout';
import Form from '../components/Form';
import FormGroup from '../components/FormGroup';
import { selectUser } from '../features/userSlice';

const Login = () => {
  const { token } = useSelector(selectUser);

  if (token) return <Navigate to='/' />;
  return (
    <AuthFormLayout>
      <Content>
        <h2>Entrar</h2>
        <Form
          onSubmit={(e) => {
            e.preventDefault;
          }}
        >
          <FormGroup>
            <label htmlFor='email'>Email:</label>
            <input type='email' name='email' id='email' required />
          </FormGroup>
          <FormGroup>
            <label htmlFor='password'>Senha:</label>
            <input
              type='password'
              name='password'
              id='password'
              required
              minLength={8}
            />
          </FormGroup>
          <FormGroup>
            <p>
              Não tem uma conta? <Link to='/signup'>Cadastre-se</Link>!
            </p>
          </FormGroup>
          <button type='submit'>Entrar</button>
        </Form>
      </Content>
    </AuthFormLayout>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: min(350px, 100%);

  @media screen and (min-width: 768px) {
    & {
      width: min(400px, 100%);
    }
  }
`;
export default Login;
