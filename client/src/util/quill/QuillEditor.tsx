import ReactQuill, { Quill } from 'react-quill';
import { useMemo } from 'react';
import ImageResize from '@looop/quill-image-resize-module-react';
import uploadFile from '../../axios/post/create/uploadPost';
import { handleImageUpload } from './handleImageUpload';

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

// const reader = (file) => {
//   const editor = quillRef.current?.getEditor();
//   const reader = new FileReader();
//   console.log(editor)

//   reader.onload = function (e) {
//     const base64Image = e.target.result;
//     const range = editor?.getSelection() ?? false;
//     if (!range) return;
//     editor?.setSelection({
//       index: range.index + 1,
//       length: range.length + 1,
//     })
//     console.log(range.index, 'update여기는')
//     setImgRange(range.index)
//     editor.insertEmbed(range.index, 'image', base64Image);
//   }
//   const fileResult = reader.readAsDataURL(file)
// }

const QuillEditor = ({ quillRef, onChange, placeholder, setImgFile, setImgRange }) => {

  const initMutationObserver = () => {
    const editor = quillRef.current?.getEditor();
    const config = { childList: true, subtree: true }; // 관찰 설정: 자식 요소의 추가 또는 삭제 감지

    const callback = function (mutationsList, observer) {
      for (let mutation of mutationsList) {
        if (mutation.type === 'childList' && mutation.removedNodes.length > 0) {
          mutation.removedNodes.forEach((removedNode) => {
            // 삭제된 노드가 이미지인지 확인
            if (removedNode.tagName === 'IMG') {
              // 이미지의 고유 ID를 data-id 속성에서 추출
              const imageId = removedNode.getAttribute('data-id');
              
              // 상태 업데이트 로직에서 이 ID를 사용하여 해당 이미지를 제거
              setImgFile((currentFiles) => {
                return currentFiles.filter(file => `${file.name}-${file.size}-${file.lastModified}` !== imageId);
              });
            }
          });
        }
      }
    };

    const observer = new MutationObserver(callback);
    observer.observe(editor, config);
    observer.disconnect()
  }

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file: File | null = input.files ? input.files[0] : null;
      if (!file) return;
      const formData = new FormData();
      formData.append('file', file);

      try {
        const result = await uploadFile({ formData });
        if (!result) {
          console.error('file path is undefind', result)
          return
        }
        // reader(file)
        console.log(result)
        console.log(file)
        handleImageUpload(quillRef, result, setImgRange) // -> url을 setContents에 순차적으로 저장시키기 위한 방법
        setImgFile((currentFiles) => {
          const newFile = {
            ...file,
            id: `${file.name}-${file.size}-${file.lastModified}`,
            file: file,
          };
          
          return Array.isArray(currentFiles) ? [...currentFiles, newFile] : [newFile];
        });// ==> 배열 펼침으로 기존의 값을 유지하며 순차적으로 file 객체 저장 
        initMutationObserver()
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    };
  };

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
        handlers: { image: imageHandler, },
      },
      ImageResize: {
        parchment: Quill.import('parchment'),
        modules: ['Resize', 'DisplaySize'],
      },
    }
  }, [])

  return (
    <ReactQuill ref={quillRef} modules={modules} onChange={onChange} placeholder={placeholder} />
  )
};

export default QuillEditor;