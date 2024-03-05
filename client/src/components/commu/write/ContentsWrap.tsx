import React from 'react'

const ContentsWrap = ({ title, contents, setTitle, setContents }) => {
    
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
                    <textarea
                        cols={50}
                        rows={1}
                        className="board_input_contents inputStyle placeholder"
                        value={contents}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                            setContents(e.currentTarget.value)
                        }
                        placeholder="내용을 입력하세요"
                    ></textarea>
                   
                </div>
            </div>
        </div>
    )
}

export default ContentsWrap