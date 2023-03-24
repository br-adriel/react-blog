import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AuthFormLayout from '../components/AuthFormLayout';
import Form from '../components/Form';
import FormGroup from '../components/FormGroup';

const SignUp = () => {
  return (
    <AuthFormLayout>
      <Content>
        <h2>Cadastrar-se</h2>
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
            <label htmlFor='firstName'>Nome:</label>
            <input type='text' name='firstName' id='firstName' required />
          </FormGroup>
          <FormGroup>
            <label htmlFor='lastName'>Sobrenome:</label>
            <input type='text' name='lastName' id='lastName' required />
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
            <label htmlFor='password2'>Confirmação de senha:</label>
            <input
              type='password'
              name='password2'
              id='password2'
              required
              minLength={8}
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
