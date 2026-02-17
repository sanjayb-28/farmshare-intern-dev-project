# Meat Processor Value Calculator - Intern Development Challenge

## Overview

Welcome to the FarmShare Intern Development Challenge! This project is a web-based calculator designed to help meat processors calculate labor savings and efficiency by tracking animal hanging weights and calculating the number of animal heads processed. Your task is to improve the application by fixing bugs, adding features, improving styling, and ensuring all tests pass.

## Live Demo

The application is automatically deployed to GitHub Pages on every commit to the main branch:
`https://[your-username].github.io/farmshare-intern-dev-project/`

## Getting Started

### Prerequisites

- Node.js (v20 or higher)
- Yarn package manager (v4.6.0 is included via Corepack)

### Installation

1. **Fork this repository** to your own GitHub account
2. **Clone your forked repository**:
   ```bash
   git clone https://github.com/YOUR-USERNAME/farmshare-intern-dev-project.git
   cd farmshare-intern-dev-project
   ```
3. **Install dependencies**:
   ```bash
   yarn install
   ```
4. **Run the development server**:
   ```bash
   yarn dev
   ```
5. **Run tests**:
   ```bash
   yarn test
   ```

## Your Tasks

This project intentionally has several issues and missing features. Your job is to:

### 1. Fix Failing Tests ❌

Currently, some tests are failing. Run `yarn test` to see which tests need attention:

- **Calculation Bug**: There's a calculation error in the animal heads calculation
- **Delete Functionality**: Missing delete button for removing animals from the table
- **Input Validation**: Ensure the form validation works correctly

### 2. Improve Styling 🎨

The current styling is minimal. Enhance the UI/UX by:

- Adding better color schemes and visual hierarchy
- Improving button and input field styling
- Making the application responsive for mobile devices
- Adding hover states and transitions
- Improving the table appearance
- Better styling for the advanced settings section

### 3. Add Features ✨

Consider adding these improvements:

- Clear all button to reset the entire table
- Edit functionality for existing animal entries
- Input validation (prevent negative numbers, required fields)
- Export data to CSV
- Better error handling and user feedback
- Persistent storage (localStorage)
- Graphical display of labor savings
- Summary statistics panel

### 4. Code Quality 📝

- Ensure code follows best practices
- Add proper TypeScript types where needed
- Improve component organization
- Add comments for complex logic
- Consider extracting reusable components

## Submission Process

1. **Create a new branch** for your changes:

   ```bash
   git checkout -b feature/your-improvements
   ```

2. **Make your changes** and commit regularly:

   ```bash
   git add .
   git commit -m "Description of your changes"
   ```

3. **Push to your forked repository**:

   ```bash
   git push origin feature/your-improvements
   ```

4. **Create a Pull Request**:
   - Go to the original repository (not your fork)
   - Click "New Pull Request"
   - Select "compare across forks"
   - Choose your fork and branch
   - Fill out the PR template with:
     - What bugs you fixed
     - What features you added
     - What styling improvements you made
     - Screenshots of your changes
     - Any challenges you faced

## Technology Stack

- **React 19** - UI Framework
- **TypeScript** - Type Safety
- **Material-UI (MUI)** - Component Library
- **Vite** - Build Tool
- **Vitest** - Testing Framework
- **GitHub Pages** - Deployment

## Project Structure

```
farmshare-intern-dev-project/
├── src/
│   ├── App.tsx           # Main calculator component
│   ├── App.test.tsx      # Test file (some tests are failing!)
│   ├── App.css           # Styles (needs improvement!)
│   └── setupTests.ts     # Test configuration
├── .github/
│   └── workflows/
│       └── deploy.yml    # GitHub Pages deployment
├── package.json
├── vite.config.ts
└── vitest.config.ts
```

## Evaluation Criteria

Your submission will be evaluated on:

1. **Functionality** (40%)
   - All tests passing
   - New features work correctly
   - No console errors

2. **Code Quality** (25%)
   - Clean, readable code
   - Proper TypeScript usage
   - Good component structure

3. **Styling/UX** (20%)
   - Visual improvements
   - Responsive design
   - User-friendly interface

4. **Testing** (15%)
   - Existing tests pass
   - Additional tests for new features
   - Good test coverage

## Need Help?

- Check the [MUI Documentation](https://mui.com/)
- Review [React Documentation](https://react.dev/)
- Look at [Vitest Documentation](https://vitest.dev/) for testing help

## Questions?

If you encounter any issues or have questions, please:

1. Check if the issue is part of the challenge (intentional bugs/missing features)
2. Search existing GitHub Issues
3. If stuck, create a new issue describing your problem

Good luck! We're excited to see your improvements! 🚀
