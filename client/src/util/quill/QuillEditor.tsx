import ReactQuill, { Quill } from 'react-quill';
import {  useMemo } from 'react';
import ImageResize from '@looop/quill-image-resize-module-react';
import { imageHandler } from './imageHandle';

const Font = Quill.import('formats/font');
Font.whitelist = [
  'sans-serif',
  'arial',
  'comic-sans',
  'courier-new',
  'georgia',
  'helvetica',
  'lucida',
];
Quill.register(Font, true);
Quill.register('modules/ImageResize', ImageResize);


const QuillEditor = ({ quillRef, onChange, placeholder }) => {

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ font: Font.whitelist }],
          [{ align: [] }],
          [{ size: ['small', false, 'large', 'huge'] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }, 'link', { indent: '-1' }, { indent: '+1' },],
          [{ color: ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', 'custom-color',], }, { background: [] },],
          ['image', 'video'],
          ['clean'],
        ],
        handlers: { image: () => imageHandler(quillRef), },
      },
      ImageResize: {
        parchment: Quill.import('parchment'),
        modules: ['Resize', 'DisplaySize'],
      },
    }
  }, [quillRef])

  return (
    <ReactQuill ref={quillRef} modules={modules} onChange={onChange} placeholder={placeholder} />
  )
};

export default QuillEditor;