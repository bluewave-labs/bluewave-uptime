export const formatBytes = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const megabytes = bytes / (1024 * 1024);
  return megabytes.toFixed(2) + " MB";
};

export const checkImage = (url) => {
  const img = new Image();
  img.src = url;
  return img.naturalWidth !== 0;
};

export const bufferTo64 = (bufferData) => {
  const uint8Array = new Uint8Array(bufferData.data);
  const blob = new Blob([uint8Array], { type: bufferData.contentType });
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
};

export const bufferToUrl = (buffer) => {
  console.log(buffer);
  const blob = new Blob([buffer.data], { type: buffer.contentType });
  const url = URL.createObjectURL(blob);

  return url;
};
