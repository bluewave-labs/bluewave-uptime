import { useMemo } from "react";

export const bytesToUrl = (bytes) => {
  return useMemo(() => {
    const blob = new Blob([bytes], { type: "image/jpeg" });
    const url = URL.createObjectURL(blob);
    return url;
  }, [bytes]);
};

export const formatBytes = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const megabytes = bytes / (1024 * 1024);
  return megabytes.toFixed(2) + " MB";
};

export const checkImage = (url) => {
  const img = new Image();
  img.src = url;
  return img.naturalWidth !==0;
}