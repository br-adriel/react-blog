import styled from 'styled-components';
import Container from '../components/Container';
import PaginationButtons from '../components/PaginationButtons';
import Post from '../components/Post';
import PostGrid from '../components/PostGrid';

const Home = () => {
  return (
    <Section>
      <Wrapper>
        <h1>Posts</h1>
        <PostGrid>
          <Post />
          <Post />
          <Post />
        </PostGrid>
        <PaginationButtons />
      </Wrapper>
    </Section>
  );
};

const Section = styled.section`
  padding: 16px;

  h1 {
    font-weight: 600;
    font-size: 32px;
    line-height: 40px;
  }
`;

const Wrapper = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default Home;
