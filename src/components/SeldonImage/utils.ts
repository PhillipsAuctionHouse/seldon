export function isImageValid({
  img,
  src,
  srcSet,
  sizes,
}: {
  img: HTMLImageElement | null;
  src: string;
  srcSet?: string;
  sizes?: string;
}) {
  const promise = new Promise((resolve) => {
    let imgElement = img;
    if (!imgElement) {
      imgElement = document.createElement('img');
    }
    imgElement.onerror = () => resolve(false);
    imgElement.onload = () => resolve(true);
    if (srcSet) {
      imgElement.srcset = srcSet;
    }
    if (sizes) {
      imgElement.sizes = sizes;
    }
    imgElement.src = src;
    if (imgElement.complete) {
      resolve(true);
    }
  });

  return promise;
}
