import type { CompressionOption, OptimizedImageResult } from "../types";

function loadImage(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject)=>{
        const image = new Image();
        const imageURL = URL.createObjectURL(file);

        image.onload = () =>{
            URL.revokeObjectURL(imageURL);
            resolve(image);
        };

        image.onerror = () => {
            URL.revokeObjectURL(imageURL);
            reject(new Error("Failed to load Image"));
        };

        image.src = imageURL;

    })
}

function calculateSize(
     width: number,
  height: number,
  maxWidth?: number,
  maxHeight?: number
){

    let newWidth = width;
    let newHeight = height;

    if (maxWidth && newWidth > maxWidth) {
    newHeight = Math.round((newHeight * maxWidth) / newWidth);
    newWidth = maxWidth;
  }

  if (maxHeight && newHeight > maxHeight) {
    newWidth = Math.round((newWidth * maxHeight) / newHeight);
    newHeight = maxHeight;
  }

  return {
    width: newWidth,
    height: newHeight,
  };

}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  outputType: string,
  quality: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Failed to compress image."));
          return;
        }

        resolve(blob);
      },
      outputType,
      quality
    );
  });
}

function getFileExtension(outputType: string): string {
  switch (outputType) {
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    default:
      return "jpg";
  }
}


export async function compressImage(
  file: File,
  options: CompressionOption = {}
): Promise<OptimizedImageResult> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Only image files are supported.");
  }

  const {
    maxWidth = 1280,
    maxHeight = 1280,
    quality = 0.8,
    outputType = "image/webp",
    fileName,
  } = options;

  const image = await loadImage(file);

  const { width, height } = calculateSize(
    image.width,
    image.height,
    maxWidth,
    maxHeight
  );

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Canvas is not supported in this browser.");
  }

  context.drawImage(image, 0, 0, width, height);

  const blob = await canvasToBlob(canvas, outputType, quality);

  const extension = getFileExtension(outputType);
  const finalFileName =
    fileName || file.name.replace(/\.[^/.]+$/, `.${extension}`);

  const optimizedFile = new File([blob], finalFileName, {
    type: outputType,
    lastModified: Date.now(),
  });

  const isOptimizedSmaller = optimizedFile.size < file.size;

  const finalFile = isOptimizedSmaller ? optimizedFile : file;

  const compressionRatio =
    file.size > 0
      ? Number((((file.size - optimizedFile.size) / file.size) * 100).toFixed(2))
      : 0;

  return {
    file: finalFile,
    originalFile: file,
    originalSize: file.size,
    optimizedSize: finalFile.size,
    originalPreviewUrl: URL.createObjectURL(file),
    optimizedPreviewUrl: URL.createObjectURL(finalFile),
    compressionRatio,
  };
}