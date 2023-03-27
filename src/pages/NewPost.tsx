import { Editor } from '@tinymce/tinymce-react';
import { FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Editor as TinyMCEEditor } from 'tinymce';
import Container from '../components/Container';
import Form from '../components/Form';
import FormGroup from '../components/FormGroup';
import Switch from '../components/Switch';
import SwitchInput from '../components/SwitchInput';
import TextEditor from '../components/TextEditor';
import { api } from '../lib/axios';
import { initSettings } from '../lib/tinyMCE';

const NewPost = () => {
  const [title, setTitle] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [publishNow, setPublishNow] = useState<boolean>(true);
  const editorRef = useRef<TinyMCEEditor | null>(null);

  const navigate = useNavigate();

  const createPost = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editorRef.current) {
      const content = editorRef.current.getContent();
      if (content.length) {
        api
          .post('/posts', {
            image,
            title,
            publishNow,
            content: content,
          })
          .then((res) => {
            console.log(res.data);
            setTitle('');
            editorRef.current?.resetContent();
            navigate('/');
          });
      }
    }
  };

  return (
    <Main>
      <Wrapper>
        <h2>Nova postagem</h2>
        <Form onSubmit={createPost}>
          <FormGroup>
            <label htmlFor='image'>Imagem de capa:</label>
            <input
              type='url'
              name='image'
              id='image'
              required
              value={image}
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <p>Conteúdo:</p>
            <TextEditor
              onInit={(evt, editor) => (editorRef.current = editor)}
            />
          </FormGroup>
          <FormGroup>
            <SwitchInput
              id='publishNow'
              name='publishNow'
              defaultChecked={publishNow}
              onCheckedChange={(checked) => setPublishNow(checked)}
            >
              Publicar agora
            </SwitchInput>
          </FormGroup>
          <button type='submit'>Postar</button>
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

export default NewPost;
