# Project Guide

## Architecture

- `config/` contains the Django 6.1 project configuration and root URL routing.
- `core/` is the main Django application for backend features.
- `frontend/` is the Vue 3 single-page frontend built with Vite 5.
- Django serves the administration site at `/admin/`; SimpleUI supplies its theme.
- The frontend runs independently during development. Add explicit API endpoints before connecting Vue screens to Django data.

## Backend Development

- Use the project virtual environment. On Windows, invoke it directly when script execution policies prevent activation:
  `./.venv/Scripts/python.exe manage.py <command>`.
- Add Django models, views, URLs, and admin registrations to `core/` unless a new bounded domain application is needed.
- Add every new Django application to `INSTALLED_APPS` in `config/settings.py`.
- After model changes, run `makemigrations` followed by `migrate`; commit generated migration files.
- Preserve `simpleui` before `django.contrib.admin` in `INSTALLED_APPS`.
- Keep the default UI language as Simplified Chinese (`zh-hans`) unless requirements change.
- Do not commit secrets, credentials, or production configuration. Use environment variables for new sensitive settings.

## Frontend Development

- Run frontend commands from `frontend/`. In PowerShell, use `npm.cmd` if `npm.ps1` is blocked.
- Start the frontend with `npm.cmd run dev` and validate changes with `npm.cmd run build`.
- Place Vue source in `frontend/src/`; do not edit `frontend/dist/` or `frontend/node_modules/`.
- Keep frontend API configuration environment-based (for example, Vite `VITE_` variables), rather than hardcoding development URLs.

## Verification

- Backend: `./.venv/Scripts/python.exe manage.py check`.
- Backend tests: `./.venv/Scripts/python.exe manage.py test`.
- Frontend build: `npm.cmd run build` from `frontend/`.
- Run the relevant checks after each change and report any checks that could not run.
