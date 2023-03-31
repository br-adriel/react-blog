import dayjs from 'dayjs';
import { Pen, Trash2Fill, Upload } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { api } from '../lib/axios';
import { PostWithoutContent } from '../types/posts';

interface IProps {
  post: PostWithoutContent;
}

const PostManageCard = ({ post }: IProps) => {
  const publishPost = () => {
    api.patch(`posts/${post._id}/publish`).then().catch();
  };

  const removePost = () => {
    api.delete(`posts/${post._id}`).then().catch();
  };

  return (
    <Wrapper>
      <p>{post.title}</p>
      <p>{post.author.firstName + ' ' + post.author.lastName}</p>
      <p>
        {post.publishDate
          ? dayjs(post.publishDate).format('DD/MM/YYYY')
          : 'Não publicado'}
      </p>
      <Actions>
        {!post.isPublished && (
          <button type='button' title='Publicar post' onClick={publishPost}>
            <Upload />
          </button>
        )}
        <Link
          className='btn'
          to={`/posts/${post._id}/edit`}
          title='Editar post'
        >
          <Pen />
        </Link>
        <button type='button' title='Apagar post' onClick={removePost}>
          <Trash2Fill />
        </button>
      </Actions>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 8px;
  padding: 8px 12px;
  transition: box-shadow 300ms ease-out;
  gap: 8px;

  p:first-of-type {
    flex-grow: 1;
    font-weight: 600;
  }

  > *:not(p:first-of-type) {
    flex-shrink: 0;
  }

  :hover {
    box-shadow: 0 2px 4px #22222210;
  }

  @media screen and (min-width: 768px) {
    justify-content: space-between;
    align-items: center;
    gap: 24px;
    flex-direction: row;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;

  > * {
    flex-grow: 1;
  }

  @media screen and (min-width: 768px) {
    min-width: 136px;
    justify-content: flex-end;

    > * {
      flex-grow: 0;
    }
  }
`;

export default PostManageCard;
