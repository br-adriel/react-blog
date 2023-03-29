import styled from 'styled-components';
import { PostWithoutContent } from '../types/posts';
import PostManageCard from './PostManageCard';

interface IProps {
  posts: PostWithoutContent[];
}

const PostsList = ({ posts }: IProps) => {
  if (!posts.length) return <h3>Nenhum post encontrado</h3>;

  return (
    <Wrapper>
      {posts.map((post) => (
        <PostManageCard key={post._id} post={post} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export default PostsList;
