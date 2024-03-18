export interface ImageFile {
    lastModified: number;
    lastModifiedDate: Date;
    name: string;
    size: number;
    type: string; // 'mimetype' 대신 'type'을 사용합니다.
    content?: string; // 선택적 속성으로, 파일의 실제 내용을 나타냅니다.
}

export interface cloudFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    bucket: string;
    key: string;
    acl:string;
    contentType: string;
    contentDisposition: string | null;
    contentEncoding: string | null;
    storageClass: string;
    serverSideEncryption: string | null;
    metadata: { fieldName: 'imgFile' },
    location: string;
    etag: string;
    versionId: string | number | undefined;
}