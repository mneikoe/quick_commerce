import bucket from "../config/firebase/firebase.js";
import { URL } from "url";
export const uploadFile = async (fileData, folderName) => {
  return new Promise((resolve, reject) => {
    // Check if fileData and fileData.name are defined
    if (!fileData || !fileData.name) {
      return reject({
        isUploaded: false,
        message: "Invalid file data. File name is missing.",
        url: "",
      });
    }

    const timestamp = Date.now();
    const fullName = fileData.name;

    const match = fullName.match(
      /^(?<originalFileName>.+?)\.(?<extension>[a-zA-Z0-9]+)$/
    );

    if (!match?.groups) {
      return reject({
        isUploaded: false,
        message: "Invalid file name format.",
        url: "",
      });
    }

    let { originalFileName } = match.groups;
    originalFileName = originalFileName.replace(/\s+/g, "_");

    const fileName = `${timestamp}_${originalFileName}`;
    const file = bucket.file(`${folderName}/${fileName}`);

    const stream = file.createWriteStream({
      metadata: {
        contentType: fileData.mimetype,
      },
    });

    stream.on("error", (err) => {
      console.error("File Upload error:", err);
      return reject({
        isUploaded: false,
        message: "Upload failed.",
        url: "",
      });
    });

    stream.on("finish", async () => {
      try {
        await file.makePublic();
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${folderName}/${fileName}`;
        return resolve({
          isUploaded: true,
          url: publicUrl,
          message: "File Uploaded successfully",
        });
      } catch (err) {
        console.error("Error making file public:", err);
        return reject({
          isUploaded: false,
          message: "Failed to make the file public. Please try again.",
          url: "",
        });
      }
    });

    // End the stream after the data is piped in
    stream.end(fileData.data);
  });
};

export const deleteFile = async (fileUrl) => {
  try {
    const parsedUrl = new URL(fileUrl);
    const path = decodeURIComponent(
      parsedUrl.pathname.replace(`/${bucket.name}/`, "")
    );

    const file = bucket.file(path);
    await file.delete();

    return { deleted: true, message: "" };
  } catch (e) {
    return { deleted: false, message: e.message };
  }
};
