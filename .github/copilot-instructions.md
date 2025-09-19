# Copilot Instructions for EDCMS

This guide helps AI coding agents work productively in the EDCMS codebase. It summarizes architecture, workflows, and conventions specific to this project.

## Project Overview
- **EDCMS** is an Electronic Document and Content Management System for managing digital documents and web content.
- Built with **Laravel (PHP)** for backend, **Inertia.js** and **React/TypeScript** for frontend.
- Key directories:
  - `app/Http/Controllers/` — Laravel controllers (API, web, auth)
  - `app/Models/` — Eloquent models (e.g., `User.php`)
  - `resources/js/` — React/TypeScript SPA code (pages, components, hooks)
  - `resources/views/` — Blade templates for server-rendered views
  - `routes/` — Route definitions (`web.php`, `auth.php`, etc.)
  - `database/` — Migrations, factories, seeders

## Architecture & Data Flow
- **Backend:** Laravel routes (`routes/web.php`) map to controllers, which interact with models and return responses (JSON or Blade views).
- **Frontend:** Inertia.js bridges Laravel and React, enabling SPA navigation with server-side routing.
- **Database:** Uses SQLite for local development (`database/database.sqlite`).

## Developer Workflows
- **Install dependencies:**
  - PHP: `composer install`
  - JS: `npm install`
- **Run dev server:**
  - PHP: `composer run dev`
  - PHP: `php artisan serve`
  - JS: `npm run dev` (Vite)
- **Run tests:**
  - PHP: `php artisan test` or `vendor/bin/phpunit`
- **Migrate DB:** `php artisan migrate`
- **Seed DB:** `php artisan db:seed`

## Conventions & Patterns
- **Controllers**: Grouped by domain (e.g., Auth, Settings, Dashboard).
- **Models**: Eloquent ORM, use relationships and accessors.
- **React components**: Located in `resources/js/components/`, use hooks from `resources/js/hooks/`.
- **Routes**: Web routes in `routes/web.php`, API routes in `routes/api.php` (if present).
- **Testing**: Feature tests in `tests/Feature/`, unit tests in `tests/Unit/`.
- **Config**: Environment variables in `.env`, app config in `config/`.

## Integration Points
- **Inertia.js**: Handles SPA navigation and data passing between Laravel and React.
- **External dependencies**: See `composer.json` (PHP) and `package.json` (JS) for libraries.

## Examples
- To add a new page:
  1. Create a React component in `resources/js/pages/`
  2. Add a route in `routes/web.php` and map to a controller
  3. Return an Inertia response from the controller

- To add a migration:
  1. Run `php artisan make:migration ...`
  2. Edit migration in `database/migrations/`
  3. Run `php artisan migrate`

## References
- See `README.md` for high-level project description.
- Key files: `app/Http/Controllers/`, `resources/js/`, `routes/web.php`, `database/migrations/`, `tests/`

---

**Update this file as project conventions evolve.**
