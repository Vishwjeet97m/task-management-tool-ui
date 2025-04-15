export const uploadFilesToS3 = async (files, uploadUrls) => {
    if (files.length !== uploadUrls.length) {
      throw new Error("Mismatch between number of files and presigned URLs.");
    }
  
    await Promise.all(
      uploadUrls.map(async (uploadInfo, index) => {
        const file = files[index];
  
        const res = await fetch(uploadInfo.presignedUrl, {
          method: "PUT",
          headers: {
            "Content-Type": file.type,
          },
          body: file,
        });
  
        if (!res.ok) {
          throw new Error(`Failed to upload file: ${file.name}`);
        }
      })
    );
  };
  