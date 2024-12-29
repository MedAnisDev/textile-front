import fetch from "../../config/interceptor/interceptor.js";
import { BaseUrl, APIS } from "../../config/constants/URLS.js";

export const downloadFile = async(fileName) => {
    const response = await fetch({
      method: "get",
      url: BaseUrl + APIS.FILE.downloadFile(fileName),
      responseType: "blob"
    });
    console.log("downloadFile", response);
    
    const imageBlob = URL.createObjectURL(response);
    console.log("imageBlob", imageBlob);
    return imageBlob
}
