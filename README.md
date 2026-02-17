# Meat Processor Value Calculator - Intern Development Challenge

## Overview

Welcome to the FarmShare Intern Development Challenge! This project is a web-based calculator designed to help meat processors estimate their annual labor savings and costs when using FarmShare's platform. The calculator allows processors to select multiple animal species, enter their annual processing volumes, and see projected labor savings versus platform costs.

The application calculates:

- **Labor Savings**: Based on time saved per animal × number of animals processed
- **Platform Costs**: $0.02 per pound of hanging weight
- **Net Benefit**: Labor savings minus platform costs

Your task is to fix the bugs in the code and tests, add features, improve styling, and ensure all tests pass.

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

**Current Status: 14 out of 25 tests are failing**

Run `yarn test` to see which tests need attention. There are three types of issues:

#### a) Implementation Bugs (Calculation Logic)

There's a bug in `src/utils/calculations.ts` in the `calculateHeads()` function that causes incorrect animal head counts. This bug affects multiple tests.

- **Files affected**: `src/utils/calculations.ts`
- **Tests failing**: Multiple tests in `src/utils/calculations.test.ts`
- **Hint**: Check the math in the `calculateHeads()` function

#### b) Wrong Test Expectations

Some tests have incorrect expectations - they're checking for wrong values or wrong text.

- **Files affected**: `src/utils/calculations.test.ts`, `src/App.test.tsx`
- **Tests failing**: Tests checking for "Monthly" instead of "Annual", wrong calculation values
- **Hint**: Compare the test expectations with what the code actually produces

#### c) Missing Features

Some functionality hasn't been implemented yet.

- **Missing feature**: Remove/delete button for removing selected species from the multi-select
- **Test failing**: "should allow removing a selected species"
- **Hint**: You'll need to add a way to remove individual species (maybe delete icons on the Chips?)

### 2. Improve Styling 🎨

The current styling is minimal. Enhance the UI/UX by:

- Adding better color schemes and visual hierarchy
- Improving the volume input cards appearance
- Making the application responsive for mobile devices
- Adding hover states and transitions for interactive elements
- Improving the annual summary display
- Better styling for the advanced settings section
- Adding visual feedback when species are selected/deselected
- Making the multi-select dropdown more visually appealing

### 3. Add Features ✨

Consider adding these improvements:

- **Clear all button** to deselect all species and reset inputs
- **Remove individual species** functionality (currently missing!)
- **Input validation** (prevent negative numbers, max reasonable values)
- **Export functionality** to save annual projections as CSV/PDF
- **Better error handling** and user feedback messages
- **Persistent storage** (localStorage) to save calculator state
- **Charts/graphs** to visualize savings vs costs
- **Comparison mode** to compare different scenarios side-by-side
- **Species presets** for common processor types (beef-focused, mixed, etc.)
- **Monthly breakdown** in addition to annual totals

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
│   ├── App.tsx                      # Main calculator component
│   ├── App.test.tsx                 # Integration tests (4/7 failing)
│   ├── App.css                      # Styles (needs improvement!)
│   ├── types.ts                     # TypeScript types and constants
│   └── utils/
│       ├── calculations.ts          # Calculation functions (has bugs!)
│       └── calculations.test.ts     # Unit tests (10/18 failing)
├── .github/
│   └── workflows/
│       └── deploy.yml               # GitHub Pages deployment
├── package.json
├── vite.config.ts
└── vitest.config.ts
```

## How the Application Works

1. **Multi-Select Dropdown**: Choose one or more animal species from the dropdown (Beef, Hog, Bison, Lamb, Goat, Venison, Yak, Veal)
2. **Volume Input Cards**: For each selected species, enter the total annual hanging weight in pounds
3. **Predefined Average Weights**: The app uses industry-standard average hanging weights per species (e.g., Beef: 500 lbs, Hog: 200 lbs)
4. **Calculations**:
   - **Animals Processed**: Total weight ÷ average weight per animal
   - **Labor Savings**: Number of animals × time saved per animal × hourly wage
   - **Platform Cost**: Total weight × $0.02/lb
   - **Net Benefit**: Labor savings - platform cost
5. **Annual Summary**: Displays total volume, savings, costs, and net benefit across all selected species

## Understanding the Tests

### Unit Tests (`src/utils/calculations.test.ts`) - 18 tests

Tests the pure calculation functions:

- `calculateHeads()`: Converts total weight to number of animals
- `calculateLaborValue()`: Calculates dollar value of time saved
- `calculateTotalHeads()`: Sums heads across multiple species
- `calculateTotalLaborValue()`: Sums labor value across multiple species

**Current status**: 10 failing, 8 passing
**Why failing**: Bug in `calculateHeads()` function AND some tests have wrong expected values

### Integration Tests (`src/App.test.tsx`) - 7 tests

Tests the full React component:

- Rendering the UI elements
- Multi-select dropdown interaction
- Volume input display
- Calculation results display
- Advanced settings toggle
- Species selection/removal

**Current status**: 4 failing, 3 passing
**Why failing**: Tests looking for wrong text AND missing remove functionality

## Debugging Tips

1. **Start with the unit tests**: Fix the calculation bug first, as it affects many tests
2. **Read error messages carefully**: Test failures tell you exactly what's expected vs. what you got
3. **Use `yarn test` frequently**: Run tests after each change to see progress
4. **Use `console.log()`**: Add logging to understand what values functions are returning
5. **Check the browser console**: Run `yarn dev` and check for runtime errors
6. **Compare test expectations with actual output**: Some tests might be checking for wrong values

## Evaluation Criteria

Your submission will be evaluated on:

1. **Functionality** (40%)
   - All tests passing (should be 24/25 - one is intentionally hard)
   - New features work correctly
   - No console errors
   - Calculations are accurate

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
