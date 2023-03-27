import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import Container from '../components/Container';
import PaginationButtons from '../components/PaginationButtons';
import Post from '../components/Post';
import PostGrid from '../components/PostGrid';
import { api } from '../lib/axios';
import { PostWithoutContent } from '../types/posts';
import { GetPostsResponse } from '../types/responses';

const Home = () => {
  const [searchParams] = useSearchParams();
  const [posts, setPosts] = useState<PostWithoutContent[] | null | undefined>();
  const [prevLink, setPrevLink] = useState<string>();
  const [nextLink, setNextLink] = useState<string>();

  const pageNumber = searchParams.get('page');
  const navigate = useNavigate();

  const clickPrev = () => {
    if (prevLink) {
      navigate(prevLink);
    }
  };

  const clickNext = () => {
    if (nextLink) {
      navigate(nextLink);
    }
  };

  useEffect(() => {
    api
      .get<GetPostsResponse>(`posts?page=${pageNumber ?? 1}`)
      .then((res) => {
        setPosts(res.data.posts);
        setPrevLink(res.data.prev);
        setNextLink(res.data.next);
      })
      .catch((err) => setPosts(null));
  }, []);

  return (
    <Section>
      <Wrapper>
        <h1>Posts</h1>
        {posts === undefined ? (
          <h3>Carregando...</h3>
        ) : posts === null ? (
          <h3>Erro ao carregar posts</h3>
        ) : !posts.length ? (
          <h3>Nenhum post encontrado</h3>
        ) : (
          <PostGrid>
            {posts?.map((post) => (
              <Post post={post} key={post._id} />
            ))}
          </PostGrid>
        )}
        <PaginationButtons
          prev={prevLink ? clickPrev : undefined}
          next={nextLink ? clickNext : undefined}
        />
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
