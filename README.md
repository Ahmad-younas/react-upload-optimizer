# React Upload Optimizer

<div align="center">

A lightweight, zero-dependency React library for optimizing image uploads with compression, resizing, format conversion, and TypeScript support.

[![npm version](https://img.shields.io/npm/v/react-upload-optimizer.svg)](https://www.npmjs.com/package/react-upload-optimizer)
[![npm downloads](https://img.shields.io/npm/dm/react-upload-optimizer.svg)](https://www.npmjs.com/package/react-upload-optimizer)
[![license](https://img.shields.io/npm/l/react-upload-optimizer.svg)](https://github.com/yourusername/react-upload-optimizer/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18+-61dafb.svg)](https://reactjs.org/)

[Features](#features) •
[Installation](#installation) •
[Quick Start](#quick-start) •
[Documentation](#api-documentation) •
[Examples](#examples) •
[Contributing](#contributing)

</div>

---

## Why React Upload Optimizer?

Modern web applications need efficient image handling. Large images slow down uploads, increase storage costs, and hurt user experience. React Upload Optimizer solves this by:

- **Reducing file sizes** by up to 80% while maintaining visual quality
- **Processing images client-side** to reduce server load and bandwidth
- **Converting to modern formats** like WebP for better compression
- **Providing instant feedback** with progress tracking and previews
- **Zero configuration** with sensible defaults that work out of the box

Perfect for profile pictures, product images, galleries, and any image upload scenario.

---

## Features

✅ **Image Compression** - Reduce file sizes with configurable quality (0.0-1.0)  
✅ **Smart Resizing** - Set max width/height while preserving aspect ratio  
✅ **Format Conversion** - Convert to WebP, JPEG, or PNG  
✅ **Drag & Drop UI** - Built-in component with drag and drop support  
✅ **Flexible Hook API** - Use `useUploadOptimizer` for custom UIs  
✅ **TypeScript Support** - Full type safety with comprehensive type definitions  
✅ **Size Comparison** - Visual comparison of original vs optimized  
✅ **Progress Tracking** - Real-time progress updates during optimization  
✅ **Error Handling** - Graceful error handling with user-friendly messages  
✅ **Zero Dependencies** - No external dependencies, just React  
✅ **Lightweight** - Tiny bundle size, won't bloat your app  
✅ **Browser Support** - Works in all modern browsers  

---

## Installation

```bash
npm install react-upload-optimizer
```

```bash
yarn add react-upload-optimizer
```

```bash
pnpm add react-upload-optimizer
```

**Requirements:**
- React 18 or higher
- Modern browser with Canvas API support

---

## Quick Start

### Using the Component (Easiest)

```tsx
import { UploadOptimizer } from 'react-upload-optimizer';

function App() {
  return (
    <UploadOptimizer
      options={{
        maxWidth: 1280,
        maxHeight: 1280,
        quality: 0.8,
        outputType: 'image/webp'
      }}
      onOptimized={(result) => {
        console.log('Optimized file:', result.file);
        console.log('Saved:', result.compressionRatio + '%');
        // Upload result.file to your server
      }}
    />
  );
}
```

### Using the Hook (More Control)

```tsx
import { useUploadOptimizer } from 'react-upload-optimizer';

function CustomUpload() {
  const { optimizeImage, loading, progress, result, error } = useUploadOptimizer();

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const optimized = await optimizeImage(file, {
      maxWidth: 1000,
      quality: 0.75,
      outputType: 'image/webp'
    });

    // Upload optimized.file to your server
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleUpload} />
      {loading && <p>Optimizing... {progress}%</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result && <img src={result.optimizedPreviewUrl} alt="Preview" />}
    </div>
  );
}
```

---

## API Documentation

### `<UploadOptimizer />` Component

A ready-to-use component with drag-and-drop functionality and built-in UI.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `CompressionOption` | `undefined` | Compression and resize options |
| `accept` | `string` | `"image/*"` | Accepted file types (HTML input accept attribute) |
| `label` | `string` | `"Upload and Optimized image"` | Label text displayed above the upload area |
| `buttonText` | `string` | `"Choose Image"` | Text displayed on the upload button |
| `onOptimized` | `(result: OptimizedImageResult) => void` | `undefined` | Callback fired when optimization succeeds |
| `onError` | `(error: string) => void` | `undefined` | Callback fired when an error occurs |

#### Example

```tsx
<UploadOptimizer
  accept="image/png,image/jpeg"
  label="Upload Profile Picture"
  buttonText="Select Image"
  options={{
    maxWidth: 800,
    maxHeight: 800,
    quality: 0.9,
    outputType: 'image/webp',
    fileName: 'profile.webp'
  }}
  onOptimized={(result) => {
    console.log(`Original: ${result.originalSize} bytes`);
    console.log(`Optimized: ${result.optimizedSize} bytes`);
    console.log(`Saved: ${result.compressionRatio}%`);
  }}
  onError={(error) => {
    alert(`Upload failed: ${error}`);
  }}
/>
```

---

### `useUploadOptimizer()` Hook

A React hook for building custom upload experiences.

#### Returns

```typescript
{
  optimizeImage: (file: File, options?: CompressionOption) => Promise<OptimizedImageResult>;
  loading: boolean;
  progress: number;
  result: OptimizedImageResult | null;
  error: string | null;
  reset: () => void;
}
```

| Property | Type | Description |
|----------|------|-------------|
| `optimizeImage` | `function` | Async function to optimize an image file |
| `loading` | `boolean` | `true` while optimization is in progress |
| `progress` | `number` | Progress percentage (0-100) |
| `result` | `OptimizedImageResult \| null` | Optimization result object (null if not completed) |
| `error` | `string \| null` | Error message if optimization failed |
| `reset` | `function` | Reset all state to initial values |

#### Example

```tsx
const { optimizeImage, loading, result, reset } = useUploadOptimizer();

const handleFileSelect = async (file: File) => {
  try {
    const optimized = await optimizeImage(file, {
      quality: 0.8,
      maxWidth: 1200
    });
    
    // Upload to server
    await uploadToServer(optimized.file);
  } catch (err) {
    console.error('Optimization failed:', err);
  }
};
```

---

### Type Definitions

#### `CompressionOption`

```typescript
type CompressionOption = {
  maxWidth?: number;          // Maximum width in pixels
  maxHeight?: number;         // Maximum height in pixels
  quality?: number;           // 0.0 to 1.0 (default: 0.8)
  outputType?: OutputImageType; // Output format
  fileName?: string;          // Custom output filename
}
```

**Defaults:**
- `maxWidth`: 1280
- `maxHeight`: 1280
- `quality`: 0.8
- `outputType`: `"image/webp"`

#### `OutputImageType`

```typescript
type OutputImageType = 
  | "image/jpeg"
  | "image/png" 
  | "image/webp";
```

#### `OptimizedImageResult`

```typescript
type OptimizedImageResult = {
  file: File;                    // The optimized file (or original if optimization increased size)
  originalFile: File;            // The original uploaded file
  originalSize: number;          // Original file size in bytes
  optimizedSize: number;         // Optimized file size in bytes
  originalPreviewUrl: string;    // Blob URL for original image preview
  optimizedPreviewUrl: string;   // Blob URL for optimized image preview
  compressionRatio: number;      // Percentage saved (0-100)
}
```

---

### Utility Functions

#### `compressImage(file: File, options?: CompressionOption): Promise<OptimizedImageResult>`

Standalone function to compress an image without using hooks or components.

```tsx
import { compressImage } from 'react-upload-optimizer';

const optimized = await compressImage(myFile, {
  quality: 0.7,
  outputType: 'image/webp'
});
```

#### `formatBytes(bytes: number): string`

Format byte size into human-readable string.

```tsx
import { formatBytes } from 'react-upload-optimizer';

console.log(formatBytes(1024));     // "1.00 KB"
console.log(formatBytes(1048576));  // "1.00 MB"
```

---

## Examples

### Convert to WebP for Maximum Compression

```tsx
<UploadOptimizer
  options={{
    outputType: 'image/webp',
    quality: 0.85,
    maxWidth: 1920
  }}
  onOptimized={(result) => {
    console.log(`WebP saved ${result.compressionRatio}% space`);
  }}
/>
```

### Create Thumbnails

```tsx
const { optimizeImage } = useUploadOptimizer();

const createThumbnail = async (file: File) => {
  const thumbnail = await optimizeImage(file, {
    maxWidth: 200,
    maxHeight: 200,
    quality: 0.7,
    outputType: 'image/jpeg'
  });
  
  return thumbnail.file;
};
```

### Upload to Server with Fetch

```tsx
function UploadToServer() {
  const handleOptimized = async (result: OptimizedImageResult) => {
    const formData = new FormData();
    formData.append('image', result.file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      console.log('Upload successful!');
    }
  };

  return <UploadOptimizer onOptimized={handleOptimized} />;
}
```

### Multiple Quality Levels

```tsx
const generateMultipleSizes = async (file: File) => {
  const [large, medium, small] = await Promise.all([
    optimizeImage(file, { maxWidth: 1920, quality: 0.9 }),
    optimizeImage(file, { maxWidth: 1280, quality: 0.8 }),
    optimizeImage(file, { maxWidth: 640, quality: 0.7 })
  ]);

  return { large, medium, small };
};
```

### Custom UI with Progress Bar

```tsx
function CustomProgressUpload() {
  const { optimizeImage, loading, progress, error } = useUploadOptimizer();
  const [file, setFile] = useState<File | null>(null);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    await optimizeImage(selected, { quality: 0.8 });
  };

  return (
    <div>
      <input type="file" onChange={handleChange} accept="image/*" />
      
      {loading && (
        <div style={{ width: '100%', backgroundColor: '#e0e0e0' }}>
          <div 
            style={{ 
              width: `${progress}%`, 
              height: '20px', 
              backgroundColor: '#4caf50' 
            }}
          />
          <span>{progress}%</span>
        </div>
      )}

      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}
```

---

## TypeScript Usage

Full TypeScript support with comprehensive type definitions:

```tsx
import { 
  UploadOptimizer, 
  useUploadOptimizer,
  type CompressionOption,
  type OptimizedImageResult,
  type OutputImageType
} from 'react-upload-optimizer';

const options: CompressionOption = {
  maxWidth: 1280,
  maxHeight: 720,
  quality: 0.8,
  outputType: 'image/webp' as OutputImageType
};

function TypedComponent() {
  const handleResult = (result: OptimizedImageResult): void => {
    console.log(result.file.name);
    console.log(result.compressionRatio);
  };

  return <UploadOptimizer options={options} onOptimized={handleResult} />;
}
```

---

## Best Practices

### 1. Always Validate Server-Side

Client-side optimization is great for UX, but always validate files on your server:

```typescript
// Server-side validation example
if (!allowedTypes.includes(file.mimetype)) {
  throw new Error('Invalid file type');
}
if (file.size > MAX_SIZE) {
  throw new Error('File too large');
}
```

### 2. Choose the Right Format

- **WebP**: Best compression, modern browsers only
- **JPEG**: Good compression, universal support, no transparency
- **PNG**: Lossless, larger files, supports transparency

### 3. Quality vs. Size Trade-offs

- `quality: 0.9-1.0` - High quality, minimal compression
- `quality: 0.7-0.9` - Balanced (recommended)
- `quality: 0.5-0.7` - Aggressive compression, visible artifacts

### 4. Clean Up Preview URLs

```tsx
useEffect(() => {
  return () => {
    if (result) {
      URL.revokeObjectURL(result.originalPreviewUrl);
      URL.revokeObjectURL(result.optimizedPreviewUrl);
    }
  };
}, [result]);
```

### 5. Handle Errors Gracefully

```tsx
<UploadOptimizer
  onError={(error) => {
    if (error.includes('Canvas')) {
      alert('Your browser does not support image processing');
    } else {
      alert(`Upload error: ${error}`);
    }
  }}
/>
```

---

## Browser Support

| Browser | Version |
|---------|---------|
| Chrome | 80+ |
| Firefox | 75+ |
| Safari | 13.1+ |
| Edge | 80+ |

**Requirements:**
- Canvas API
- Blob API
- FileReader API
- Promises

All modern browsers are supported. IE11 is not supported.

---

## FAQ

**Q: Does this work with Next.js?**  
A: Yes! It's a client-side library that works with any React framework. Use `"use client"` directive in Next.js 13+ app directory.

**Q: Can I use this in React Native?**  
A: No, this library requires browser APIs (Canvas, Blob) that aren't available in React Native.

**Q: Does optimization happen on the server?**  
A: No, all processing happens in the browser using the Canvas API. This reduces server load and bandwidth.

**Q: What if the optimized image is larger than the original?**  
A: The library automatically detects this and returns the original file instead (since v1.0.1).

**Q: Can I optimize multiple images at once?**  
A: Currently, no. This is planned for v1.1.0. You can call `optimizeImage` multiple times in parallel.

**Q: How do I customize the UI?**  
A: Use the `useUploadOptimizer` hook to build your own custom UI with full control.

**Q: Is there a file size limit?**  
A: The library itself has no limit, but browsers may struggle with very large images (>50MB). Consider warning users about large files.

---

## Roadmap

### v1.1.0 (Next Minor Release)
- [ ] Multiple image upload support
- [ ] Enhanced drag & drop with file rejection
- [ ] File type and size validation options
- [ ] Progress events and callbacks
- [ ] Retry failed optimizations

### v1.2.0
- [ ] Image cropping functionality
- [ ] Rotate and flip transformations
- [ ] Download optimized image button
- [ ] Comparison slider for before/after

### v1.3.0
- [ ] Batch optimization
- [ ] EXIF data removal option
- [ ] AVIF format support
- [ ] Custom compression algorithms

### v2.0.0 (Major)
- [ ] Plugin system for extensibility
- [ ] Next.js integration package
- [ ] Cloudinary adapter
- [ ] AWS S3 direct upload adapter
- [ ] Background processing with Web Workers

See [ROADMAP.md](ROADMAP.md) for details.

---

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

**Quick Start:**
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test them
4. Commit using conventional commits: `git commit -m "feat: add amazing feature"`
5. Push and open a Pull Request

---

## Security

Security is important to us. Please see [SECURITY.md](SECURITY.md) for:
- Supported versions
- How to report vulnerabilities
- Security best practices

---

## License

MIT © Muhammad Ahmad Younas

See [LICENSE](LICENSE) for details.

---

## Acknowledgments

Built with ❤️ using:
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [tsup](https://tsup.egoist.dev/)

---

<div align="center">

**[⬆ back to top](#react-upload-optimizer)**

If you find this package useful, please consider giving it a ⭐️ on [GitHub](https://github.com/yourusername/react-upload-optimizer)!

</div>
