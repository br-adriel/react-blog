import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import Container from '../components/Container';
import PaginationButtons from '../components/PaginationButtons';
import Post from '../components/Post';
import PostGrid from '../components/PostGrid';
import { PostWithoutContent } from '../types/posts';
import { GetPostsResponse } from '../types/responses';
import { getPosts } from '../utils/fetchDocuments';

const Home = () => {
  const [posts, setPosts] = useState<PostWithoutContent[] | null | undefined>();
  const [prevLink, setPrevLink] = useState<string>();
  const [nextLink, setNextLink] = useState<string>();

  const updateStatesWithRes = (res: AxiosResponse<GetPostsResponse>) => {
    setPosts(res.data.posts);
    setNextLink(res.data.next);
    setPrevLink(res.data.prev);
  };

  const clickPrev = () => {
    if (prevLink) {
      getPosts(prevLink, updateStatesWithRes, () => setPosts(null));
    }
  };

  const clickNext = () => {
    if (nextLink) {
      getPosts(nextLink, updateStatesWithRes, () => setPosts(null));
    }
  };

  useEffect(() => {
    getPosts(`/posts`, updateStatesWithRes, (err) => setPosts(null));
  }, []);

  return (
    <main>
      <Helmet>
        <title>Posts - Blog</title>
        <meta
          name='description'
          content='Confira as últimas postagens no blog'
        />
      </Helmet>
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
    </main>
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
