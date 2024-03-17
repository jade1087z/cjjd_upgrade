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
    const [imgFile, setImgFile] = useState<ImageFile | null>();
    console.log(imgFile)
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
                                    <ContentsWrap title={title} contents={contents} setTitle={setTitle} setContents={setContents} setImgFile={setImgFile}/>
                                    <div className="create">
                                        <button className="sideBtn mt50 mr20" onClick={(e) => cancle(e)}>
                                            취소
                                        </button>
                                        <button className="sideBtn mt50 submit" onClick={(e) => post({e, title, contents, myMemberId, author, imgFile})}>
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
