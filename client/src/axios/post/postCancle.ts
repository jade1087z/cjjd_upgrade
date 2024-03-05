export const cancle = (e: React.MouseEvent) => {
    if (window.confirm("글 작성을 취소하시겠습니까?")) {
        window.location.href ="/";
    }
};