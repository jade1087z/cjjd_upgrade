export interface User {
    youId: string;
    youPass: string;
    youName: string;
    youNick: string;
    youEmail: string;
    youBirth: string;
    youAddress: string | null;
    youImgFile: string | null;
    youImgSize: string | null;
    memberDelete: number;
    regTime: string | Date;
}