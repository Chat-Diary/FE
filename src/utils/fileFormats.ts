export const isImageUrl = (url: string) => {
  if (!url) {
    return false;
  } else {
    const base64Regex = /^data:image\/[a-z]+;base64,/;
    return base64Regex.test(url);
  }
};
