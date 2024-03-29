export interface commentResponse {
    success: boolean;
    result: comment [];
    total: number;
    more: boolean;
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