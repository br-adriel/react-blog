import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Container from '../components/Container';
import PaginationButtons from '../components/PaginationButtons';
import PostsList from '../components/PostsList';
import { selectUser } from '../features/userSlice';
import { PostWithoutContent } from '../types/posts';
import { GetPostsResponse } from '../types/responses';
import { getPosts } from '../utils/fetchDocuments';

const ManagePosts = () => {
  const { profile } = useSelector(selectUser);

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
    if (profile && (profile.isAdmin || profile.isAuthor)) {
      getPosts('posts/manage', updateStatesWithRes, () => setPosts(null));
    }
  }, []);

  if (posts === undefined)
    return (
      <Main>
        <Helmet>
          <title>Gerenciar postagens - Blog</title>
          <meta name='description' content='Gerencie suas postagens no blog' />
        </Helmet>
        <Wrapper>
          <h2>Gerenciar postagens</h2>
          <h3>Carregando...</h3>
        </Wrapper>
      </Main>
    );
  if (posts === null)
    return (
      <Main>
        <Helmet>
          <title>Gerenciar postagens - Blog</title>
          <meta name='description' content='Gerencie suas postagens no blog' />
        </Helmet>
        <Wrapper>
          <h2>Gerenciar postagens</h2>
          <h3>Erro ao carregar postagens</h3>
        </Wrapper>
      </Main>
    );
  return (
    <Main>
      <Helmet>
        <title>Gerenciar postagens - Blog</title>
        <meta name='description' content='Gerencie suas postagens no blog' />
      </Helmet>
      <Wrapper>
        <h2>Gerenciar postagens</h2>
        <PostsList posts={posts} />
        <PaginationButtons
          prev={prevLink ? clickPrev : undefined}
          next={nextLink ? clickNext : undefined}
        />
      </Wrapper>
    </Main>
  );
};

const Main = styled.main`
  padding: 0 16px 16px;
`;

const Wrapper = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default ManagePosts;
