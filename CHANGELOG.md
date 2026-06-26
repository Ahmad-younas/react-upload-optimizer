# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2026-06-26

### Fixed

- Prevent returning optimized images that are larger than the original image
- Now returns the original file if optimization results in a larger file size
- Ensures users never receive unnecessarily large files

## [1.0.0] - 2026-06-25

### Added

- Initial release of react-upload-optimizer
- Image compression with configurable quality settings
- Image resizing with max width/height constraints
- Support for WebP, JPEG, and PNG output formats
- Drag and drop component (`UploadOptimizer`)
- React hook API (`useUploadOptimizer`)
- TypeScript support with full type definitions
- Original and optimized image preview
- File size comparison and compression ratio calculation
- Progress tracking during optimization
- Error handling and loading states
- Utility functions: `compressImage`, `formatBytes`
- Comprehensive TypeScript types exported

### Features

- Zero dependencies (peer dependencies: React 18+)
- Client-side image processing
- Responsive drag-and-drop interface
- Customizable labels and button text
- Support for all modern browsers

[1.0.1]: https://github.com/Ahmad-younas/react-upload-optimizer/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/Ahmad-younas/react-upload-optimizer/releases/tag/v1.0.0
