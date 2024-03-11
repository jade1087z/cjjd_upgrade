// import { uploadFile } from 'apis/@common';
import { ImageResize } from 'quill-image-resize-module-ts';
import { useEffect, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import "../../assets/scss/setting/_quillSnow.scss";

// import { IMediaItem } from 'types/@common';

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

const QuillEditor = ({value, onChange, placeholder}) => {
  const quillRef = useRef<ReactQuill | null>(null);
  

  // const imageHandler = () => {
  //   const input = document.createElement('input');
  //   input.setAttribute('type', 'file');
  //   input.setAttribute('accept', 'image/*');
  //   input.click();
  //   input.onchange = async () => {
  //     const file: File | null = input.files ? input.files[0] : null;
  //     if (!file) return;
  //     const { name } = file;
  //     const mediaForm: IMediaItem = {
  //       name,
  //       type: 'image',
  //       feature: 'resource',
  //       formData: file,
  //       previewImageData: URL.createObjectURL(file),
  //     };
  //     const editor = quillRef.current?.getEditor();
  //     const range = editor?.getSelection() ?? false;
  //     if (!range) return;
  //     const { path } = await uploadFile(mediaForm);
  //     editor?.insertEmbed(range.index, 'image', path);
  //     editor?.setSelection({
  //       index: range.index + 1,
  //       length: range.length + 1,
  //     });
  //   };
  // };

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: Font.whitelist }],
        [{ align: [] }],
        [{ size: ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
          { list: 'ordered' },
          { list: 'bullet' },
          'link',
          { indent: '-1' },
          { indent: '+1' },
        ],
        [
          {
            color: [
              '#000000',
              '#e60000',
              '#ff9900',
              '#ffff00',
              '#008a00',
              '#0066cc',
              'custom-color',
            ],
          },
          { background: [] },
        ],
        ['image', 'video'],
        ['clean'],
      ],
      // handlers: {
      //   image: imageHandler,
      // },
    },
    // ImageResize: {
    //   parchment: Quill.import('parchment'),
    //   modules: ['Resize', 'DisplaySize'],
    // },
  };

  return <ReactQuill ref={quillRef} modules={modules} value={value} onChange={onChange} placeholder={placeholder} />;
};

export default QuillEditor;