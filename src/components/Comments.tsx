import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { api } from '../lib/axios';
import { Comment as IComment } from '../types/comments';
import { GetCommentsResponse } from '../types/responses';
import Comment from './Comment';
import PaginationButtons from './PaginationButtons';

interface IProps {
  postId: string;
}

const Comments = ({ postId }: IProps) => {
  const [comments, setComments] = useState<IComment[] | null>();
  const [nextLink, setNextLink] = useState<string>();
  const [prevLink, setPrevLink] = useState<string>();

  useEffect(() => {
    api
      .get<GetCommentsResponse>(`posts/${postId}/comments`)
      .then((res) => {
        setComments(res.data.comments);
        if (res.data.prev) {
          setPrevLink(res.data.prev);
        }
        if (res.data.next) {
          setNextLink(res.data.next);
        }
      })
      .catch((err) => {
        setComments(null);
      });
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
      <PaginationButtons linkNext={nextLink} linkPrev={prevLink} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default Comments;
