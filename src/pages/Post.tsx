import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import CommentForm from '../components/CommentForm';
import Comments from '../components/Comments';
import Container from '../components/Container';
import PostVisualizer from '../components/PostVisualizer';
import { selectUser } from '../features/userSlice';
import { api } from '../lib/axios';
import { PostWithContent } from '../types/posts';
import { Helmet } from 'react-helmet-async';

const Post = () => {
  const [post, setPost] = useState<PostWithContent | null>();

  const { profile } = useSelector(selectUser);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      api
        .get<{ post: PostWithContent }>(`posts/${id}`)
        .then((res) => {
          const fetchedPost = res.data.post;
          setPost(fetchedPost);
        })
        .catch((err) => {
          setPost(null);
        });
    }
  }, [id]);

  if (post === undefined)
    return (
      <Section>
        <Wrapper>
          <h2>Carregando...</h2>
        </Wrapper>
      </Section>
    );
  if (post === null)
    return (
      <Section>
        <Wrapper>
          <h2>Post não encontrado</h2>
        </Wrapper>
      </Section>
    );
  return (
    <main>
      <Helmet>
        <title>{post.title || 'Carregando post...'} - Blog</title>
        <meta
          name='description'
          content={`Confira a postagem "${post.title}" de ${
            post.author.firstName + ' ' + post.author.lastName
          }`}
        />
      </Helmet>
      <Section>
        <Wrapper>
          <PostVisualizer post={post} />
          <CommentSection>
            <div>
              {profile ? (
                <CommentForm postId={post._id} />
              ) : (
                <div>
                  <h3>
                    <Link to={'/login'}>Faça login</Link> para comentar
                  </h3>
                </div>
              )}
            </div>
            <Comments postId={post._id} />
          </CommentSection>
        </Wrapper>
      </Section>
    </main>
  );
};

const Section = styled.section`
  padding: 16px;
`;

const Wrapper = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 1040px;

  > h2 {
    text-align: center;
  }
`;

const CommentSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media screen and (min-width: 768px) {
    width: 100%;
    flex-direction: row;
    justify-content: flex-start;

    > div {
      width: 50%;
    }
  }
`;

export default Post;
