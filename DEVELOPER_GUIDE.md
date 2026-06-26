# Developer Guide

Welcome to the React Upload Optimizer developer guide! This document provides detailed technical information for contributors who want to understand the codebase and contribute effectively.

## Table of Contents

1. [Project Architecture](#project-architecture)
2. [Development Setup](#development-setup)
3. [Code Structure](#code-structure)
4. [How It Works](#how-it-works)
5. [Testing Your Changes](#testing-your-changes)
6. [Building](#building)
7. [Troubleshooting](#troubleshooting)
8. [Best Practices](#best-practices)

---

## Project Architecture

React Upload Optimizer is a client-side image optimization library built with:

- **React 18+** - UI components and hooks
- **TypeScript** - Type safety and developer experience
- **Canvas API** - Image processing and compression
- **tsup** - Fast, zero-config TypeScript bundler

### Technology Stack

```
┌─────────────────────────────────────┐
│   React Components & Hooks          │
├─────────────────────────────────────┤
│   TypeScript Type System            │
├─────────────────────────────────────┤
│   Browser Canvas API                │
├─────────────────────────────────────┤
│   Blob & FileReader APIs            │
└─────────────────────────────────────┘
```

### Key Design Decisions

1. **Zero Dependencies** - No external libraries to keep bundle size minimal
2. **Client-Side Processing** - All work happens in the browser to reduce server load
3. **Progressive Enhancement** - Graceful fallback when optimization increases file size
4. **Type Safety** - Full TypeScript coverage for excellent DX

---

## Development Setup

### Prerequisites

- **Node.js** 16 or higher
- **npm** 8 or higher
- A code editor (VS Code recommended)
- Git

### Step 1: Fork and Clone

```bash
# Fork the repository on GitHub first, then:
git clone https://github.com/YOUR_USERNAME/react-upload-optimizer.git
cd react-upload-optimizer
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs:
- TypeScript compiler
- React and React DOM (as peer dependencies)
- tsup for building
- Type definitions

### Step 3: Start Development Mode

```bash
npm run dev
```

This starts tsup in watch mode. Any changes you make to source files will automatically rebuild the package.

### Step 4: Link for Local Testing

To test your changes in a real React app:

```bash
# In the react-upload-optimizer directory
npm link

# In your test React app directory
npm link react-upload-optimizer
```

Now you can import and use your local version:

```tsx
import { UploadOptimizer } from 'react-upload-optimizer';
```

### Step 5: Create a Test App (Optional)

Create a simple test application:

```bash
# In a separate directory
npx create-react-app test-app --template typescript
cd test-app
npm link react-upload-optimizer
```

Edit `src/App.tsx`:

```tsx
import { UploadOptimizer } from 'react-upload-optimizer';

function App() {
  return (
    <div style={{ padding: '40px' }}>
      <h1>Testing React Upload Optimizer</h1>
      <UploadOptimizer
        onOptimized={(result) => {
          console.log('Success!', result);
        }}
      />
    </div>
  );
}

export default App;
```

---

## Code Structure

```
react-upload-optimizer/
├── src/
│   ├── components/
│   │   └── UploadOptimizer.tsx      # Main UI component
│   ├── hooks/
│   │   └── useUploadOptimizer.ts    # React hook for custom UIs
│   ├── utils/
│   │   ├── compressImage.ts         # Core compression logic
│   │   └── formatBytes.ts           # Byte formatting utility
│   ├── types/
│   │   └── index.ts                 # TypeScript type definitions
│   └── index.ts                     # Public API exports
├── dist/                            # Build output (generated)
├── .github/
│   ├── workflows/
│   │   └── ci.yml                   # GitHub Actions CI
│   └── ISSUE_TEMPLATE/              # Issue templates
├── tsconfig.json                    # TypeScript configuration
├── package.json                     # Package metadata
└── README.md                        # Main documentation
```

### File Responsibilities

#### `src/index.ts`
Entry point that exports the public API:
- Components
- Hooks
- Utility functions
- TypeScript types

#### `src/components/UploadOptimizer.tsx`
The ready-to-use React component with:
- Drag and drop UI
- File input handling
- Progress display
- Preview rendering
- Error handling

#### `src/hooks/useUploadOptimizer.ts`
React hook that manages:
- Loading state
- Progress tracking
- Error state
- Result storage
- The `optimizeImage` function

#### `src/utils/compressImage.ts`
Core image processing logic:
- Load image from File
- Calculate new dimensions
- Draw to canvas
- Convert to Blob
- Return optimized result

#### `src/utils/formatBytes.ts`
Simple utility to format byte sizes into human-readable strings.

#### `src/types/index.ts`
All TypeScript type definitions used throughout the package.

---

## How It Works

### Image Optimization Flow

```
User selects file
       ↓
File → loadImage() → HTMLImageElement
       ↓
Calculate new dimensions (preserve aspect ratio)
       ↓
Create Canvas → Draw resized image
       ↓
Canvas → toBlob() → Compressed Blob
       ↓
Blob → new File() → Optimized File
       ↓
Compare sizes → Return smaller file
```

### Detailed Algorithm

1. **File Validation**
   ```typescript
   if (!file.type.startsWith("image/")) {
     throw new Error("Only image files are supported.");
   }
   ```

2. **Load Image**
   ```typescript
   const image = await loadImage(file);
   // Creates HTMLImageElement from File using createObjectURL
   ```

3. **Calculate Dimensions**
   ```typescript
   const { width, height } = calculateSize(
     image.width,
     image.height,
     maxWidth,
     maxHeight
   );
   // Preserves aspect ratio while respecting constraints
   ```

4. **Draw to Canvas**
   ```typescript
   const canvas = document.createElement("canvas");
   canvas.width = width;
   canvas.height = height;
   context.drawImage(image, 0, 0, width, height);
   ```

5. **Compress**
   ```typescript
   const blob = await canvasToBlob(canvas, outputType, quality);
   // Uses canvas.toBlob() with quality setting
   ```

6. **Smart Return**
   ```typescript
   const finalFile = optimizedFile.size < originalFile.size 
     ? optimizedFile 
     : originalFile;
   // Returns original if optimization made it larger
   ```

---

## Testing Your Changes

### Manual Testing Checklist

Before submitting a PR, test these scenarios:

#### Basic Functionality
- [ ] Upload a JPEG image
- [ ] Upload a PNG image
- [ ] Upload a WebP image
- [ ] Drag and drop an image
- [ ] Click to select an image

#### Compression
- [ ] Large image (>5MB) gets compressed
- [ ] Small image (<100KB) behavior
- [ ] Quality setting (0.5, 0.8, 1.0) works
- [ ] Different output formats (JPEG, PNG, WebP)

#### Edge Cases
- [ ] Upload non-image file (should show error)
- [ ] Upload very large image (>20MB)
- [ ] Upload image already optimized
- [ ] Cancel file selection
- [ ] Upload same image twice

#### UI/UX
- [ ] Loading state displays
- [ ] Progress updates correctly
- [ ] Error messages display
- [ ] Preview images render
- [ ] Reset button works
- [ ] Drag visual feedback works

#### Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Testing in Different React Versions

```bash
# Test with React 18
npm install react@18 react-dom@18

# Test with React 19 (when available)
npm install react@next react-dom@next
```

### Performance Testing

Test with various image sizes:
- Small: 100KB - 500KB
- Medium: 500KB - 2MB
- Large: 2MB - 10MB
- Extra Large: 10MB+

Monitor:
- Processing time
- Memory usage (Chrome DevTools)
- UI responsiveness

---

## Building

### Development Build

```bash
npm run dev
```

Watches for changes and rebuilds automatically. Output is not minified.

### Production Build

```bash
npm run build
```

Creates optimized builds in `dist/`:
- `dist/index.js` - CommonJS format
- `dist/index.mjs` - ESM format
- `dist/index.d.ts` - TypeScript declarations

### Build Configuration

Build is configured in `tsup.config.ts` (or via CLI in package.json):

```json
{
  "scripts": {
    "build": "tsup src/index.ts --format esm,cjs --dts --clean"
  }
}
```

Flags:
- `--format esm,cjs` - Output both ESM and CommonJS
- `--dts` - Generate TypeScript declarations
- `--clean` - Clean output directory before build

---

## Troubleshooting

### Common Issues

#### Issue: "Module not found" error

**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Issue: TypeScript errors in IDE

**Solution:**
```bash
# Restart TypeScript server in VS Code
# Command Palette → "TypeScript: Restart TS Server"
```

#### Issue: Changes not reflecting in test app

**Solution:**
```bash
# Rebuild the package
npm run build

# Or use watch mode
npm run dev
```

#### Issue: "Canvas is not supported" error

**Cause:** Running in non-browser environment (Node.js, SSR)

**Solution:** This library requires a browser environment. For Next.js:
```tsx
'use client'; // Add this at the top of your component
```

#### Issue: Build fails with TypeScript errors

**Solution:**
```bash
# Check TypeScript version
npx tsc --version

# Update if needed
npm install typescript@latest --save-dev

# Run type check
npx tsc --noEmit
```

---

## Best Practices

### Code Style

1. **Use Functional Components**
   ```tsx
   // ✅ Good
   export function MyComponent() { }
   
   // ❌ Avoid
   export const MyComponent = () => { }
   ```

2. **Type Everything**
   ```tsx
   // ✅ Good
   function processImage(file: File, quality: number): Promise<Blob> { }
   
   // ❌ Avoid
   function processImage(file, quality) { }
   ```

3. **Use Async/Await**
   ```tsx
   // ✅ Good
   const result = await optimizeImage(file);
   
   // ❌ Avoid
   optimizeImage(file).then(result => { });
   ```

4. **Handle Errors Gracefully**
   ```tsx
   try {
     await optimizeImage(file);
   } catch (err) {
     const message = err instanceof Error ? err.message : "Unknown error";
     setError(message);
   }
   ```

### Performance

1. **Clean Up Blob URLs**
   ```tsx
   useEffect(() => {
     return () => {
       if (previewUrl) {
         URL.revokeObjectURL(previewUrl);
       }
     };
   }, [previewUrl]);
   ```

2. **Memoize Expensive Calculations**
   ```tsx
   const dimensions = useMemo(
     () => calculateSize(width, height, maxWidth, maxHeight),
     [width, height, maxWidth, maxHeight]
   );
   ```

3. **Use useCallback for Handlers**
   ```tsx
   const handleUpload = useCallback(async (file: File) => {
     // Handler logic
   }, []);
   ```

### Testing

1. **Test Edge Cases First**
   - Invalid inputs
   - Boundary values
   - Network errors

2. **Test Browser Compatibility**
   - Use different browsers
   - Test on mobile devices

3. **Monitor Bundle Size**
   ```bash
   npm run build
   ls -lh dist/
   ```

---

## Getting Help

- **Questions:** Open a [Discussion](https://github.com/yourusername/react-upload-optimizer/discussions)
- **Bugs:** Open an [Issue](https://github.com/yourusername/react-upload-optimizer/issues)
- **Contributions:** Read [CONTRIBUTING.md](CONTRIBUTING.md)

---

## Additional Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Canvas API Reference](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [File API Reference](https://developer.mozilla.org/en-US/docs/Web/API/File)

---

Thank you for contributing to React Upload Optimizer! 🚀
