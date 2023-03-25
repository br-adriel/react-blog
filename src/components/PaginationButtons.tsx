import { ArrowLeft, ArrowRight } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface IProps {
  linkPrev?: string;
  linkNext?: string;
}

const PaginationButtons = ({ linkNext, linkPrev }: IProps) => {
  return (
    <Wrapper>
      {!linkPrev ? null : (
        <Link className='btn' to={linkPrev}>
          <ArrowLeft title='Posts anteriores' />
        </Link>
      )}
      {!linkNext ? null : (
        <Link className='btn' to={linkNext}>
          <ArrowRight title='Posts posteriores' />
        </Link>
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
