import dayjs from 'dayjs';
import styled from 'styled-components';
import { PostWithContent } from '../types/posts';
import BackButton from './BackButton';

interface IProps {
  post: PostWithContent;
}

const PostVisualizer = ({ post }: IProps) => {
  return (
    <Wrapper>
      <PostTop>
        <PostImage>
          <ReturnButton>
            <BackButton />
          </ReturnButton>
          {!post.image ? null : <img src={post.image} alt='' />}
        </PostImage>
        <PostTitle>
          <h2>{post.title}</h2>
          <h3>{post.author.firstName + ' ' + post.author.lastName}</h3>
        </PostTitle>
      </PostTop>
      <PostContent>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
        <p>Publicado em {dayjs(post.createdAt).format('DD/MM/YYYY')}</p>
      </PostContent>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  gap: 16px;

  img {
    max-width: 100%;
  }
`;

const PostTop = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const PostImage = styled.div`
  position: relative;

  &,
  img {
    border-radius: 8px;
  }

  img {
    width: 100%;
    height: 278px;
    object-fit: cover;
  }
`;

const ReturnButton = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
`;

const PostTitle = styled.div`
  h2 {
    margin-bottom: 4px;
    font-weight: 600;
    font-size: 32px;
    line-height: 40px;
  }

  h3 {
    font-weight: 600;
    font-size: 21px;
    line-height: 26px;
  }
`;

const PostContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  h2 {
    font-size: 1.5rem;
  }

  h3 {
    font-size: 1.3rem;
  }

  h4 {
    font-size: 1.1rem;
  }

  h5,
  h6 {
    font-size: 1rem;
    font-weight: 600;
  }

  p {
    margin-bottom: 12px;
  }
`;

export default PostVisualizer;
