import React, { useState } from "react";
import SelectOption3 from "./SelectOption3";
import { useNavigate } from "react-router-dom";
import post from "../../../axios/post/post";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducer/store";
import ContentsWrap from "./ContentsWrap";
import { cancle } from "../../../axios/post/postCancle";

const Write: React.FC = () => {
    const user = useSelector((state: RootState) => state.user)
    const myMemberId = user?.myMemberId;
    const author = user?.youNick;

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
                                    {/* <div className="post">
                                        <SelectOption3
                                            category={category}
                                            setCategory={setCategory}
                                        />
                                        <label htmlFor="boardFile" className="link">이미지를 업로드 해주세요.!!
                                        </label>
                                        <input type="file" accept=".jpg, .jpeg, .png, .gif, .webp" className="link none" />
                                    </div> */}
                                    <ContentsWrap title={title} contents={contents} setTitle={setTitle} setContents={setContents} />

                                    <div className="create">
                                        <button className="sideBtn mt50 mr20" onClick={(e) => cancle(e)}>
                                            취소
                                        </button>
                                        <button className="sideBtn mt50 submit" onClick={(e) => post(e, category, title, contents, myMemberId, author)}>
                                            작성 완료
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
