# Contributing to ADmyBRAND Insights Dashboard

We love your input! We want to make contributing to ADmyBRAND Insights Dashboard as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

## Pull Requests

Pull requests are the best way to propose changes to the codebase. We actively welcome your pull requests:

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

## Development Setup

1. **Clone your fork**
   ```bash
   git clone https://github.com/yourusername/admybrand-insights.git
   cd admybrand-insights
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Run linting**
   ```bash
   npm run lint
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## Code Style

- We use ESLint and Prettier for code formatting
- Follow TypeScript best practices
- Use meaningful variable and function names
- Add comments for complex logic
- Follow the existing code structure and patterns

### Component Guidelines

- Use functional components with hooks
- Implement proper TypeScript interfaces
- Follow the established folder structure
- Use Tailwind CSS for styling
- Implement responsive design
- Add proper accessibility attributes

### Commit Messages

We follow conventional commit format:

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding tests
- `chore:` for maintenance tasks

Example:
```
feat: add real-time data refresh functionality

- Implement WebSocket connection for live updates
- Add refresh interval configuration
- Update charts to handle streaming data
```

## Bug Reports

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/yourusername/admybrand-insights/issues).

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

## Feature Requests

We welcome feature requests! Please provide:

- Clear description of the feature
- Use case and benefits
- Possible implementation approach
- Screenshots or mockups if applicable

## Testing

- Write tests for new features
- Ensure existing tests pass
- Test on different screen sizes
- Test both light and dark themes
- Verify accessibility compliance

## Documentation

- Update README.md for new features
- Add JSDoc comments for functions
- Update component documentation
- Include examples in documentation

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

Feel free to open an issue with the `question` label or start a discussion in the GitHub Discussions tab.

## Recognition

Contributors will be recognized in our README.md file and release notes.

Thank you for contributing to ADmyBRAND Insights Dashboard! 🚀