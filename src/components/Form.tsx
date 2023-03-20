import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;

  button[type='submit'] {
    align-self: flex-end;
  }
`;

export default Form;
