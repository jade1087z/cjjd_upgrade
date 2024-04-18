import ReactQuill, { Quill } from 'react-quill';
import { useMemo } from 'react';
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

const UpdateQuillEditor = ({ quillRef, onChange, placeholder, contents }) => {

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
            },
        }
    }, [quillRef])

    return (
        <ReactQuill ref={quillRef} modules={modules} value={contents} onChange={onChange} placeholder={placeholder} />
    )
};

export default UpdateQuillEditor;