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

  const clickPrev = () => {
    if (prev) {
      getPosts(prev);
    }
  };
  const clickNext = () => {
    if (next) {
      getPosts(next);
    }
  };

  const getPosts = (link: string) => {
    api
      .get<GetCommentsResponse>(link)
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
  };

  useEffect(() => {
    getPosts(`/posts/${postId}/comments`);

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
        {comments.length ? (
          comments.map((c) => <Comment comment={c} key={c._id} />)
        ) : (
          <p>Nenhum comentário</p>
        )}
      </div>
      <PaginationButtons
        prev={prev ? clickPrev : undefined}
        next={next ? clickNext : undefined}
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
