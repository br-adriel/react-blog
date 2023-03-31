import { AxiosResponse } from 'axios';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Container from '../components/Container';
import PaginationButtons from '../components/PaginationButtons';
import PostsList from '../components/PostsList';
import {
  selectPostManagement,
  setPaginationLinks,
  setPosts,
} from '../features/postManagementSlice';
import { selectUser } from '../features/userSlice';
import { GetPostsResponse } from '../types/responses';
import { getPosts } from '../utils/fetchDocuments';

const ManagePosts = () => {
  const { profile } = useSelector(selectUser);
  const dispatch = useDispatch();

  const { prev, next, posts } = useSelector(selectPostManagement);

  const updateStatesWithRes = (res: AxiosResponse<GetPostsResponse>) => {
    dispatch(
      setPosts({
        posts: res.data.posts,
      })
    );
    dispatch(
      setPaginationLinks({
        next: res.data.next ?? null,
        prev: res.data.prev ?? null,
      })
    );
  };

  const clickPrev = () => {
    if (prev) {
      getPosts(prev, updateStatesWithRes, () =>
        dispatch(setPosts({ posts: null }))
      );
    }
  };

  const clickNext = () => {
    if (next) {
      getPosts(next, updateStatesWithRes, () =>
        dispatch(setPosts({ posts: null }))
      );
    }
  };

  useEffect(() => {
    if (profile && (profile.isAdmin || profile.isAuthor)) {
      getPosts('posts/manage', updateStatesWithRes, () =>
        dispatch(setPosts({ posts: null }))
      );
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
          prev={prev ? clickPrev : undefined}
          next={next ? clickNext : undefined}
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
