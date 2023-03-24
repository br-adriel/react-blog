import styled from 'styled-components';

const PostGrid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;

  @media screen and (min-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export default PostGrid;
