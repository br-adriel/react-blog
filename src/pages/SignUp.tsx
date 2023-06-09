import { FormEvent, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AuthFormLayout from '../components/AuthFormLayout';
import Form from '../components/Form';
import FormGroup from '../components/FormGroup';
import { selectUser, setProfile } from '../features/userSlice';
import { api } from '../lib/axios';
import { UserProfile } from '../types/features/userSlice';
import { storeRefreshToken, storeToken, storeUserProfile } from '../utils/auth';

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
        profile: UserProfile;
        token: string;
        refreshToken: string;
      }>('/users', {
        firstName,
        lastName,
        email,
        password,
        password2,
      });

      if (data.token && data.refreshToken && data.profile) {
        dispatch(
          setProfile({
            profile: data.profile,
          })
        );

        storeToken(data.token);
        storeRefreshToken(data.refreshToken);
        storeUserProfile(data.profile);

        navigate('/');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const { profile } = useSelector(selectUser);
  if (profile) return <Navigate to='/' />;
  return (
    <main>
      <Helmet>
        <title>Criar perfil - Blog</title>
        <meta
          name='description'
          content='Crie uma conta para comentar nos posts'
        />
      </Helmet>
      <AuthFormLayout>
        <Content>
          <h1>Criar perfil</h1>
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
    </main>
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
