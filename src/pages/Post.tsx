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
import { Comment } from '../types/comments';
import { PostWithContent } from '../types/posts';

const Post = () => {
  const [post, setPost] = useState<PostWithContent | null>();

  const { token } = useSelector(selectUser);
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
    <Section>
      <Wrapper>
        <PostVisualizer post={post} />
        <CommentSection>
          <div>
            {token ? (
              <CommentForm postId={post._id} />
            ) : (
              <div>
                <p>
                  <Link to={'/login'}>Faça login</Link> para comentar
                </p>
              </div>
            )}
          </div>
          <Comments postId={post._id} />
        </CommentSection>
      </Wrapper>
    </Section>
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
  @media screen and (min-width: 768px) {
    width: 100%;
    display: flex;
    gap: 24px;
    justify-content: flex-start;

    > div {
      width: 50%;
    }
  }
`;

export default Post;
