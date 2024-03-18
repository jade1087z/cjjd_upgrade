export interface BoardResult {
    boardId: number;
    myMemberId: number;
    boardTitle: string;
    boardContents: string;
    boardAuthor: string;
    boardView: number;
    boardLike: number;
    boardComment: number;
    boardImgFile: string | null;
    boardImgSize: string | null;
    boardImgRange: number | null;
    boardDelete: number;
    regTime: Date | string;
}