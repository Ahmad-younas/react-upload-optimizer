# Security Policy

## Supported Versions

We actively support the following versions of react-upload-optimizer:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security issue, please follow responsible disclosure practices.

### How to Report

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to:

**ahmadyounas2k18@gmail.com**

Include the following information:

- Type of vulnerability
- Full paths of source files related to the vulnerability
- Location of the affected code (tag/branch/commit or direct URL)
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit it

### What to Expect

- We will acknowledge your email within 48 hours
- We will provide a detailed response within 5 business days indicating next steps
- We will keep you informed of the progress toward a fix
- We will notify you when the vulnerability is fixed

### Safe Harbor

We support safe harbor for security researchers who:

- Make a good faith effort to avoid privacy violations and service disruption
- Only interact with accounts you own or with explicit permission
- Do not exploit a vulnerability beyond what is necessary to confirm it exists

## Security Best Practices

When using react-upload-optimizer:

1. **Validate file types** on both client and server
2. **Limit file sizes** to prevent DoS attacks
3. **Sanitize filenames** before storing
4. **Scan uploaded files** for malware on the server
5. **Use HTTPS** for file uploads
6. **Implement rate limiting** on upload endpoints
7. **Never trust client-side validation alone**

## Known Security Considerations

- This package performs client-side image processing only
- Always validate and sanitize uploads on your server
- Preview URLs are blob URLs and should be revoked after use
- The package does not handle server-side upload security

## Updates

Security updates will be released as patch versions and documented in the [CHANGELOG](CHANGELOG.md).
