export const handleImageUpload = async (quillRef, result, setRange) => {
    const editor = quillRef.current?.getEditor();
    const range = editor?.getSelection() ?? false;
    const { content, mimetype } = result;
    const filename = `data:${mimetype};base64,${content}`
    if (!range) return;
    editor?.setSelection({
      index: range.index + 1,
      length: range.length + 1,
    });

    let handleRange = range.index;
    setRange((currentHandleRange) => {
      if (Array.isArray(currentHandleRange)) {
        return [...currentHandleRange, handleRange];
      } else {
        return [handleRange]
      }
    })
    editor?.insertEmbed(handleRange, 'image', filename);
  }