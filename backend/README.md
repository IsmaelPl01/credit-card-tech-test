# Backend - API de Gestión de Tarjetas

Backend desarrollado con Firebase Functions y Firestore para la gestión de tarjetas de crédito.

## Tecnologías

- **Node.js 18** - Runtime de JavaScript
- **TypeScript** - Tipado estático
- **Firebase Functions** - Funciones serverless
- **Cloud Firestore** - Base de datos NoSQL
- **CORS** - Habilitado para peticiones cross-origin

## Estructura del Proyecto

```
backend/
├── functions/
│   ├── src/
│   │   ├── index.ts                 # Punto de entrada y rutas
│   │   ├── controllers/
│   │   │   └── cardController.ts    # Lógica de controladores
│   │   ├── services/
│   │   │   └── cardService.ts       # Lógica de negocio
│   │   ├── validators/
│   │   │   └── cardValidator.ts     # Validaciones
│   │   └── utils/
│   │       └── maskCard.ts          # Enmascaramiento
│   ├── package.json                 # Dependencias
│   └── tsconfig.json                # Config TypeScript
├── firebase.json                    # Config Firebase
├── .firebaserc                      # Proyecto ID
├── firestore.rules                  # Reglas Firestore
└── README.md                        # Este archivo
```

## Requisitos Previos

- Node.js 18 o superior
- Firebase CLI instalado globalmente
- Cuenta de Firebase

## Instalación

### 1. Instalar Firebase CLI

```bash
npm install -g firebase-tools
```

### 2. Login en Firebase

```bash
firebase login
```

### 3. Crear proyecto en Firebase Console

1. Ve a https://console.firebase.google.com/
2. Crea un nuevo proyecto
3. Activa Cloud Firestore
4. Copia el Project ID

### 4. Configurar proyecto

Edita `.firebaserc` y reemplaza `your-project-id`:

```json
{
  "projects": {
    "default": "TU-PROJECT-ID-AQUI"
  }
}
```

### 5. Instalar dependencias

```bash
cd functions
npm install
```

## Ejecución en Desarrollo

### Emuladores (Puerto 5001 para Functions, 4000 para UI)

```bash
cd functions
npm run serve
```

Esto iniciará:
- **Functions API**: `http://127.0.0.1:5001/TU-PROJECT-ID/us-central1/cards`
- **Emulator UI**: `http://127.0.0.1:4000`
- **Firestore Emulator**: Puerto automático (generalmente 8080)

### Verificar que funciona

Deberías ver en la terminal:

```
✔  functions[us-central1-cards]: http function initialized (http://127.0.0.1:5001/...)
┌─────────────────────────────────────────────────────────────┐
│ ✔  All emulators ready! It is now safe to connect your app. │
│ i  View Emulator UI at http://127.0.0.1:4000/               │
└─────────────────────────────────────────────────────────────┘
```

### Compilar TypeScript manualmente

```bash
npm run build
```

## Endpoints de la API

Base URL Local: `http://127.0.0.1:5001/TU-PROJECT-ID/us-central1/cards`

### POST /cards
Crear una nueva tarjeta

**Request Body:**
```json
{
  "cardNumber": "5375441145400954",
  "cardholderName": "DONALD FLINCH CORTEZ",
  "expiryDate": "06/24",
  "cvv": "123"
}
```

**Response 201:**
```json
{
  "message": "Tarjeta creada exitosamente",
  "data": {
    "id": "abc123xyz",
    "cardNumber": "53**********0954",
    "cardholderName": "DONALD FLINCH CORTEZ",
    "expiryDate": "06/24",
    "cvv": "123",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

**Response 400 (Validación fallida):**
```json
{
  "error": "Validación fallida",
  "details": {
    "cardNumber": "El número de tarjeta debe tener 16 dígitos",
    "expiryDate": "Formato inválido (MM/YY)"
  }
}
```

### GET /cards
Obtener todas las tarjetas

**Response 200:**
```json
{
  "message": "Tarjetas obtenidas exitosamente",
  "data": [
    {
      "id": "abc123",
      "cardNumber": "53**********0954",
      "cardholderName": "DONALD FLINCH CORTEZ",
      "expiryDate": "06/24",
      "cvv": "123",
      "createdAt": "...",
      "updatedAt": "..."
    }
  ],
  "count": 1
}
```

### GET /cards/:id
Obtener una tarjeta por ID

**Response 200:**
```json
{
  "message": "Tarjeta obtenida exitosamente",
  "data": {
    "id": "abc123",
    "cardNumber": "53**********0954",
    ...
  }
}
```

**Response 404:**
```json
{
  "error": "Tarjeta no encontrada",
  "message": "No se encontró una tarjeta con el ID: abc123"
}
```

### PUT /cards/:id
Actualizar una tarjeta

**Request Body:** Igual que POST

**Response 200:**
```json
{
  "message": "Tarjeta actualizada exitosamente",
  "data": { ... }
}
```

**Response 404:**
```json
{
  "error": "Tarjeta no encontrada",
  "message": "No se encontró una tarjeta con el ID: abc123"
}
```

### DELETE /cards/:id
Eliminar una tarjeta

**Response 200:**
```json
{
  "message": "Tarjeta eliminada exitosamente",
  "data": {
    "id": "abc123",
    "deleted": true
  }
}
```

**Response 404:**
```json
{
  "error": "Tarjeta no encontrada",
  "message": "No se encontró una tarjeta con el ID: abc123"
}
```

## Validaciones Backend

Todos los campos son requeridos:

- **cardNumber**: 
  - Exactamente 16 dígitos
  - Solo números
  
- **cardholderName**: 
  - Solo letras y tildes (á, é, í, ó, ú, ñ, ü)
  - Máximo 20 caracteres
  
- **expiryDate**: 
  - Formato MM/YY
  - Mes válido: 01-12
  - Año válido: desde 22 hasta año actual + 5
  
- **cvv**: 
  - 3 o 4 dígitos numéricos

## Códigos HTTP

- **200** - Éxito (GET, PUT, DELETE)
- **201** - Creación exitosa (POST)
- **400** - Error de validación
- **404** - Recurso no encontrado
- **500** - Error interno del servidor

## Enmascaramiento Automático

El número de tarjeta se enmascara en todas las respuestas:
- **Original**: `5375441145400954`
- **Enmascarado**: `53**********0954`

Se muestran solo los primeros 2 y últimos 4 dígitos.

El número completo se almacena en Firestore pero nunca se devuelve en las respuestas de la API.

## Seguridad

- ✅ CORS habilitado para todas las peticiones
- ✅ Sin autenticación (según requerimientos de prueba)
- ✅ Validaciones exhaustivas en backend
- ✅ Enmascaramiento automático de números de tarjeta
- ⚠️ **Nota**: En producción, se recomienda agregar autenticación

## Deploy a Producción

### 1. Compilar

```bash
npm run build
```

### 2. Deploy

```bash
firebase deploy --only functions,firestore
```

### 3. Obtener URL de producción

Después del deploy verás:

```
✔  Deploy complete!

