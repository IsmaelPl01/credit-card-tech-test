# Frontend - Sistema de Gestión de Tarjetas

Aplicación web desarrollada con Next.js 14 y TypeScript para la gestión de tarjetas de crédito.

## Tecnologías

- **Next.js 14** - Framework React con App Router
- **TypeScript** - Tipado estático
- **React Context API** - Manejo de estado global
- **CSS Modules** - Estilos personalizados
- **pnpm** - Gestor de paquetes rápido y eficiente
- **Next/Image** - Optimización de imágenes

## Requisitos

- Node.js 18+
- pnpm (instalar con `npm install -g pnpm`)
- Backend corriendo en `http://127.0.0.1:5001`

## Instalación

```bash
pnpm install
```

## Configuración

### Variables de Entorno

Crea un archivo `.env.local` en la raíz del frontend:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:5001/YOUR-PROJECT-ID/us-central1/cards
```

**IMPORTANTE:** Reemplaza `YOUR-PROJECT-ID` con el ID de tu proyecto de Firebase.

Para obtener tu Project ID:
1. Ve a Firebase Console: https://console.firebase.google.com/
2. Selecciona tu proyecto
3. El ID aparece en la configuración del proyecto

### Recursos Estáticos

Asegúrate de tener estos archivos en la carpeta `public/`:
- `contactless.svg` - Icono de contactless
- `chip.png` - Imagen del chip de la tarjeta

## Ejecución

### Desarrollo (Puerto 3000)

```bash
pnpm dev
```

La aplicación estará disponible en: **http://localhost:3000**

### Build de Producción

```bash
pnpm build
pnpm start
```

### Linting

```bash
pnpm lint
```

## Estructura del Proyecto

```
frontend/
├── app/
│   ├── components/
│   │   ├── CardPreview.tsx       # Preview interactivo de tarjeta
│   │   ├── CreditCardForm.tsx    # Formulario principal
│   │   ├── CardItem.tsx          # Item individual de tarjeta
│   │   └── CardList.tsx          # Lista con filtros y paginación
│   ├── context/
│   │   └── CardContext.tsx       # Estado global + API calls
│   ├── hook/
│   │   └── useCardValidation.ts  # Validaciones del formulario
│   ├── cards/
│   │   ├── page.jsx              # Lista completa de tarjetas
│   │   └── [id]/
│   │       └── page.tsx          # Detalle de tarjeta
│   ├── page.tsx                  # Página principal
│   ├── layout.tsx                # Layout raíz
│   └── globals.css               # Estilos globales
├── public/
│   ├── contactless.svg
│   └── chip.png
└── package.json
```

## Funcionalidades

### Página Principal (`/`)
- Formulario para agregar tarjetas
- Preview interactivo de la tarjeta en tiempo real
- Validaciones en tiempo real
- Últimas 3 tarjetas agregadas
- Botón para ver todas las tarjetas

### Lista de Tarjetas (`/cards`)
- Todas las tarjetas en formato grid
- Filtro de búsqueda por nombre del titular
- Paginación (6 tarjetas por página)
- Contador de resultados
- Botón para ver detalles de cada tarjeta

### Detalle de Tarjeta (`/cards/[id]`)
- Preview grande de la tarjeta
- Información completa (enmascarada)
- Fecha de registro
- Botón para eliminar tarjeta
- CVV oculto (muestra ***)

## Validaciones

Todas las validaciones se ejecutan tanto en frontend como backend:

- **Número de tarjeta**: 16 dígitos numéricos
- **Nombre titular**: Solo letras y tildes, máximo 20 caracteres
- **Fecha de vencimiento**: 
  - Formato MM/YY
  - Mes válido: 01-12
  - Año válido: 22 hasta año actual + 5
- **CVV**: 3 o 4 dígitos numéricos

## Conectividad con Backend

### Dependencia del Backend

**⚠️ IMPORTANTE:** El frontend requiere que el backend esté corriendo para funcionar correctamente.

Antes de iniciar el frontend, asegúrate de que:

1. El backend está corriendo en: `http://127.0.0.1:5001`
2. Firebase Emulator UI está disponible en: `http://127.0.0.1:4000`
3. La variable `NEXT_PUBLIC_API_URL` está configurada correctamente

### Iniciar Backend

En una terminal separada:

```bash
cd ../backend/functions
npm run serve
```

Verifica que veas:

```
✔  functions: Emulator started at http://127.0.0.1:5001
✔  Emulator UI running at http://127.0.0.1:4000
```

### Endpoints Consumidos

El frontend consume estos endpoints del backend:

- `GET /cards` - Obtener todas las tarjetas
- `POST /cards` - Crear nueva tarjeta
- `GET /cards/:id` - Obtener una tarjeta
- `DELETE /cards/:id` - Eliminar tarjeta

## Enmascaramiento

Los números de tarjeta se enmascaran automáticamente:
- **Original**: `5375441145400954`
- **Enmascarado**: `53**********0954`

Solo se muestran los primeros 2 y últimos 4 dígitos.

## Manejo de Estado

Se utiliza **React Context API** para:
- Estado global de tarjetas
- Llamadas a la API
- Manejo de loading y errores
- Sincronización entre componentes

## Estilos

Los estilos están en `globals.css` e incluyen:
- Reset CSS básico
- Diseño responsive
- Tarjeta de crédito personalizada (estilo oscuro)
- Animaciones suaves
- Estados de hover y focus

## Scripts Disponibles

```bash
pnpm dev          # Desarrollo (puerto 3000)
pnpm build        # Build de producción
pnpm start        # Servidor de producción
pnpm lint         # Linting
```

## Problemas Comunes

### Error: "Failed to fetch"

**Causa:** El backend no está corriendo o la URL es incorrecta.

**Solución:**
1. Inicia el backend: `cd ../backend/functions && npm run serve`
2. Verifica `.env.local`
3. Reinicia el frontend: `pnpm dev`

### Error: "Network request failed"

**Causa:** CORS o URL incorrecta.

**Solución:**
1. Verifica que el backend tenga CORS habilitado
2. Revisa la URL completa en `.env.local`
3. Asegúrate de incluir el Project ID correcto

**No olvides:**
1. Configurar variables de entorno en tu plataforma
2. Actualizar `NEXT_PUBLIC_API_URL` con la URL de producción de Firebase Functions

EL proyecto utilizado es credit-card-tech-test
