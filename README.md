# NumericalAnalysisCalculator

A web calculator for classic numerical analysis methods, built for a university numerical analysis course. A React frontend collects inputs and displays results, and a Django backend runs the numerical methods, which are implemented as MATLAB functions and called through the MATLAB Engine for Python.

## Features

Methods exposed by the backend API (`backend/*/urls.py`) and the frontend pages:

- **Nonlinear equations** (`/api/non_linear_eq/`): bisection, fixed point, regula falsi, Newton, multiple roots, secant.
- **Linear systems** (`/api/linear_eq/`): iterative methods (a single endpoint, `calcular_metodos_iterativos/`, receiving the method selector `l` and parameters such as tolerance, norm, iteration limit and relaxation factor `w`; a `SOR.m` function is included).
- **Interpolation** (`/api/interpolation/`): Vandermonde, Newton, Lagrange, linear spline, quadratic spline, cubic spline.
- Frontend plotting of functions and point sets, and LaTeX rendering of matrices, tables and polynomials.

## Tech stack

- Backend: Python, Django, Django REST Framework, django-cors-headers, NumPy, MATLAB Engine API for Python, SQLite (Django default).
- Numerical code: MATLAB `.m` files in `backend/<app>/matlab_functions_cap*/`.
- Frontend: React 18, React Router, Create React App, Tailwind CSS, styled-components, Axios, mathjs, function-plot, Chart.js, D3, KaTeX.

## Project structure

```
backend/
  server_project/   Django settings and root URLs
  non_linear_eq/    nonlinear equation views + MATLAB functions (cap. 1)
  linear_eq/        linear system views + MATLAB functions (cap. 2)
  interpolation/    interpolation views + MATLAB functions (cap. 3)
  functions/        Django app listed in INSTALLED_APPS
frontend/
  src/              React app (Home, NonLinear, Linear, interpolation, utils)
```

## Getting started

The repository has no requirements file or lockfile for the backend, so the Python dependencies below are inferred from the imports.

Prerequisites: Python, Node.js with npm, and a local MATLAB installation with the MATLAB Engine API for Python installed (the views call `matlab.engine.start_matlab()` when they are imported).

Backend:

```bash
cd backend
pip install django djangorestframework django-cors-headers numpy
# plus the MATLAB Engine API for Python from your MATLAB installation
python manage.py runserver
```

Frontend:

```bash
cd frontend
npm install
npm start      # development server (CORS is configured for http://127.0.0.1:3000)
npm run build  # production build
npm test
```

## Context

Project for a numerical analysis course. The MATLAB function folders are named after the course chapters (`cap1`, `cap2`, `cap3`), and the UI and code are in Spanish.

## License

See the `LICENSE` file.
