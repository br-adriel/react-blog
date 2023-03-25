import { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AuthFormLayout from '../components/AuthFormLayout';
import Form from '../components/Form';
import FormGroup from '../components/FormGroup';
import { selectUser, setCredentials } from '../features/userSlice';
import { api } from '../lib/axios';
import { UserState } from '../types/userSlice';
import { storeRefeshToken, storeToken, storeUserProfile } from '../utils/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await api.post<UserState>('/users/authenticate', {
        email,
        password,
      });

      if (data.token && data.refreshToken && data.profile) {
        dispatch(
          setCredentials({
            token: data.token,
            refreshToken: data.refreshToken,
            profile: data.profile,
          })
        );

        storeToken(data.token);
        storeRefeshToken(data.refreshToken);
        storeUserProfile(data.profile);

        navigate('/');
        return;
      }

      setPassword('');
    } catch (err) {
      console.log(err);
    }
  };

  const { token } = useSelector(selectUser);
  if (token) return <Navigate to='/' />;
  return (
    <AuthFormLayout>
      <Content>
        <h2>Entrar</h2>
        <Form onSubmit={formSubmit}>
          <FormGroup>
            <label htmlFor='email'>Email:</label>
            <input
              type='email'
              name='email'
              id='email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor='password'>Senha:</label>
            <input
              type='password'
              name='password'
              id='password'
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
