import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleDown,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
const SearchList = () => {
    return (
        <div className="search_form">
            <div className="selectBox2 ">
                <FontAwesomeIcon icon={faAngleDown} />
                <button className="label">게시글</button>
                <ul className="optionList">
                    <li className="optionItem">게시글</li>
                    <li className="optionItem">제목만</li>
                    <li className="optionItem">작성자</li>
                </ul>
            </div>
            <div className="board_search_form ">
                <div className="board_search_option">
                    <div id="search_input" className="board_search_box ">
                        <label htmlFor="search" className="blind">
                            검색창
                        </label>
                        <input
                            type="text"
                            id="search"
                            name="search"
                            placeholder="검색어를 입력해주세요"
                            className="im"
                        />
                        <button>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchList;
