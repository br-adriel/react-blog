import dayjs from 'dayjs';
import { StatusCodes } from 'http-status-codes';
import { Clock, Trash } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { removeComment as removeCommentFromState } from '../features/commentsSlice';
import { selectUser } from '../features/userSlice';
import { api } from '../lib/axios';
import { Comment as IComment } from '../types/comments';

interface IProps {
  comment: IComment;
}

const Comment = ({ comment }: IProps) => {
  const { profile } = useSelector(selectUser);
  const { token } = useSelector(selectUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeComment = () => {
    return api.delete(`comments/${comment._id}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  };

  const clickButton = () => {
    removeComment()
      .then((res) => {
        dispatch(removeCommentFromState({ id: comment._id }));
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === StatusCodes.UNAUTHORIZED) {
            removeComment()
              .then((res) =>
                dispatch(removeCommentFromState({ id: comment._id }))
              )
              .catch((err) => navigate('/login'));
          }
        }
      });
  };

  return (
    <Wrapper>
      <p>{comment.content}</p>
      <TimePosted>
        <Clock />
        <span>{dayjs(comment.createdAt).fromNow(true)}</span>
      </TimePosted>
      <Author>
        {comment.author.email === profile?.email ? (
          <>
            <button
              type='button'
              title='Apagar comentário'
              onClick={clickButton}
            >
              <Trash />
            </button>
            <p>Você</p>
          </>
        ) : (
          <p>{comment.author.firstName + ' ' + comment.author.lastName}</p>
        )}
      </Author>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  top: 0;
  left: 0;
  padding: 16px;
  border-radius: 8px;
  background-color: #fff;
  margin-bottom: 32px;
`;

const TimePosted = styled.div`
  margin-top: 8px;
  display: flex;
  opacity: 0.65;
  gap: 8px;
  align-items: center;

  svg {
    width: 20px;
    height: 20px;
    object-fit: contain;
  }
`;

const Author = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  border-radius: 8px;
  position: absolute;
  right: 16px;
  z-index: 1;
  bottom: calc(-0.5rem - 8px);

  p {
    background-color: #0072e7;
    display: flex;
    align-items: center;
    padding: 12px;
    border-radius: 8px;
    color: #fff;
  }
`;

export default Comment;
