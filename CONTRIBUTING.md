# Contributing to dgz-engineering

We are excited to have you as a contributor! Please follow the guidelines below to help us maintain a great project.

## Setting Up the Development Environment
1. **Clone the repository**
   ```bash
   git clone https://github.com/DGZ-Engineering-Lab/dgz-engineering.git
   cd dgz-engineering
   ```

2. **Install dependencies** (Node.js 20.9+ and Python 3.11+)
   ```bash
   npm --prefix apps/web ci
   pip install ruff pytest -r backend/qa_engine/requirements.txt
   ```

3. **Run the web app**
   ```bash
   npm run dev
   ```

## Submitting Pull Requests
1. **Fork the repository** on GitHub.
2. **Create a feature branch** from `main`:
   ```bash
   git checkout -b your-feature-name
   ```
3. **Make your changes** and commit them:
   ```bash
   git commit -m "Add some feature"
   ```
4. **Push your changes**:
   ```bash
   git push origin your-feature-name
   ```
5. **Open a Pull Request** on GitHub.

## Code Standards
- **JavaScript/React** (`apps/web`): ESLint (`eslint-config-next`) is enforced in CI. Prettier is configured
  (`npm --prefix apps/web run format`); format the files you touch.
- **Python**: [Ruff](https://docs.astral.sh/ruff/) is enforced in CI with the rules in `ruff.toml`.
- Shared server-side helpers live in `apps/web/src/lib` (`http.js`, `validation.js`, `html.js`).
  API routes must validate input, escape user content placed in HTML, and never return raw
  `error.message` to clients (use `internalError`).
- Use meaningful names for variables and functions, and keep comments for the non-obvious "why".

## Testing Procedures
- Write tests for any new feature or bug fix. Web unit tests use Vitest (`src/**/__tests__/*.test.js`);
  Python tests use pytest.
- Run everything CI runs before opening a pull request:
  ```bash
  npm run check        # lint + typecheck + unit tests (web), ruff + pytest (python)
  npm run build        # production build of apps/web
  ```

Thank you for your contributions!
