import uploadFile from "../../axios/post/create/uploadPost";
import { handleImageUpload } from "./handleImageUpload";

export const imageHandler = async (quillRef) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file: File | null = input.files ? input.files[0] : null;
      console.log(file)
      if (!file) return;
      const formData = new FormData();
      formData.append('imgFile', file);
      console.log(formData)
      try {
        const result = await uploadFile(formData);
        if (!result) {
          console.error('file path is undefined', result)
          return
        }
        // file 업로드 성공 후, 이미지 업로드 처리
        handleImageUpload(quillRef, result) 

      } catch (error) {
        console.error('Error uploading file:', error);
      }
    };
  };