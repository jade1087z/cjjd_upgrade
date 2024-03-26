import React from 'react'

const NavMypage = () => {

    const openTab = (tabId: string) => {

    }
    return (
        <div className="tab-menu">
            <button className="tab-button activity" onClick={() => openTab('mypage_main')}            >
                마이페이지
            </button>
            <button
                className="tab-button" onClick={() => openTab('mypage_diary')}>
                일기
            </button>
            <button className="tab-button" onClick={() => openTab('mypage_activity')} >
                내 활동
            </button>
            <button className="tab-button right" onClick={() => openTab('mypage_review')}>
                리뷰
            </button>
        </div>
    )
}

export default NavMypage