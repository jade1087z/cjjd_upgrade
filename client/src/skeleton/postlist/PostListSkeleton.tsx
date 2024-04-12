import React from 'react'
import Skeleton from 'react-loading-skeleton'

export const PostListSkeleton = () => {
    return null
}

 
export const MainPageSkeleton = () => {
    return (
        <ul className="board_w100">
             {Array(15).fill(null).map((_, index) => (
                <li key={index}>
                    <Skeleton height={20} />
                </li>
            ))}
        </ul>
    )
}

export default PostListSkeleton