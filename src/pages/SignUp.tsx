import { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AuthFormLayout from '../components/AuthFormLayout';
import Form from '../components/Form';
import FormGroup from '../components/FormGroup';
import { selectUser, setCredentials } from '../features/userSlice';
import { api } from '../lib/axios';
import { storeRefeshToken, storeToken } from '../utils/auth';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await api.post<{
        token?: string;
        refreshToken?: string;
      }>('/users', {
        firstName,
        lastName,
        email,
        password,
        password2,
      });

      if (data.token && data.refreshToken) {
        dispatch(
          setCredentials({
            token: data.token,
            profile: {
              email: email,
              firstName: firstName,
              lastName: lastName,
            },
            refreshToken: data.refreshToken,
          })
        );

        storeToken(data.token);
        storeRefeshToken(data.refreshToken);

        navigate('/');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const { token } = useSelector(selectUser);
  if (token) return <Navigate to='/' />;
  return (
    <AuthFormLayout>
      <Content>
        <h2>Cadastrar-se</h2>
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
            <label htmlFor='firstName'>Nome:</label>
            <input
              type='text'
              name='firstName'
              id='firstName'
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor='lastName'>Sobrenome:</label>
            <input
              type='text'
              name='lastName'
              id='lastName'
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
            <label htmlFor='password2'>Confirmação de senha:</label>
            <input
              type='password'
              name='password2'
              id='password2'
              required
              minLength={8}
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <p>
              Já tem uma conta? <Link to='/login'>Faça login</Link>!
            </p>
          </FormGroup>
          <button type='submit'>Cadastrar-se</button>
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
export default SignUp;
