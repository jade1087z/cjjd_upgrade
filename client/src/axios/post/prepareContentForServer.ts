export async function prepareContentForServer (contents) {
    // const imgRegex = /<img src="data:image\/[^;]+;base64,[^"]+"/g;
    // let match;
    // let imagesToUpload = []

    // while ((match = imgRegex.exec(contents)) !== null) {
    //     imagesToUpload.push(match[0]);
    // }

    // for (let base64Image of imagesToUpload) {
    //     const base64Data = base64Image.replace(/<img src="|"/g, '');
        
    // }
    // contents에서 모든 <img> 태그를 빈 문자열로 대체
    const imgRegex = /<img src="data:image\/[^;]+;base64,[^"]+">/g;
    const updatedContents = contents.replace(imgRegex, '');
    return updatedContents;
}
export async function onlyText (contents) {
 
    const imgRegex = /<img src="\[\&quot;https:\/\/cjjdup\.kr\.object\.ncloudstorage\.com\/post\/[a-zA-Z0-9]+\.png\&quot;,(?:\&quot;https:\/\/cjjdup\.kr\.object\.ncloudstorage\.com\/post\/[a-zA-Z0-9]+\.png\&quot;,)*\&quot;https:\/\/cjjdup\.kr\.object\.ncloudstorage\.com\/post\/[a-zA-Z0-9]+\.png\&quot;\]">/g;
    const updatedContents = contents.replace(imgRegex, '');
    return updatedContents;
}