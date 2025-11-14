# Sistema de Gestión de Tarjetas

Sistema completo de gestión de tarjetas de crédito con frontend en Next.js y backend en Firebase Functions.

## Tecnologías Utilizadas

### Frontend
- **Next.js 14** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos (vía CSS puro)
- **pnpm** - Gestor de paquetes
- **React Context API** - Manejo de estado

### Backend
- **Firebase Functions** - Funciones serverless
- **Cloud Firestore** - Base de datos NoSQL
- **TypeScript** - Tipado estático
- **Express-style routing** - Enrutamiento HTTP
- **CORS** - Habilitado para todas las peticiones

## Estructura del Proyecto

```
├── frontend/              # Aplicación Next.js
│   ├── app/              # App Router
│   │   ├── components/   # Componentes reutilizables
│   │   ├── context/      # Context API
│   │   ├── hook/         # Custom hooks
│   │   ├── cards/        # Páginas de tarjetas
│   │   └── ...
│   └── public/           # Recursos estáticos
│
└── backend/              # Firebase Functions
    ├── functions/
    │   └── src/
    │       ├── controllers/  # Lógica de rutas
    │       ├── services/     # Lógica de negocio
    │       ├── validators/   # Validaciones
    │       └── utils/        # Utilidades
    └── ...
```

## Requisitos Previos

- **Node.js** 18 o superior
- **pnpm** (gestor de paquetes)
- **Firebase CLI** (para el backend)
- **Cuenta de Firebase** (para deploy)

## Instalación Global

```bash
npm install -g pnpm
npm install -g firebase-tools
```

## Configuración Inicial

### 1. Clonar el repositorio

```bash
git clone <tu-repo>
cd <nombre-proyecto>
```

### 2. Configurar Backend

```bash
cd backend
firebase login
firebase init
```

Selecciona:
- Functions
- Firestore
- Tu proyecto de Firebase

Luego instala dependencias:

```bash
cd functions
npm install
cd ..
```

### 3. Configurar Frontend

```bash
cd frontend
pnpm install
```

Crea un archivo `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:5001/YOUR-PROJECT-ID/us-central1/cards
```

## Ejecución en Desarrollo

### Ejecutar Backend (Puerto 5001 + UI en 4000)

En una terminal:

```bash
cd backend/functions
npm run serve
```

Esto iniciará:
- **Functions**: `http://127.0.0.1:5001`
- **Emulator UI**: `http://127.0.0.1:4000`
- **Firestore**: Puerto automático

### Ejecutar Frontend (Puerto 3000)

En otra terminal:

```bash
cd frontend
pnpm dev
```

Accede a: `http://localhost:3000`

## URLs Importantes

| Servicio | URL | Puerto |
|----------|-----|--------|
| Frontend | http://localhost:3000 | 3000 |
| Backend API | http://127.0.0.1:5001 | 5001 |
| Firebase Emulator UI | http://127.0.0.1:4000 | 4000 |

## Características Implementadas

### Frontend
✅ Formulario de agregar tarjeta con preview interactivo  
✅ Validaciones en tiempo real  
✅ Vista de tarjetas recientes (últimas 3)  
✅ Lista completa de tarjetas con filtro por nombre  
✅ Paginación (6 tarjetas por página)  
✅ Vista de detalle de tarjeta individual  
✅ Eliminación de tarjetas  
✅ Diseño responsive  
✅ Enmascaramiento de números de tarjeta

### Backend
✅ CRUD completo (Create, Read, Update, Delete)  
✅ Validaciones en backend  
✅ Enmascaramiento automático de tarjetas  
✅ Códigos HTTP apropiados (200, 201, 400, 404, 500)  
✅ CORS habilitado  
✅ Timestamps automáticos (createdAt, updatedAt)  
✅ Estructura modular (controllers, services, validators)

## Deploy a Producción

### Backend

```bash
cd backend
firebase deploy --only functions,firestore
```

### Frontend

```bash
cd frontend
pnpm build
```

Luego despliega en Vercel, Netlify o tu plataforma preferida.

Actualiza `.env.local` con la URL de producción:

```env
NEXT_PUBLIC_API_URL=https://us-central1-YOUR-PROJECT-ID.cloudfunctions.net/cards
```

## Documentación Adicional

- [Frontend README](./frontend/README.md) - Detalles del frontend
- [Backend README](./backend/README.md) - Detalles del backend

## Problemas Comunes

### Backend no inicia

Si ves el error `Functions codebase could not be analyzed`, verifica:

1. Que ejecutaste `npm install` en `backend/functions`
2. Que ejecutaste `npm run build` para compilar TypeScript
3. Revisa los logs en `functions/firebase-debug.log`

### Frontend no conecta con Backend

1. Verifica que el backend esté corriendo
2. Revisa la URL en `.env.local`
3. Reemplaza `YOUR-PROJECT-ID` con tu ID real de Firebase
4. Reinicia el servidor frontend después de cambiar `.env.local`

## Soporte

Para reportar problemas o sugerencias, crea un issue en el repositorio.