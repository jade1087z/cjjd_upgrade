export const handleImageUpload = async (quillRef, result) => {
    const editor = quillRef.current?.getEditor();
    const range = editor?.getSelection() ?? false;
    // const { content, mimetype } = result;
    // const filename = `data:${mimetype};base64,${content}`

    if (!range) return;
    editor?.setSelection({
      index: range.index + 1,
      length: range.length + 1,
    });

    editor?.insertEmbed(range.index, 'image', result);
  }