export function compressImage(file) {
  const blobURL = URL.createObjectURL(file);
  const img = document.createElement('img');
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  return new Promise((resolve) => {
    img.onload = () => {
      const originalWidth = img.width;
      const originalHeight = img.height;
      const targetWidth = 550;
      const scale = originalWidth / targetWidth;
      const targetHeight = originalHeight / scale;
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      console.log(targetWidth, targetHeight);

      ctx.clearRect(0, 0, targetWidth, targetHeight);
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
      canvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/jpeg', 0.8);
    };
    img.src = blobURL;
  });
}
