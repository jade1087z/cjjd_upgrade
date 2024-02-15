import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
const Write = () => {
    return (
        <>
            <div className="best_list boxStyle roundCorner shaDow ">
                <div className="board">
                    <div className="board_form">
                        <form
                            action="board_writeSave.php"
                            method="post"
                            enctype="multipart/form-data"
                        >
                            <legend className="blind"></legend>
                            <div className="form_box">
                                <div className="board_title">
                                    <h2>자유게시판</h2>
                                </div>
                                <div className="board_text">
                                    <div className="post">
                                        <div className="selectBox3">
                                            <FontAwesomeIcon
                                                icon={faAngleDown}
                                            />
                                            <input
                                                type="hidden"
                                                id="boardCategory"
                                                name="boardCategory"
                                                value="자유게시판"
                                            />
                                            <button
                                                className="label"
                                                onclick="document.getElementById('boardCategory').value = this.textContent;"
                                            >
                                                자유게시판
                                            </button>
                                            <ul className="optionList">
                                                <li className="optionItem">
                                                    자유게시판
                                                </li>
                                                <li className="optionItem">
                                                    일기장
                                                </li>
                                                <li className="optionItem">
                                                    술 신청하기
                                                </li>
                                            </ul>
                                        </div>
                                        <label for="boardFile" className="link">
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
                                        <label for="boardTitle"></label>
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
                                            <label for="boardContents"></label>
                                            <textarea
                                                id="boardContents"
                                                name="boardContents"
                                                cols="50"
                                                rows="1"
                                                className="board_input_contents inputStyle placeholder"
                                                placeholder="원하는 술을 신청해주세요"
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="create">
                                        <button
                                            type="submit"
                                            className="sideBtn mt50 mr20"
                                            onclick="window.location.href='board.php'"
                                        >
                                            <h2>취소</h2>
                                        </button>
                                        <button
                                            type="submit"
                                            className="sideBtn mt50 submit"
                                        >
                                            <h2>작성 완료</h2>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Write;
