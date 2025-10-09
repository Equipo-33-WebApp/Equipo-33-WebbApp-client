# CrediPyme Fintech App - Frontend

## Descripción
FinTech WebApp es una aplicación web que simula una plataforma bancaria destinada a la gestión de solicitudes de crédito para PyMEs.
Permite a los usuarios PyME solicitar créditos, consultar el estado de sus solicitudes y administrar su cuenta, mientras que los operadores bancarios pueden revisar, aprobar o rechazar solicitudes, y acceder a reportes y métricas con indicadores visuales.

La aplicación busca aplicar el flujo real de un sistema de créditos empresarial dentro de un entorno de pruebas controlado.

---

## Tecnologías

- React
- React Router
- TypeScript
- Vite
- TailwindCSS

---

## Convenciones

- **Nomenclatura de archivos:** PascalCase para componentes (`Button.tsx`, `Card.tsx`).  
- **Rutas relativas:** Usar `@/` para `src/`.  
- **Carpetas de componentes:**  
  - `ui/` para componentes globales reutilizables.  
  - Componentes específicos de páginas van en la carpeta de la página (`landing/`, `dashboard/components/`).  
- **Features:** Cada módulo tiene su carpeta con `pages/`, `components/`, `hooks/`, `services/` y `types.ts`.  
- **Hooks globales:** van en `src/hooks/` (ej. `useAuth`).  
- **Constantes globales:** en `src/constants/` (ej. roles de usuario).  

---

## Scripts

```bash
# Instalar dependencias
npm install

# Levantar servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Preview de producción
npm run preview
```

---

## Flujo de desarrollo

1. **Ramas:**
   - `dev` → desarrollo general, base para nuevas features.
   - `main` → producción. Deploy en Vercel.
   - Cada feature debe tener su propia rama a partir de `dev`.
2. **Merge a dev:**
   - Revisar código, resolver conflictos, asegurar consistencia en arquitectura.
3. **Deploy a producción:**
   - Solo desde `main`.
   - Dev se mantiene como default branch.

---