Function URL (cards): https://us-central1-TU-PROJECT-ID.cloudfunctions.net/cards
```

Usa esta URL en el frontend para producción.

## Logs y Debugging

### Ver logs en tiempo real

```bash
firebase functions:log
```

### Ver logs en Firebase Console

1. Ve a https://console.firebase.google.com/
2. Selecciona tu proyecto
3. Ve a Functions > Logs

### Logs locales

Los logs del emulador se guardan en:
- `functions/firebase-debug.log`
- `functions/ui-debug.log`

## Testing con cURL

### Crear tarjeta

```bash
curl -X POST http://127.0.0.1:5001/TU-PROJECT-ID/us-central1/cards \
  -H "Content-Type: application/json" \
  -d '{
    "cardNumber": "5375441145400954",
    "cardholderName": "DONALD FLINCH CORTEZ",
    "expiryDate": "06/24",
    "cvv": "123"
  }'
```

### Listar tarjetas

```bash
curl http://127.0.0.1:5001/TU-PROJECT-ID/us-central1/cards
```

### Obtener una tarjeta

```bash
curl http://127.0.0.1:5001/TU-PROJECT-ID/us-central1/cards/abc123
```

### Eliminar tarjeta

```bash
curl -X DELETE http://127.0.0.1:5001/TU-PROJECT-ID/us-central1/cards/abc123
```

## Problemas Comunes

### Error: "Functions codebase could not be analyzed"

**Causa:** Error de compilación de TypeScript.

**Solución:**
```bash
cd functions
npm install
npm run build
npm run serve
```

### Error: "Default firebase app does not exist"

**Causa:** Firebase Admin no está inicializado correctamente.

**Solución:** Ya está resuelto en `src/index.ts` con `admin.initializeApp()`.

### Puerto 5001 ocupado

**Solución:**
```bash
lsof -ti:5001 | xargs kill
```

O cambia el puerto en `firebase.json`:

```json
{
  "emulators": {
    "functions": {
      "port": 5002
    }
  }
}
```

### No se crean tarjetas en Firestore

**Causa:** Reglas de Firestore muy restrictivas.

**Solución:** Verifica `firestore.rules`:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /cards/{cardId} {
      allow read, write: if true;
    }
  }
}
```

## Scripts Disponibles

```bash
npm run build    # Compilar TypeScript
npm run serve    # Ejecutar emuladores
npm run shell    # Shell interactivo
npm run deploy   # Deploy a producción
npm run logs     # Ver logs
```

## Arquitectura

### Flujo de Petición

```
Cliente → CORS → Router (index.ts) → Controller → Service → Firestore
                                          ↓
                                     Validator
                                          ↓
                                   Mask Utility
```

### Capas

1. **index.ts**: Routing y CORS
2. **Controllers**: Manejo de peticiones HTTP
3. **Services**: Lógica de negocio y acceso a Firestore
4. **Validators**: Validaciones de datos
5. **Utils**: Funciones auxiliares (enmascaramiento)

## Variables de Entorno

No se requieren variables de entorno adicionales. Firebase Admin SDK se inicializa automáticamente en Cloud Functions.

## Próximas Mejoras

- [ ] Autenticación con Firebase Auth
- [ ] Rate limiting
- [ ] Encriptación de números de tarjeta
- [ ] Logs estructurados
- [ ] Tests unitarios y de integración
- [ ] Documentación OpenAPI/Swagger

## Contacto

Para soporte o preguntas sobre el backend, consulta la documentación principal del proyecto.