import React, { useState } from "react";
import SelectOption3 from "./SelectOption3";
import { useNavigate } from "react-router-dom";
import post from "../../../axios/post/post";

const Write: React.FC = () => {
    const navigate = useNavigate();
    const cancle = (e: React.MouseEvent) => {
        if (window.confirm("글 작성을 취소하시겠습니까?")) {
            navigate("/");
        }
    };

    const [category, setCategory] = useState<string>("자유게시판");
    const [title, setTitle] = useState<string>("");
    const [contents, setContents] = useState<string>("");

    

    return (
        <>
            <div className="best_list boxStyle roundCorner shaDow ">
                <div className="board">
                    <div className="board_form">
                        <div className="form">
                            <legend className="blind"></legend>
                            <div className="form_box">
                                <div className="board_title">
                                    <h2>자유게시판</h2>
                                </div>
                                <div className="board_text">
                                    <div className="post">
                                        <SelectOption3
                                            category={category}
                                            setCategory={setCategory}
                                        />
                                        <label
                                            htmlFor="boardFile"
                                            className="link"
                                        >
                                            이미지를 업로드 해주세요.!!
                                        </label>
                                        <input
                                            type="file"
                                            id="boardFile"
                                            name="boardFile"
                                            accept=".jpg, .jpeg, .png, .gif, .webp"
                                            className="link none"
                                        />
                                    </div>
                                    <div className="post_title">
                                        <label htmlFor="boardTitle"></label>
                                        <input
                                            type="text"
                                            className="board_input_title inputStyle"
                                            placeholder="제목을 작성해주세요"
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
                                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                                    setContents(e.currentTarget.value)
                                                }
                                                placeholder="내용을 입력하세요"
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="create">
                                        <button
                                            className="sideBtn mt50 mr20"
                                            onClick={(e) => cancle(e)}
                                        >
                                            <h2>취소</h2>
                                        </button>
                                        <button
                                            className="sideBtn mt50 submit"
                                            onClick={(e) =>
                                                post(
                                                    e,
                                                    category,
                                                    title,
                                                    contents,
                                                    navigate
                                                )
                                            }
                                        >
                                            <h2>작성 완료</h2>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Write;
