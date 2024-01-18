export const isImageUrl = (url: string) => {
  if (!url) {
    return false;
  }
  if (url.startsWith('data:image')) {
    return true;
  }
  const imageExtensions = ['jpg', 'jpeg', 'png'];
  const urlParts = url.split('.');
  if (urlParts.length === 0) {
    return false;
  }
  const urlExtension = urlParts.pop()?.toLowerCase();
  return !!urlExtension && imageExtensions.includes(urlExtension);
};
