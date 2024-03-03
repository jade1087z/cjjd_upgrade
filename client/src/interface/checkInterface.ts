export interface checkInterface {
    idCheck: boolean | null;
    nickCheck: boolean | null;
    emailCheck: boolean | null;
    checkPass:boolean | null;
    setCheck: (value: boolean) => void;
}