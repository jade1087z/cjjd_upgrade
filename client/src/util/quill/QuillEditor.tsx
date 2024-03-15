// import { ImageResize } from 'quill-image-resize-module-ts';
// import { ImageActions } from '@xeger/quill-image-actions';
// import { ImageFormats } from '@xeger/quill-image-formats';
// Quill.register('modules/imageActions', ImageActions);
// Quill.register('modules/imageFormats', ImageFormats);

import ReactQuill, { Quill } from 'react-quill';
import uploadFile from '../../axios/post/create/uploadPost';
import "../../assets/scss/setting/_quillSnow.scss";
import { useMemo } from 'react';
import ImageResize from '@looop/quill-image-resize-module-react';

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


const QuillEditor = ({ quillRef, onChange, placeholder, contents, setImgFile }) => {
  const handleImageUpload = async (url) => {
    const editor = quillRef.current?.getEditor();
    const range = editor?.getSelection() ?? false;

    if (!range) return;
    editor?.setSelection({
      index: range.index + 1,
      length: range.length + 1,
    });

    const boardImgFile = editor?.insertEmbed(range.index, 'image', url);
    return boardImgFile
  }

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = async () => {
      const file: File | null = input.files ? input.files[0] : null;
      if (!file) return;
      const { name } = file;
      // image 업로드 로직
      const formData = new FormData();
      formData.append('file', file);

      try {
        const url = await uploadFile({ formData });
        if (!url) {
          console.error('file path is undefind', url)
          return
        }
        const imagePath = URL.createObjectURL(file);
        console.log(imagePath)
        setImgFile(handleImageUpload(file))

      } catch (error) {
        console.error('Error uploading file:', error);
      }

    };
  };
  const formats = ['align', 'float', 'width', 'heigh'];

  const modules = useMemo(() => {
    return {
      // imageFormats: {},
      // imageActions: {},
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
        handlers: { image: imageHandler, },
      },
      ImageResize: {
        parchment: Quill.import('parchment'),
        modules: ['Resize', 'DisplaySize'],
      },
    }
  }, [])
  
  return (
    <ReactQuill ref={quillRef} modules={modules} value={contents} onChange={onChange} placeholder={placeholder} />
  )
};

export default QuillEditor;