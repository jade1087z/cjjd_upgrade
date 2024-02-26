import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

interface SelectOption3Props {
    category: string,
    setCategory: React.Dispatch<React.SetStateAction<string>>
}

const SelectOption3: React.FC<SelectOption3Props> = ({ category, setCategory }) => {
    const [isActive, setIsActive] = useState(false);
    const options = ["자유게시판", "일기장", "술 신청하기"];
    const handleSelect = (option: string) => {
        setIsActive(false);
        setCategory(option);
    };
    const toggleOptions = () => {
        setIsActive(!isActive);
    };

    return (
        <div
            className={`selectBox3 ${isActive ? "active" : ""}`}
            onClick={() => toggleOptions()}
        >
            <FontAwesomeIcon icon={faAngleDown} />
            <input
                type="hidden"
                id="boardCategory"
                name="boardCategory"
                value="자유게시판"
            />
            <button className="label">{category}</button>
            {isActive && (
                <ul className="optionList">
                    {options.map((option, key) => (
                        <li
                            className="optionItem"
                            key={key}
                            onClick={() => handleSelect(option)}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SelectOption3;
