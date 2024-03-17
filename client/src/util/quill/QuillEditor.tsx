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

  // const handleImageUpload = async (result) => {
  //   const editor = quillRef.current?.getEditor();
  //   const range = editor?.getSelection() ?? false;
  //   const { content, mimetype } = result;
  //   const filename = `data:${mimetype};base64,${content}`


  //   if (!range) return;
  //   editor?.setSelection({
  //     index: range.index + 1,
  //     length: range.length + 1,
  //   });

  //   const boardImgFile = editor?.insertEmbed(range.index, 'image', filename);

  // }

  const reader = (file) => {
    const editor = quillRef.current?.getEditor();

    const reader = new FileReader();
    reader.onload = function (e) {
      const base64Image = e.target.result;
      const range = editor?.getSelection() ?? false;

      if (!range) return;

      editor?.setSelection({
        index: range.index + 1,
        length: range.length + 1,
      })
      editor.insertEmbed(range.index, 'image', base64Image);
    }

    const fileResult = reader.readAsDataURL(file)
  }

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    // const formData = new FormData();
    // formData.append('file', file);
    // const result = await uploadFile({ formData });
    // if (!result) {
    //   console.error('file path is undefind', result)
    //   return
    // }
    
    input.onchange = async () => {
      const file: File | null = input.files ? input.files[0] : null;
      if (!file) return;
      try {
        reader(file)
        setImgFile(file)
      } catch (error) {
        console.error('Error uploading file:', error);
      }

    };
  };

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