export type OutputImageType = "image/jpeg" | "image/png" | "image/webp"

export type CompressionOption = {
    maxWidth?: number,
    maxHeight?:number,
    quality?: number,
    outputType?: OutputImageType,
    fileName?: string
}

export type OptimizedImageResult = {
    file: File,
    originalFile: File;
    originalSize: number;
    optimizedSize: number;
    originalPreviewUrl: string;
    optimizedPreviewUrl: string;
    compressionRatio: number;
}