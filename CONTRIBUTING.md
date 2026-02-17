# Contributing to FarmShare Intern Dev Project

Thank you for your interest in improving the Meat Processor Value Calculator! This document provides guidelines for submitting your work.

## Getting Started

1. **Fork the repository** to your GitHub account
2. **Clone your fork** locally
3. **Create a feature branch** from `main`
4. **Make your improvements**
5. **Test thoroughly**
6. **Submit a Pull Request**

## Workflow

### 1. Fork and Clone

```bash
# Fork via GitHub UI, then clone your fork
git clone https://github.com/YOUR-USERNAME/farmshare-intern-dev-project.git
cd farmshare-intern-dev-project
```

### 2. Create a Branch

```bash
git checkout -b feature/your-improvements
# Or use a descriptive name like:
# git checkout -b fix/calculation-bug
# git checkout -b feature/delete-button
# git checkout -b style/improved-ui
```

### 3. Make Changes

- Fix bugs identified in the tests
- Add missing features
- Improve styling and UX
- Ensure code quality

### 4. Test Your Changes

```bash
# Run tests
yarn test

# Run dev server and manually test
yarn dev

# Build to ensure no build errors
yarn build
```

### 5. Commit Your Work

Write clear, descriptive commit messages:

```bash
git add .
git commit -m "Fix: Correct total value calculation bug"
git commit -m "Feature: Add delete button for table rows"
git commit -m "Style: Improve button and input styling"
```

### 6. Push to Your Fork

```bash
git push origin feature/your-improvements
```

### 7. Create a Pull Request

1. Go to the original repository on GitHub
2. Click "Pull Requests" → "New Pull Request"
3. Click "compare across forks"
4. Select your fork and branch
5. Fill out the PR template completely
6. Submit your PR

## Code Standards

### TypeScript

- Use proper TypeScript types (avoid `any`)
- Define interfaces for complex objects
- Use type safety features

### React

- Use functional components
- Follow React hooks best practices
- Keep components focused and single-purpose

### Styling

- Use MUI components consistently
- Follow responsive design principles
- Ensure good contrast and accessibility

### Testing

- Ensure all tests pass
- Add tests for new features
- Test edge cases

## What We're Looking For

### Must Have ✅

- All existing tests passing
- No console errors
- Code builds successfully
- Delete functionality implemented
- Calculation bug fixed

### Nice to Have 🌟

- Additional features (clear all, edit, etc.)
- Improved styling and UX
- Input validation
- Additional tests
- Mobile responsiveness
- Accessibility improvements

## PR Review Process

1. **Automated Checks**: GitHub Actions will run tests and build
2. **Code Review**: Maintainers will review your code
3. **Feedback**: You may receive requests for changes
4. **Approval**: Once approved, your PR may be merged

## Questions?

If you have questions:

1. Check the README.md
2. Look at existing issues
3. Create a new issue if needed

## Tips for Success

- Start with fixing the failing tests
- Test frequently as you develop
- Make small, focused commits
- Don't hesitate to ask questions
- Have fun and learn!

Thank you for contributing! 🎉
