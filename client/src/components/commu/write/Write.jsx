import React, { useState } from "react";
import SelectOption3 from "./SelectOption3";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Write = () => {
    const navigate = useNavigate();
    const cancle = (e) => {
        if (window.confirm("글 작성을 취소하시겠습니까?")) {
            navigate("/");
        }
    };

    const [category, setCategory] = useState("자유게시판");
    const [title, setTilte] = useState("");
    const [contents, setContents] = useState("");

    const post = (e, category, title, contents) => {
        e.preventDefault();
        console.log(category);
        const body = {
            boardCategory: category,
            boardTitle: title,
            boardContents: contents,
        };

        axios
            .post("/api/post/write", body)
            .then((res) => {
                if (res.data.success) {
                    console.log("axios succ");
                } else {
                    console.log("axios false");
                }
            })
            .catch((err) => {
                console.log(err, "aixos ERR");
            });
    };

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
                                            id="boardTitle"
                                            name="boardTitle"
                                            cols="50"
                                            rows="1"
                                            className="board_input_title inputStyle"
                                            placeholder="제목을 작성해주세요"
                                            required
                                        />
                                    </div>
                                    <div className="contents_wrap">
                                        <div className="board_contents">
                                            <label htmlFor="boardContents"></label>
                                            <textarea
                                                id="boardContents"
                                                name="boardContents"
                                                cols="50"
                                                rows="1"
                                                className="board_input_contents inputStyle placeholder"
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
                                                    contents
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
