# Tasador de Vehículos — PWA v2

App web progresiva para tasar vehículos usados consultando MercadoLibre Argentina
con cotización del dólar blue en tiempo real.

Esta versión usa **Netlify Functions** como proxy para evitar el bloqueo CORS
del navegador al consultar APIs externas.

## Estructura de archivos

```
tasador-v2/
├── index.html                    ← La app
├── manifest.json                 ← Config PWA
├── sw.js                         ← Service Worker
├── netlify.toml                  ← Config de Netlify
├── package.json                  ← Dependencias del proxy
├── netlify/
│   └── functions/
│       ├── ml.js                 ← Proxy → MercadoLibre
│       └── dolar.js              ← Proxy → DolarAPI
└── icons/
    ├── icon-192.png
    └── icon-512.png
```

---

## Cómo subir a Netlify (IMPORTANTE: usar GitHub esta vez)

El drag & drop no instala las dependencias del proxy.
Necesitás conectar con GitHub para que Netlify las instale automáticamente.

### Paso 1 — Subir a GitHub

1. Entrá a https://github.com y creá una cuenta (si no tenés)
2. Hacé clic en **"New repository"**
3. Nombre: `tasador-vehiculos` · Privado o público, da igual
4. Creá el repo
5. Subí todos los archivos de esta carpeta al repo
   - Podés usar la opción "uploading an existing file" en GitHub directamente
   - O usar GitHub Desktop (más fácil): https://desktop.github.com

### Paso 2 — Conectar con Netlify

1. Entrá a https://netlify.com
2. **"Add new site"** → **"Import an existing project"**
3. Elegí **GitHub** → autorizá → seleccioná el repo `tasador-vehiculos`
4. Configuración de build:
   - Build command: `npm install`
   - Publish directory: `.` (un punto solo)
5. Hacé clic en **"Deploy site"**

### Paso 3 — Listo

Netlify te da un link. Compartilo con tus vendedores.
Podés cambiar el nombre del sitio en Site Settings → General → Site name.

---

## Instalar en el celular

### Android (Chrome)
1. Abrí el link en Chrome
2. Menú (⋮) → "Instalar aplicación" o el banner que aparece

### iPhone (Safari)
1. Abrí el link en Safari
2. Botón compartir (□↑) → "Agregar a pantalla de inicio"

---

## Funcionalidades

- Búsqueda: Marca, Modelo, Versión, Año, Km (rango), Transmisión, Tracción
- Solo vehículos usados · Exclusión automática de anticipos/señas
- Precio promedio en ARS y USD con conversión cruzada al dólar blue
- Valor de permuta (promedio − 20%)
- Distribución de precios con frecuencias
- Dólar blue en tiempo real: compra / venta / referencia (mitad)
