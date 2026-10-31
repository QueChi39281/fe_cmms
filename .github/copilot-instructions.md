# Project guidance

- Stack: Vite, React, JavaScript, React Router, and separate CSS files.
- Keep shared UI in `src/components`; organize domain screens and API methods under `src/features` and `src/services/api`.
- Preserve role-specific navigation for admin, manager, equipment user, and technician.
- Keep layouts responsive for desktop, tablet, and mobile.
- Read the API base URL from `VITE_API_BASE_URL`; do not hardcode backend hosts in feature code.
- Run `npm run build` and `npm run lint` after code changes.
