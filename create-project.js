#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class WebDesignReplicator {
  constructor(projectName) {
    this.projectName = projectName;
    this.projectPath = path.join(process.cwd(), projectName);
  }

  async createProject() {
    console.log('🎨 Iniciando Web Design Replicator (Modo Pixel-Perfect)...');
    console.log(`📁 Creando proyecto: ${this.projectName}`);

    try {
      // Crear proyecto React con Vite
      this.createReactProject();
      
      // Configurar estructura de carpetas
      this.setupFolderStructure();
      
      // Limpiar archivos y carpetas por defecto de Vite
      this.cleanupDefaultFiles();
      
      // Configurar archivos base
      this.setupConfigurationFiles();
      
      // Instalar dependencias adicionales
      this.installAdditionalDependencies();
      
      // Crear componentes base
      this.createBaseComponents();
      
      console.log('✅ Proyecto creado exitosamente!');
      console.log('\n🚀 Próximos pasos:');
      console.log(`1. cd ${this.projectName}`);
      console.log('2. npm install');
      console.log('3. npm run dev');
      console.log('\n📂 Carpetas para tus recursos:');
      console.log('- public/fonts/ → Tipografías');
      console.log('- public/images/ → Imágenes');
      console.log('- public/logos/ → Logos');
      console.log('- design-resources/ → Recursos del diseño');
      
    } catch (error) {
      console.error('❌ Error al crear el proyecto:', error.message);
      process.exit(1);
    }
  }

  createReactProject() {
    console.log('⚡ Creando proyecto React con Vite...');
    
    // Forzamos el idioma a inglés configurando variables de entorno temporales
    const env = { 
      ...process.env, 
      LANG: 'en_US.UTF-8', 
      LC_ALL: 'en_US.UTF-8',
      LANGUAGE: 'en_US.UTF-8'
    };

    execSync(`npx -y create-vite@latest ${this.projectName} --template react-ts --no-interactive`, {
      stdio: 'inherit',
      cwd: process.cwd(),
      env
    });
  }

  setupFolderStructure() {
    console.log('📂 Configurando estructura de carpetas...');
    this.allowedFolders = [
      'public/fonts',
      'public/images',
      'public/logos',
      'src/assets/styles',
      'src/components/common',
      'src/components/ui',
      'src/components/sections',
      'src/hooks',
      'src/utils',
      'src/types',
      'src/config',
      'design-resources/colors',
      'design-resources/mockups',
      'design-resources/specifications',
      'docs'
    ];

    this.allowedFolders.forEach(folder => {
      const fullPath = path.join(this.projectPath, folder);
      fs.mkdirSync(fullPath, { recursive: true });
    });
  }

  cleanupDefaultFiles() {
    console.log('🧹 Limpiando archivos y carpetas por defecto de Vite...');
    
    // Archivos específicos que Vite crea y no queremos
    const filesToDelete = [
      'src/assets/react.svg',
      'public/vite.svg',
      'src/App.css'
    ];

    filesToDelete.forEach(file => {
      const fullPath = path.join(this.projectPath, file);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    });

    // Revisar y eliminar carpetas no definidas en src/ y public/
    const checkAndCleanDir = (baseDir, currentPath = '') => {
      const fullDirPath = path.join(this.projectPath, baseDir, currentPath);
      if (!fs.existsSync(fullDirPath)) return;

      const items = fs.readdirSync(fullDirPath, { withFileTypes: true });
      
      items.forEach(item => {
        if (item.isDirectory()) {
          const relativePath = path.join(baseDir, currentPath, item.name).replace(/\\/g, '/');
          
          // Verificar si esta carpeta o alguna subcarpeta está en allowedFolders
          const isAllowed = this.allowedFolders.some(allowed => 
            allowed === relativePath || allowed.startsWith(relativePath + '/') || relativePath.startsWith(allowed + '/')
          );

          if (!isAllowed) {
            console.log(`   🗑️ Eliminando carpeta no deseada: ${relativePath}`);
            fs.rmSync(path.join(this.projectPath, relativePath), { recursive: true, force: true });
          } else {
            // Revisar recursivamente
            checkAndCleanDir(baseDir, path.join(currentPath, item.name));
          }
        }
      });
    };

    checkAndCleanDir('src');
    checkAndCleanDir('public');

    // Sobrescribir index.css para incluir Tailwind
    const indexCssPath = path.join(this.projectPath, 'src/index.css');
    const tailwindDirectives = `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n`;
    fs.writeFileSync(indexCssPath, tailwindDirectives);

    // Sobrescribir App.tsx con un boilerplate limpio
    const appTsxPath = path.join(this.projectPath, 'src/App.tsx');
    const appTsxContent = `import React from 'react';
import { Layout } from './components/common/Layout';
import { Container } from './components/common/Container';
import { Button } from './components/ui/Button';

function App() {
  return (
    <Layout>
      <Container className="py-[40px]">
        <h1 className="text-[32px] font-bold mb-[20px]">Web Design Replicator</h1>
        <p className="text-[16px] text-[#333333] mb-[20px]">
          Proyecto configurado exitosamente para diseño pixel-perfect.
        </p>
        <Button>Empezar a diseñar</Button>
      </Container>
    </Layout>
  );
}

export default App;
`;
    fs.writeFileSync(appTsxPath, appTsxContent);
  }

  setupConfigurationFiles() {
    console.log('⚙️ Configurando archivos de configuración...');
    
    const colorsConfig = `// Configuración de colores corporativos en Hexadecimal
// Extraídos directamente del diseño (Photoshop/Illustrator)

export const brandColors = {
  primary: '#000000',   // Reemplazar con hex primario
  secondary: '#ffffff', // Reemplazar con hex secundario
  accent: '#ff0000',    // Reemplazar con hex de acento
  background: '#f5f5f5',
  text: '#333333'
};
`;

    const designUtils = `// Utilidades para replicación de diseños Pixel-Perfect

// Las medidas se manejan directamente en px usando clases arbitrarias de Tailwind
// Ejemplo: w-[150px] h-[45px] p-[20px] text-[16px]

export const breakpoints = {
  mobile: '375px',
  tablet: '768px',
  desktop: '1440px',
};
`;

    fs.writeFileSync(path.join(this.projectPath, 'src/config/colors.ts'), colorsConfig);
    fs.writeFileSync(path.join(this.projectPath, 'src/utils/design.ts'), designUtils);

    // Crear archivos MD para diseño en design-resources/
    const colorsMdContent = `# Paleta de Colores

Define aquí los colores extraídos del diseño original (Photoshop/Illustrator/Figma).

## Colores Principales
- **Primario**: \`#000000\`
- **Secundario**: \`#ffffff\`
- **Acento**: \`#ff0000\`

## Colores de Fondo y Texto
- **Fondo Principal**: \`#f5f5f5\`
- **Texto Principal**: \`#333333\`

> **Nota para la IA:** Al replicar el diseño, utiliza estos valores hexadecimales exactos mediante clases arbitrarias de Tailwind (ej: \`bg-[#000000]\` o \`text-[#333333]\`).
`;
    fs.writeFileSync(path.join(this.projectPath, 'design-resources/colors/colors.md'), colorsMdContent);

    const specificationsMdContent = `# Especificaciones de Diseño

Documenta aquí cualquier regla o detalle específico del diseño que deba respetarse estrictamente.

## Tipografía
- **Fuente Principal**: [Nombre de la fuente]
- **Fuente Secundaria**: [Nombre de la fuente]
- **Pesos (Weights)**: Regular (400), Medium (500), Bold (700)

## Espaciados y Layout
- **Ancho Máximo del Contenedor**: 1440px
- **Márgenes Laterales (Mobile)**: 20px
- **Márgenes Laterales (Desktop)**: 40px

## Efectos Visuales
- **Sombras (Drop Shadows)**: [Especificar si las hay]
- **Bordes Redondeados (Border Radius)**: [Especificar px por defecto]

> **Nota para la IA:** Usa siempre valores arbitrarios en píxeles para respetar estas medidas (ej: \`px-[20px]\`, \`rounded-[8px]\`).
`;
    fs.writeFileSync(path.join(this.projectPath, 'design-resources/specifications/specifications.md'), specificationsMdContent);
    
    // Eliminar archivo typography.ts anterior si existía para simplificar
    const typoPath = path.join(this.projectPath, 'src/config/typography.ts');
    if (fs.existsSync(typoPath)) fs.unlinkSync(typoPath);
  }

  installAdditionalDependencies() {
    console.log('📦 Instalando dependencias adicionales...');
    
    const dependencies = [
      'zustand',
      'react-router-dom',
      '@types/node',
      'clsx',
      'tailwind-merge'
    ];

    const devDependencies = [
      'autoprefixer',
      'postcss',
      'tailwindcss'
    ];

    execSync(`cd ${this.projectPath} && npm install ${dependencies.join(' ')}`, { stdio: 'inherit' });
    execSync(`cd ${this.projectPath} && npm install -D ${devDependencies.join(' ')}`, { stdio: 'inherit' });
    execSync(`cd ${this.projectPath} && npx tailwindcss init -p`, { stdio: 'inherit' });

    // Sobrescribir tailwind.config.js para fomentar el uso de valores arbitrarios
    const tailwindConfig = `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Nota: El asistente usará valores arbitrarios [px] y [#hex] para replicación pixel-perfect
      // ej: text-[16px] w-[250px] bg-[#ff0055] p-[20px]
    },
  },
  plugins: [],
}
`;
    fs.writeFileSync(path.join(this.projectPath, 'tailwind.config.js'), tailwindConfig);
  }

  createBaseComponents() {
    console.log('🧩 Creando componentes base con medidas pixel-perfect...');
    
    const layoutComponent = `import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, className = '' }) => {
  return (
    <div className={\`min-h-[100vh] bg-[#ffffff] \${className}\`}>
      {children}
    </div>
  );
};
`;

    const containerComponent = `import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: string;
}

export const Container: React.FC<ContainerProps> = ({ 
  children, 
  className = '',
  maxWidth = '1440px'
}) => {
  return (
    <div 
      className={\`mx-auto px-[20px] \${className}\`}
      style={{ maxWidth }}
    >
      {children}
    </div>
  );
};
`;

    const buttonComponent = `import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary',
  className = '',
  onClick,
  disabled = false
}) => {
  // Clases base usando px y hex exactos en lugar de utilidades predefinidas
  const baseClasses = 'inline-flex items-center justify-center font-[500] rounded-[8px] transition-colors';
  
  const variantClasses = {
    primary: 'bg-[#000000] text-[#ffffff] hover:bg-[#333333]',
    secondary: 'bg-[#f5f5f5] text-[#333333] hover:bg-[#e5e7eb]',
    outline: 'border-[1px] border-[#d1d5db] text-[#333333] hover:bg-[#f9fafb]'
  };
  
  // Tamaños por defecto en px
  const defaultSize = 'px-[24px] py-[12px] text-[16px]';

  const classes = twMerge(
    baseClasses,
    variantClasses[variant],
    defaultSize,
    disabled && 'opacity-[0.5] cursor-not-allowed',
    className
  );

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
`;

    fs.writeFileSync(path.join(this.projectPath, 'src/components/common/Layout.tsx'), layoutComponent);
    fs.writeFileSync(path.join(this.projectPath, 'src/components/common/Container.tsx'), containerComponent);
    fs.writeFileSync(path.join(this.projectPath, 'src/components/ui/Button.tsx'), buttonComponent);
  }
}

if (require.main === module) {
  const projectName = process.argv[2] || 'web-design-project';
  const replicator = new WebDesignReplicator(projectName);
  replicator.createProject();
}

module.exports = WebDesignReplicator;