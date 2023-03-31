import { FormEvent, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Editor as TinyMCEEditor } from 'tinymce';
import Container from '../components/Container';
import Form from '../components/Form';
import FormGroup from '../components/FormGroup';
import TextEditor from '../components/TextEditor';
import { api } from '../lib/axios';
import { GetPostResponse } from '../types/responses';

const EditPost = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [title, setTitle] = useState<string | null>();
  const [image, setImage] = useState<string | null>();
  const editorRef = useRef<TinyMCEEditor | null>(null);

  const updatePost = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editorRef.current && id) {
      const content = editorRef.current.getContent();
      if (content.length && title && image) {
        api
          .patch(`/posts/${id}`, {
            title,
            image,
            content,
          })
          .then((res) => {
            navigate(`/posts/${id}`);
          })
          .catch((err) => {});
      }
    }
  };

  useEffect(() => {
    if (id) {
      api
        .get<GetPostResponse>(`/posts/${id}`)
        .then((res) => {
          setTitle(res.data.post.title);
          setImage(res.data.post.image);
          editorRef.current?.setContent(res.data.post.content);
        })
        .catch((err) => {
          setTitle(null);
          setImage(null);
        });
    }
  }, [id]);

  if (title === null && image === null) {
    <Main>
      <Wrapper>
        <h2>Ediatr postagem</h2>
        <h3>Você não tem permissão para editar esse post</h3>
      </Wrapper>
    </Main>;
  }
  return (
    <Main>
      <Helmet>
        <title>Editar postagem - Blog</title>
        <meta name='description' content='Edite uma postagem do blog' />
      </Helmet>
      <Wrapper>
        <h2>Editar postagem</h2>
        <Form onSubmit={updatePost}>
          <FormGroup>
            <label htmlFor='image'>Imagem de capa:</label>
            <input
              type='url'
              name='image'
              id='image'
              required
              value={image || ''}
              onChange={(e) => setImage(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor='title'>Título:</label>
            <input
              type='text'
              name='title'
              id='title'
              required
              value={title || ''}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <p>Conteúdo:</p>
            <TextEditor
              onInit={(evt, editor) => (editorRef.current = editor)}
            />
          </FormGroup>
          <button type='submit'>Atualizar</button>
        </Form>
      </Wrapper>
    </Main>
  );
};

const Main = styled.main`
  margin-bottom: 16px;
`;

const Wrapper = styled(Container)`
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default EditPost;
