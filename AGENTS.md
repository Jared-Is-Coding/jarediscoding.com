<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->
<!-- BEGIN:coding-agent-rules -->

# Coding Guidelines

- **Do not automatically build or test**: Do not automatically UI test. Ask user if they want the project to be UI tested only when necessary for functionality.

<!-- END:coding-agent-rules -->
<!-- BEGIN:lint-agent-rules -->

# Lint and Code Style Boundaries

When formatting code or addressing style/naming issues:

- **Style Only**: Only fix styling, formatting, layouts, and import ordering. Do not modify the underlying application logic or algorithms under any circumstances.
- **Commands**: Use `npm run lint --fix` (or `npm run lint -- --fix` if running directly through npm) and `npx prettier --write <file>` to automatically resolve style and format issues.
- **Naming Conventions**: Enforce naming conventions (such as camelCase for variables/functions, PascalCase for components/types) in accordance with the project's `.eslintrc.json`.
- **Logic Integrity**: Do not change code structure if it alters functional behavior. Verify all fixes by running the project build/lint commands.

Allowed commands: `npm run lint`, `npm run lint --fix`, `npx prettier --write <file>`

<!-- END:lint-agent-rules -->
