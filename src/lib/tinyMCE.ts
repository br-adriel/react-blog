export const initSettings = {
  skin: 'borderless',
  height: 500,
  menubar: false,
  plugins: [
    'advlist',
    'autolink',
    'lists',
    'link',
    'image',
    'charmap',
    'anchor',
    'searchreplace',
    'visualblocks',
    'code',
    'fullscreen',
    'insertdatetime',
    'media',
    'table',
    'preview',
    'help',
    'wordcount',
  ],
  toolbar:
    'undo redo | blocks | ' +
    'bold italic forecolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'removeformat | help',
  content_style: `@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;700&display=swap');
    body {
      font-family: Outfit;
      font-size: 1rem;
    }`,
};
