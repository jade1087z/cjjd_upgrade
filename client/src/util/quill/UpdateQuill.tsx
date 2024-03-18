import ReactQuill, { Quill } from 'react-quill';
import { useEffect, useMemo } from 'react';
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

const UpdateQuillEditor = ({ quillRef, onChange, placeholder, contents, updateImgFile, updateRange, setNewRange, setNewUpdateImgFile }) => {

    const reader = (file) => {
        const editor = quillRef.current?.getEditor();
        const reader = new FileReader();
        console.log(editor)

        reader.onload = function (e) {
            const base64Image = e.target.result;
            const range = editor?.getSelection() ?? false;
            if (!range) return;
            editor?.setSelection({
                index: range.index + 1,
                length: range.length + 1,
            })

            setNewRange(prevIndices => [...prevIndices, range.index])
            editor.insertEmbed(range.index, 'image', base64Image);
        }
        const fileResult = reader.readAsDataURL(file)
    }

    useEffect(() => {
        const updateImgFiles = JSON.parse(updateImgFile) // 배열로 변환
        const editor = quillRef.current?.getEditor();
        const ranges = updateRange.split(',').map(Number); // 배열로 변환

        if (updateImgFile) {
            if (updateImgFiles && updateImgFiles.length > 0) {
                updateImgFiles.forEach((file, index) => {
                    const range = ranges[index]
                    console.log(editor.insertEmbed(range, 'image', file))
                });
            }
        }
    }, [updateImgFile])


    const imageHandler = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file: File | null = input.files ? input.files[0] : null;
            if (!file) return;

            try {
                reader(file)
                setNewUpdateImgFile((currentFiles) => {
                    if (Array.isArray(currentFiles)) {
                        return [...currentFiles, file];
                    } else {
                        return [file]
                    }
                })
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
        <ReactQuill ref={quillRef} modules={modules} value={contents} onChange={onChange} placeholder={placeholder} />
    )
};

export default UpdateQuillEditor;