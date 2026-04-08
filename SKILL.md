---
name: "web-design-replicator"
description: "Crea proyectos React optimizados para replicar diseños desde Photoshop/Illustrator. Invoke cuando necesites crear una base para diseño web con carpetas para recursos."
---

# Web Design Replicator

Esta skill es un asistente especializado para crear proyectos React optimizados y preparados para la replicación de diseños desde herramientas de diseño como Photoshop o Illustrator.

## ¿Qué hace?

1. **Crea un proyecto React completamente optimizado** con las mejores prácticas
2. **Genera la estructura de carpetas para recursos** (tipografías, logos, imágenes, colores)
3. **Prepara el proyecto para recibir diseños** y convertirlos a código
4. **Configura Tailwind CSS** para un desarrollo rápido y consistente
5. **Organiza los componentes** de manera modular y escalable

## Estructura del Proyecto

Cuando invoques esta skill, creará:

```
proyecto/
├── public/
│   ├── fonts/          # Tipografías personalizadas
│   ├── images/         # Imágenes y assets
│   └── logos/          # Logos corporativos
├── src/
│   ├── assets/
│   │   └── styles/     # Estilos globales y variables
│   ├── components/     # Componentes React reutilizables
│   │   ├── common/     # Componentes comunes (Header, Footer, etc)
│   │   ├── ui/         # Componentes de UI (botones, cards, etc)
│   │   └── sections/   # Secciones de la web
│   ├── hooks/          # Custom hooks
│   ├── utils/          # Funciones utilitarias
│   ├── types/          # Definiciones TypeScript
│   └── config/         # Configuraciones (colores, tipografía, etc)
├── design-resources/   # Recursos del diseño
│   ├── colors/         # Paletas de colores
│   ├── mockups/        # Mockups y referencias
│   └── specifications/ # Especificaciones del diseño
└── docs/               # Documentación del proyecto
```

## Características Incluidas

- **React 18** con TypeScript
- **Vite** para desarrollo ultra-rápido
- **Tailwind CSS** con configuración personalizable
- **Zustand** para manejo de estado
- **React Router** para navegación
- **ESLint y Prettier** preconfigurados
- **Estructura modular** para fácil escalabilidad

## Cómo usar esta skill

1. **Invoca la skill** cuando necesites crear un nuevo proyecto para replicar un diseño
2. **Sigue las instrucciones** para personalizar colores y configuración inicial
3. **Sube tus recursos** a las carpetas correspondientes
4. **Proporciona capturas** del diseño que quieres replicar
5. **La skill te ayudará** a convertir el diseño en código React

## Optimizaciones Incluidas

- **Code splitting** automático
- **Lazy loading** de imágenes
- **Optimización de bundles**
- **Configuración de PWA** (opcional)
- **SEO básico** preconfigurado
- **Performance optimizada** (Core Web Vitals)

## Personalización

La skill te permitirá:

- Definir colores corporativos
- Especificar tipografías
- Configurar breakpoints responsive
- Establecer convenciones de nombres
- Personalizar la estructura de componentes

## Instrucciones para la IA (System Prompt)

Cuando actúes como replicador de diseño (calcador) utilizando esta skill, debes seguir estrictamente estas reglas:

1. **Creación Obligatoria Mediante Script:**
   - **NUNCA** crees el proyecto ejecutando comandos manuales como `npm create vite` o similares.
   - **SIEMPRE** debes invocar el script automatizado para crear el proyecto y su estructura: ejecuta el archivo `create-project.js` pasando como argumento el nombre del proyecto deseado. Ejemplo: `node <ruta-al-script>/create-project.js nombre-proyecto`.
   - Este script ya se encarga de instalar React, TypeScript, Vite, Tailwind y configurar toda la arquitectura por defecto de manera 100% silenciosa y no interactiva.

2. **Modo Pixel-Perfect (Valores Arbitrarios):** 
   - **NUNCA** uses las clases de tamaño o color predeterminadas de Tailwind (ej: `w-4`, `p-5`, `text-sm`, `bg-blue-500`, `rounded-md`).
   - **SIEMPRE** usa valores arbitrarios de Tailwind en **píxeles** y colores en **hexadecimal** (ej: `w-[150px]`, `p-[20px]`, `text-[14px]`, `bg-[#FF5733]`, `rounded-[8px]`).
   - Esto asegura que la réplica sea exactamente igual a los valores de Photoshop/Illustrator que el usuario ha proporcionado.

3. **Tipografía y Fuentes:**
   - Usa los nombres de las fuentes subidas por el usuario usando notación arbitraria (ej: `font-['Montserrat']`).
   - Define el peso de la fuente explícitamente (ej: `font-[600]`).

4. **Uso de Recursos:**
   - Para imágenes y logos, asume que están en `public/images/` o `public/logos/` y referéncialos correctamente.

## Flujo de Trabajo

1. **Inicialización**: Crea el proyecto base
2. **Configuración**: Define colores, tipografías y recursos
3. **Preparación**: Organiza los assets del diseño
4. **Replicación**: Convierte diseños a componentes React
5. **Optimización**: Refina y mejora el código generado

Esta skill está diseñada para ser tu asistente completo en el proceso de convertir diseños estáticos en aplicaciones React dinámicas y profesionales.