import { isAxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { clearTokens, selectUser, setToken } from '../features/userSlice';
import { api } from '../lib/axios';
import { reauthenticate, storeToken } from '../utils/auth';
import Form from './Form';
import FormGroup from './FormGroup';

interface IProps {
  postId: string;
}

const CommentForm = ({ postId }: IProps) => {
  const { profile, refreshToken, token } = useSelector(selectUser);
  const [content, setContent] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const postComment = () => {
    return api.post(
      `posts/${postId}/comments`,
      {
        content,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    postComment()
      .then((res) => {
        setContent('');
      })
      .catch((error) => {
        if (isAxiosError(error) && error.response) {
          if (error.response.status === StatusCodes.UNAUTHORIZED) {
            reauthenticate(refreshToken!).then((newToken) => {
              if (newToken) {
                dispatch(setToken({ token: newToken }));
                storeToken(newToken);
                postComment();
                setContent('');
              } else {
                dispatch(clearTokens());
                navigate('/login');
              }
            });
          }
        }

        if (error.response.errors) {
          const errors = error.response.errors;
          console.log(errors);
        }
      });
  };

  return (
    <Form onSubmit={submitForm}>
      <FormGroup>
        <Label htmlFor='comment'>Deixe um comentário</Label>
        <textarea
          name='comment'
          id='comment'
          cols={30}
          rows={4}
          placeholder={`Comentando como ${
            profile?.firstName + ' ' + profile?.lastName
          }`}
          onChange={(e) => setContent(e.target.value)}
          value={content}
        ></textarea>
      </FormGroup>
      <button type='submit'>Comentar</button>
    </Form>
  );
};

const Label = styled.label`
  font-weight: 600;
  font-size: 21px;
  line-height: 26px;
`;

export default CommentForm;
