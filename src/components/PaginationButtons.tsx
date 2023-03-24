import { ArrowLeft, ArrowRight } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PaginationButtons = () => {
  return (
    <Wrapper>
      <Link className='btn' to={''}>
        <ArrowLeft title='Posts anteriores' />
      </Link>
      <Link className='btn' to={''}>
        <ArrowRight title='Posts posteriores' />
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  gap: 8px;

  a,
  a:visited,
  a:hover {
    color: #fff;
  }

  svg {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }
`;

export default PaginationButtons;
