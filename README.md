# Co-Chef Frontend

Welcome to the Co-Chef Frontend repository! This is the client-side application for the Co-Chef platform, a comprehensive web application for managing recipes, categories, ingredients, users, and marketplace interactions.

## 🚀 Overview

The application is built using modern Angular with a focus on a high-performance, zoneless architecture, standalone components, and signal-based reactivity. It provides an intuitive admin dashboard and a suite of tools for managing the core data of the Co-Chef ecosystem.

## 💻 Tech Stack

- **Framework**: Angular 16+ (Standalone Components, Signals, Zoneless)
- **Styling**: Bootstrap, Bootstrap Icons, Custom CSS
- **Testing**: Jasmine, Karma

## 🛠️ Development Server

To start the development server, run:
```bash
npm start
```
Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## 📦 Build

To build the project for production, run:
```bash
npm run build -- --configuration=production
```
The build artifacts will be stored in the `dist/` directory.

## 🧪 Running Tests

- **Unit tests**: Run `npm run test` to execute the unit tests via Karma.
- **Linting**: Run `npm run lint` to enforce code quality and style guidelines.

## 📂 Project Structure

- `src/app/components`: Contains all the standalone UI components (e.g., Sidebar, Navbar, Admin views).
- `src/app/services`: Contains injectable services for API communication and state management.
- `src/app/pipes`: Contains custom Angular pipes.
- `src/app/guards`: Contains route guards for access control.
- `src/environments`: Environment-specific configuration files.

## 🤝 Contributing

When contributing to this project, please ensure:
1. All new components are standalone.
2. State is managed using Angular Signals.
3. Legacy modules (`@NgModule`) and decorators (`@Input`, `@Output`) are avoided where possible in favor of modern APIs (`input()`, `output()`).
