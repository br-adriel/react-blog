import { Editor } from '@tinymce/tinymce-react';
import styled from 'styled-components';
import { initSettings } from '../lib/tinyMCE';

interface IProps extends React.ComponentProps<typeof Editor> {}

const TextEditor = ({ ...rest }: IProps) => {
  return (
    <Wrapper>
      <Editor
        initialValue=''
        apiKey={import.meta.env.VITE_TINY_MCE_API_KEY}
        init={initSettings}
        {...rest}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  background-color: #fff;
  padding: 8px;

  &,
  > * {
    border-radius: 8px;
  }
`;

export default TextEditor;
