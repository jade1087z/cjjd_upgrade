import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
const AsideSearch = () => {
    return (
        <div className="search_box side_box roundCorner shaDow">
            <input type="text" placeholder="취중진담 통합 검색" id="search" />
            <button type="submit" id="searchBtn">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
        </div>
    )
}

export default AsideSearch