import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  clearComments,
  selectComments,
  setComments,
} from '../features/commentsSlice';
import { api } from '../lib/axios';
import { GetCommentsResponse } from '../types/responses';
import Comment from './Comment';
import PaginationButtons from './PaginationButtons';

interface IProps {
  postId: string;
}

const Comments = ({ postId }: IProps) => {
  const { comments, prev, next } = useSelector(selectComments);

  const dispatch = useDispatch();

  useEffect(() => {
    api
      .get<GetCommentsResponse>(`posts/${postId}/comments`)
      .then((res) => {
        dispatch(
          setComments({
            comments: res.data.comments,
            next: res.data.next || null,
            prev: res.data.prev || null,
          })
        );
      })
      .catch((err) => {
        dispatch(
          setComments({
            comments: null,
            prev: null,
            next: null,
          })
        );
      });

    return () => {
      dispatch(clearComments());
    };
  }, []);

  if (comments === null) return <h3>Erro ao carregar comentários</h3>;
  if (comments === undefined) return <h3>Carregando comentários...</h3>;
  return (
    <Wrapper>
      <h3>Comentários</h3>
      <div>
        {comments.map((c) => (
          <Comment comment={c} key={c._id} />
        ))}
      </div>
      <PaginationButtons
        linkNext={next || undefined}
        linkPrev={prev || undefined}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default Comments;
