export interface ImageFile {
    lastModified: number;
    lastModifiedDate: Date;
    name: string;
    size: number;
    type: string; // 'mimetype' 대신 'type'을 사용합니다.
    content?: string; // 선택적 속성으로, 파일의 실제 내용을 나타냅니다.
}