export const handleImageUpload = async (quillRef, result) => {
    const editor = quillRef.current?.getEditor();
    const range = editor?.getSelection() ?? false;

    if (!range) return;
    editor?.setSelection({
      index: range.index + 1,
      length: range.length + 1,
    });

    editor?.insertEmbed(range.index, 'image', result);
  }