# Contributing to React Upload Optimizer

Thank you for your interest in contributing to React Upload Optimizer! We welcome contributions from the community.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please read it before contributing.

## Getting Started

### Fork and Clone

1. Fork this repository to your GitHub account
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/react-upload-optimizer.git
   cd react-upload-optimizer
   ```

### Install Dependencies

```bash
npm install
```

### Development Workflow

Start the development build with watch mode:

```bash
npm run dev
```

This will rebuild the package automatically when you make changes.

### Build for Production

```bash
npm run build
```

This creates optimized builds in the `dist/` directory.

## Making Changes

### Create a Branch

Create a feature branch for your work:

```bash
git checkout -b feature/your-feature-name
```

Use descriptive branch names:
- `feature/multi-upload` for new features
- `fix/compression-bug` for bug fixes
- `docs/update-readme` for documentation
- `refactor/optimize-hook` for refactoring

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/) for clear and standardized commit messages.

**Format:**
```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `refactor`: Code refactoring (no behavior change)
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Build process, dependencies, or tooling
- `style`: Code style changes (formatting, missing semi-colons, etc.)

**Examples:**

```bash
git commit -m "feat: add multi-file upload support"
git commit -m "fix: prevent memory leak in preview URLs"
git commit -m "docs: update API documentation for quality option"
git commit -m "refactor: extract canvas logic to separate utility"
git commit -m "perf: optimize image resizing algorithm"
git commit -m "test: add unit tests for compressImage function"
git commit -m "chore: update tsup to version 8.0"
```

### Code Style

- Write clean, readable TypeScript
- Use meaningful variable and function names
- Add comments for complex logic
- Follow existing code patterns
- Keep components simple and reusable
- Avoid unnecessary dependencies

### Testing Your Changes

Before submitting:

1. Build the package: `npm run build`
2. Test in a local React app using `npm link`
3. Test with React 18+ and TypeScript
4. Test in major browsers (Chrome, Firefox, Safari, Edge)
5. Verify no TypeScript errors
6. Ensure the build produces `dist/` files correctly

## Submitting a Pull Request

### Before Submitting

- [ ] Code builds successfully (`npm run build`)
- [ ] No TypeScript errors
- [ ] Tested changes locally
- [ ] Updated documentation if needed
- [ ] Followed commit conventions
- [ ] Branch is up to date with main

### Pull Request Process

1. Push your branch to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

2. Open a Pull Request on GitHub

3. Fill out the PR template completely

4. Link any related issues

5. Wait for review and address feedback

### PR Guidelines

- Keep PRs focused on a single feature or fix
- Include a clear description of changes
- Add screenshots for UI changes
- Update README if adding features
- Be responsive to review feedback
- Keep the conversation professional and respectful

## Project Structure

```
react-upload-optimizer/
├── src/
│   ├── components/     # React components
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Utility functions
│   ├── types/          # TypeScript type definitions
│   └── index.ts        # Main entry point
├── dist/               # Build output (generated)
├── .github/            # GitHub templates and workflows
├── README.md           # Main documentation
├── CONTRIBUTING.md     # This file
└── package.json        # Package configuration
```

## What to Contribute

### Good First Issues

Look for issues labeled `good first issue` - these are beginner-friendly.

### Ideas for Contributions

- Bug fixes
- Documentation improvements
- Performance optimizations
- New image format support (AVIF)
- Accessibility improvements
- Example projects
- TypeScript type improvements
- Browser compatibility fixes

### Not Sure Where to Start?

- Improve error messages
- Add code comments
- Fix typos in documentation
- Improve TypeScript types
- Add JSDoc comments
- Optimize bundle size

## Questions?

- Open a [Discussion](https://github.com/Ahmad-younas/react-upload-optimizer/discussions) for questions
- Check existing [Issues](https://github.com/Ahmad-younas/react-upload-optimizer/issues) for bug reports
- Be respectful and patient

## Recognition

Contributors will be recognized in:
- GitHub Contributors page
- Release notes for significant contributions
- Project README (for major features)

Thank you for contributing to React Upload Optimizer! 🎉
