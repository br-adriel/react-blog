import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    font-size: 16px;
    --primary-color: #0072E7;
    --secondary-color: #8338EC;

    accent-color: var(--primary-color);
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  html,
  body,
  div,
  span,
  object,
  iframe,
  figure,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  code,
  em,
  img,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  b,
  u,
  i,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  main,
  canvas,
  embed,
  footer,
  header,
  nav,
  section,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    text-size-adjust: none;
  }

  footer,
  header,
  nav,
  section,
  main {
    display: block;
  }

  body {
    line-height: 1;
  }

  ol,
  ul {
    list-style: none;
  }

  blockquote,
  q {
    quotes: none;
  }

  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  input {
    -webkit-appearance: none;
    border-radius: 0;
  }

  body,
  input,
  label,
  button,
  textarea,
  select,
  option {
    font-family: 'Outfit', sans-serif;
    font-size: 1rem;
  }

  body {
    background: #F5F5FA;
  }

  input, textarea, select, option {
    background-color: #fff;
    border: 1px solid #ededed;
    caret-color: var(--primary-color);
    border-radius: 8px;
    padding: 8px;
    transition: all 0.3s ease-out;
  }
  
  input:focus, textarea:focus, select:focus, option:focus {
   outline-color: var(--primary-color);
  }

  textarea {
    resize: vertical;
  }

  h2 {
    font-size: 2rem;
    font-weight: 600;
  }
  
  h3 {
    font-size: 1.25rem;
    font-weight: 600;
  }

  a {
    display: inline-block;
    color: var(--primary-color);
    text-decoration: none;

    :hover {
      text-decoration: underline;
    }
 
    :visited {
      color: var(--secondary-color);
    }
  }
  

  button, .btn {
    border: none;
    padding: 8px 16px;
    background-color: var(--primary-color);
    color: #fff;
    border-radius: 8px;
    cursor: pointer;
    transition: all .3s ease-out;

    :hover {
      background-color: var(--secondary-color);
    }
  }
`;

export default GlobalStyle;
