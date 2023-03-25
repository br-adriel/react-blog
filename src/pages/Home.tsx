import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import Container from '../components/Container';
import PaginationButtons from '../components/PaginationButtons';
import Post from '../components/Post';
import PostGrid from '../components/PostGrid';
import { api } from '../lib/axios';
import { Post as IPost } from '../types/posts';
import { GetPostsResponse } from '../types/responses';

const Home = () => {
  const [searchParams] = useSearchParams();
  const [posts, setPosts] = useState<IPost[] | null>(null);
  const [prevLink, setPrevLink] = useState<string>();
  const [nextLink, setNextLink] = useState<string>();

  const pageNumber = searchParams.get('page');

  useEffect(() => {
    api.get<GetPostsResponse>(`posts?page=${pageNumber ?? 1}`).then((res) => {
      setPosts(res.data.posts);
      setPrevLink(res.data.prev);
      setNextLink(res.data.next);
    });
  }, []);

  return (
    <Section>
      <Wrapper>
        <h1>Posts</h1>
        <PostGrid>
          {posts?.map((post) => (
            <Post post={post} key={post._id} />
          ))}
        </PostGrid>
        <PaginationButtons linkNext={nextLink} linkPrev={prevLink} />
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
