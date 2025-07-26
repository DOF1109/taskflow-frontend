# TaskFlow Frontend

Este es el frontend para la aplicación TaskFlow, una herramienta sencilla para la gestión de proyectos y tareas. La aplicación está construida con React, TypeScript y Vite, y consume una API backend para la gestión de datos.

## Características

- **Autenticación de usuarios**: Registro e inicio de sesión de usuarios.
- **Dashboard**: Un panel de control que muestra un resumen de la actividad del usuario.
- **Gestión de proyectos**: Creación y visualización de proyectos.
- **Gestión de tareas**: Creación y visualización de tareas asociadas a un proyecto.
- **Rutas protegidas**: Solo los usuarios autenticados pueden acceder a las páginas de la aplicación.
- **Diseño limpio y moderno**: Una interfaz de usuario sencilla y fácil de usar.

## Tech Stack

- **React**: Biblioteca para construir interfaces de usuario.
- **TypeScript**: Superset de JavaScript que añade tipado estático.
- **Vite**: Herramienta de desarrollo frontend moderna y rápida.
- **React Router**: Para la gestión de rutas en la aplicación.
- **Axios**: Cliente HTTP para realizar peticiones a la API.
- **CSS plano**: Para el diseño de la interfaz de usuario.

## Instalación y ejecución

1.  **Clona el repositorio**:

    ```bash
    git clone https://github.com/angievic/taskflow-frontend.git
    ```

2.  **Instala las dependencias**:

    ```bash
    npm install
    ```

3.  **Inicia el servidor de desarrollo**:

    ```bash
    npm run dev
    ```

    La aplicación estará disponible en `http://localhost:5173`.

## Scripts disponibles

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Compila la aplicación para producción.
- `npm run lint`: Ejecuta el linter para comprobar el código.
- `npm run preview`: Inicia un servidor local para previsualizar la aplicación de producción.
