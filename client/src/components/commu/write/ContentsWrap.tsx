import React, { useEffect, useRef, useState } from 'react'
import QuillEditor from '../../../util/quill/QuillEditor'
import ReactQuill, { Quill } from 'react-quill';
const QuillEditorLazy = React.lazy(() => import('../../../util/quill/QuillEditor'));
interface ContentsWrapProps {
    title: string;
    contents: string;
    setTitle: (value: string) => void;
    setContents: (value: string) => void;
    setImgFile: (value: string) => void;
}
const ContentsWrap: React.FC<ContentsWrapProps> = ({ title, contents, setTitle, setContents, setImgFile }) => {
    const quillRef = useRef<any>(null);
    const [isEditorReady, setEditorReady] = useState(false);
    
    useEffect(() => {
        setEditorReady(true);
        
    }, [quillRef]);
    
    return (
        <div>
            <div className="post_title">
                <label htmlFor="boardTitle"></label>
                <input
                    type="text"
                    className="board_input_title inputStyle"
                    placeholder="제목을 작성해주세요"
                    value={title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setTitle(e.currentTarget.value)
                    }
                    required
                />
            </div>
            <div className="contents_wrap">
                <div className="board_contents">
                    <label htmlFor="boardContents"></label>
                    {/* <QuillEditor quillRef={quillRef} onChange={setContents} placeholder={'내용을 입력하세요'} contents={contents} setImgFile={setImgFile} /> */}
                    {isEditorReady && (
                        <React.Suspense fallback={<div>Loading...</div>}>
                            <QuillEditorLazy quillRef={quillRef} onChange={setContents} placeholder={'내용을 입력하세요'} contents={contents} setImgFile={setImgFile} />
                        </React.Suspense>
                    )}
                </div>
            </div>
        </div>
    )
}
// react.lazy + suspense 를 통해 동적 importing
export default ContentsWrap