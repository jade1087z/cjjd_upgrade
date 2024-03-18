import React, { useState } from "react";
import post from "../../../axios/post/create/post";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducer/store";
import ContentsWrap from "./ContentsWrap";
import { cancle } from "../../../axios/post/create/postCancle";
import { ImageFile } from "../../../interface/post/ImageFile.interface";

const Write: React.FC = () => {
    const user = useSelector((state: RootState) => state.user)
    const myMemberId = user?.myMemberId;
    const author = user?.youNick;

    // const [category, setCategory] = useState<string>("자유게시판");
    const [title, setTitle] = useState<string>("");
    const [contents, setContents] = useState<string>("");
    const [imgFile, setImgFile] = useState<ImageFile [] | string| null>();
    const [imgRange, setImgRange] = useState<number[] | number | null>();

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
                                    <ContentsWrap setTitle={setTitle} setContents={setContents} setImgFile={setImgFile} setImgRange={setImgRange}  />
                                    <div className="create">
                                        <button className="sideBtn mt50 mr20" onClick={(e) => cancle(e)}>
                                            취소
                                        </button>
                                        <button className="sideBtn mt50 submit" onClick={(e) => post({e, title, contents, myMemberId, author, imgFile, imgRange})}>
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
