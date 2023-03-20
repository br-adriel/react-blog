import styled from 'styled-components';
import AuthFormLayout from '../components/AuthFormLayout';
import Form from '../components/Form';
import FormGroup from '../components/FormGroup';

const Login = () => {
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
            <label htmlFor='email'>Email</label>
            <input type='email' name='email' id='email' />
          </FormGroup>
          <FormGroup>
            <label htmlFor='password'>Senha</label>
            <input type='password' name='password' id='password' />
          </FormGroup>
          <FormGroup>
            <p>
              Não tem uma conta? <a href='#'>Cadastre-se</a>!
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
