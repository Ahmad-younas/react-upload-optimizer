import React, {useRef, useState} from "react"
import { useUploadOptimizer } from "../hooks/useUploadOptimizer"
import { formatBytes } from "../utils/formatBytes"
import type { CompressionOption, OptimizedImageResult } from "../types"

type UploadOptimizerProps = {
    options?:CompressionOption;
    accept?:string;
    label?:string;
    buttonText?:string;
    onOptimized?:(result: OptimizedImageResult) => void;
    onError?:(error: string) => void    
}

export function UploadOptimizer({
    options,
    accept = "image/*",
    label = "Upload and Optimized image",
    buttonText = "Choose Image",
    onOptimized,
    onError
}:UploadOptimizerProps){
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [isDragging, setIsDragging] = useState(false);


    const {optimizeImage, loading, progress, result, error, reset} = useUploadOptimizer();

    const handleFile = async (file: File) => {
    try {
      const optimizedResult = await optimizeImage(file, options);
      onOptimized?.(optimizedResult);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Upload failed.";
      onError?.(message);
    }
  };

  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      await handleFile(file);
    }
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];

    if (file) {
      await handleFile(file);
    }
  };

   return (
    <div style={{ width: "100%", maxWidth: "460px" }}>
      <div
        onDrop={handleDrop}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        style={{
          border: "2px dashed #cbd5e1",
          borderRadius: "14px",
          padding: "28px",
          textAlign: "center",
          background: isDragging ? "#f1f5f9" : "#ffffff",
          cursor: "pointer",
        }}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleInputChange}
          style={{ display: "none" }}
        />

        <p style={{ marginBottom: "12px", fontWeight: 600 }}>{label}</p>

        <button
          type="button"
          disabled={loading}
          style={{
            padding: "10px 16px",
            borderRadius: "8px",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Optimizing..." : buttonText}
        </button>

        {loading && (
          <div style={{ marginTop: "16px" }}>
            <progress value={progress} max={100} style={{ width: "100%" }} />
            <p>{progress}%</p>
          </div>
        )}
      </div>

      {error && (
        <p style={{ marginTop: "12px", color: "red" }}>
          {error}
        </p>
      )}

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Optimization Result</h3>

          <p>Original Size: {formatBytes(result.originalSize)}</p>
          <p>Optimized Size: {formatBytes(result.optimizedSize)}</p>
          <p>
            {result.compressionRatio > 0
                ? `Saved: ${result.compressionRatio}%`
                : "No size reduction. Original file is already optimized."}
          </p>

          <img
            src={result.optimizedPreviewUrl}
            alt="Optimized preview"
            style={{
              width: "100%",
              marginTop: "12px",
              borderRadius: "12px",
            }}
          />

          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "12px",
              padding: "8px 14px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              cursor: "pointer",
            }}
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
}