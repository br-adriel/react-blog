import { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { addComment } from '../features/commentsSlice';
import { selectUser } from '../features/userSlice';
import { api } from '../lib/axios';
import { Comment } from '../types/comments';
import Form from './Form';
import FormGroup from './FormGroup';

interface IProps {
  postId: string;
}

const CommentForm = ({ postId }: IProps) => {
  const { profile } = useSelector(selectUser);
  const [content, setContent] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    api
      .post<{ comment: Comment }>(`posts/${postId}/comments`, {
        content,
      })
      .then((res) => {
        setContent('');
        dispatch(addComment(res.data.comment));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Form onSubmit={submitForm}>
      <FormGroup>
        <Label htmlFor='comment'>Deixe um comentário</Label>
        <Textarea
          name='comment'
          id='comment'
          cols={30}
          rows={4}
          placeholder={`Comentando como ${
            profile?.firstName + ' ' + profile?.lastName
          }`}
          onChange={(e) => setContent(e.target.value)}
          value={content}
        ></Textarea>
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

const Textarea = styled.textarea`
  width: 100%;
`;

export default CommentForm;
