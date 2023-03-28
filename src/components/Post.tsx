import dayjs from 'dayjs';
import { Clock } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PostWithoutContent } from '../types/posts';

interface IProps {
  post: PostWithoutContent;
}

const Post = ({ post }: IProps) => {
  return (
    <Wrapper to={`/posts/${post._id}`}>
      <img src={post.image} alt='' />
      <div>
        <div>
          <h2>{post.title}</h2>
          <h3>{post.author.firstName + ' ' + post.author.lastName}</h3>
        </div>
        <PostDate>
          <Clock />
          <p>{dayjs(post.createdAt).fromNow(true)}</p>
        </PostDate>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 8px;
  background: #ffffff;
  border-radius: 8px;
  transition: box-shadow 0.3s ease-out;

  &,
  :hover,
  :visited {
    color: #000;
    text-decoration: none;
  }

  :hover {
    box-shadow: 0px 2px 4px rgba(186, 186, 186, 0.2);
  }

  img {
    border-radius: 8px;
    width: 100%;
    height: 160px;
    object-fit: cover;
  }

  h2 {
    font-weight: 600;
    font-size: 21px;
    line-height: 26px;
  }

  h3,
  p {
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
  }

  > div {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    align-items: center;

    div {
      display: flex;
      flex-direction: column;
    }
  }
`;

const PostDate = styled.div`
  align-items: center;
  justify-content: center;
  gap: 2px;
  opacity: 0.65;
  min-width: 20px;

  svg {
    width: 16px;
    height: 16px;
    object-fit: contain;
  }
`;

export default Post;
