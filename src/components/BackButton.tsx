import { ArrowLeft } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button type='button' onClick={() => navigate(-1)}>
      <ArrowLeft title='Voltar' />
    </Button>
  );
};

const Button = styled.button`
  outline: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;

  svg {
    width: 20px;
    height: 20px;
  }
`;

export default BackButton;
