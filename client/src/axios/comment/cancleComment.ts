interface cancleCommentProps {
    e: React.MouseEvent,
    msgUpdate: boolean[],
    setMsgUpdate: (arg: boolean[]) => void,
    key: number
}
export const cancleComment = ({ e, msgUpdate, setMsgUpdate, key }: cancleCommentProps) => {
    e.preventDefault()
    const newMsgUpdate = [...msgUpdate];
    newMsgUpdate[key] = false;
    setMsgUpdate(newMsgUpdate)
}
export default cancleComment