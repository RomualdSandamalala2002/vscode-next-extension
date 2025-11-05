# Next.js extension for VS Code

## Introduction

This is a unofficial Next.js extension for VS Code.

It aims to be a **Swiss Army knife** for managing Next.js project structure, configuration, and version details right within your IDE.

## Key Features

* **Next.js Route Discovery:** Automatically display all detected application routes and API endpoints within your project (supporting both the `src` and `app` directories).
* **Project Structure Analysis:** Accurately detect and report the architectural style of your Next.js project, distinguishing between the **App Router** and **Pages Router** paradigms.
* **Dependency Version Reporting:** Easily access and display the current versions of key dependencies, specifically **Next.js** and **React**.
* **On-the-Fly File Navigation:** Active development to enable quick navigation and direct opening of page files from within the assistant interface.
* **Linter Configuration Detection (Planned):** Future capability to identify and report on the configured linter setup (e.g., ESLint rules) to ensure coding standards are maintained.

## Usage

To use the application for debugging:

1. **Clone the repository**
  
```bash
git clone https://github.com/RomualdSandamalala2002/vscode-next-extension
cd vscode-next-extension
```

2. **Open the extension in VS Code**

    * Launch VS Code and open the cloned folder.


3. **Run the extension**

    * Go to the Run and Debug panel (Ctrl+Shift+D / Cmd+Shift+D on macOS).
    * Select Run Extension and start debugging.

4. **Use it in any Next.js project**

    * Open a Next.js project in VS Code.
    * The extension will automatically detect your app structure.
    * Use the Command Palette (Ctrl+Shift+P / Cmd+Shift+P) and search for:
        * `Next.js: Preview Route` to preview pages or API routes.

Check the Output panel for debug logs and extension activity.

## Installation

Currently, this extension is **not yet published** on any marketplace (e.g., [VS Code Marketplace](https://marketplace.visualstudio.com/) or [Open VSX](https://open-vsx.org/)).

You can still install it manually by generating a `.vsix` package:

```bash
# Clone the repository
git clone https://github.com/RomualdSandamalala2002/vscode-next-extension
cd vscode-next-extension

# Install dependencies
npm install

# Build and package the extension
npx vsce package
```

This command will generate a .vsix file (e.g. nextjs-extension-x.x.x.vsix).

Then, install it in VS Code:

```bash
code --install-extension nextjs-extension-x.x.x.vsix
```

Once installed, reload VS Code and start using the extension 🚀.

## Roadmap

The following features and improvements are planned for future releases of this extension:

* **Testing & Debugging**
  * Add a dedicated section for testing and debugging Next.js applications directly within VS Code.
  * Provide detailed logs and error hints to make debugging easier.

* **Component Detection**
  * Automatically detect all React components and pages.
  * Identify whether each component uses **Server-Side Rendering (SSR)**, **Client-Side Rendering (CSR)**, or **Static Site Generation (SSG)**.

* **Middleware Detection**
  * Detect middleware for any route.
  * Indicate whether the middleware is **activated** or **not**.
  * Show execution order for middleware when multiple are applied.

* **Extension Testing**
  * Create automated tests to ensure extension features work as expected.
  * Include unit tests for internal logic and integration tests for VS Code commands.

* **CI/CD Pipeline**
  * Build a pipeline to automate **testing**, **building**, and **publishing** using GitHub Actions.
  * Ensure each release is stable and ready for manual or marketplace installation.

* **User Experience Enhancements**
  * Add tooltips, hover info, and visual hints for detected routes and components.
  * Include a sidebar panel for route and component overview.

* **Documentation & Examples**
  * Improve README with detailed usage examples.
  * Provide example projects demonstrating all features.

* **Marketplace Publication**
  * Package and publish the extension to the [VS Code Marketplace](https://marketplace.visualstudio.com/) and [Open VSX](https://open-vsx.org/).

* **Community Feedback & Contributions**
  * Encourage user feedback to prioritize features.
  * Create clear contribution guidelines to accept community pull requests.

## Contributing

Contributions are welcome! 🚀

### Report Issues

If you find a bug or have a feature request, please open an issue in the repository so it can be tracked and discussed.

### How to Contribute

1. **Fork** the repo and **clone** your fork.  
2. Create a **new branch** for your feature or fix.  
3. **Make changes** and **commit** them with a clear message.  
4. **Push** your branch and open a **Pull Request**.

Please keep code clean and follow the existing style.
