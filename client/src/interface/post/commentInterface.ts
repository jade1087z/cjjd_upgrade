export interface commentResponse {
    success: boolean;
    comments: comment [];
    total: number;
}

export interface comment {
    commentId: number;
    myMemberId: number;
    boardId: number;
    acId: number;
    commentName: string;
    commentMsg: number;
    commentDelete: number;
    regTime: Date | string;
}