import { ArrowLeft, ArrowRight } from 'react-bootstrap-icons';
import styled from 'styled-components';

interface IProps {
  prev?: Function;
  next?: Function;
}

const PaginationButtons = ({ prev, next }: IProps) => {
  return (
    <Wrapper>
      {!prev ? null : (
        <button type='button' onClick={() => prev()}>
          <ArrowLeft title='Anterior' />
        </button>
      )}
      {!next ? null : (
        <button type='button' onClick={() => next()}>
          <ArrowRight title='Próximo' />
        </button>
      )}
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
