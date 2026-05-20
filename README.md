# 🍰 Los Dulces de Rosa - Portafolio y Cotizador Dinámico

Este repositorio contiene el código de la web de portafolio y cotizador dinámico de **"Los Dulces de Rosa"**, un emprendimiento premium de repostería. La aplicación está optimizada al 100% para dispositivos móviles y cuenta con una arquitectura diseñada para ser veloz y fácil de autogestionar por la repostera, eliminando cualquier tipo de tecnicismo en inglés o complejidad de programación.

---

## 🚀 Arquitectura y Tecnologías
1. **Framework Principal**: [Astro 6](https://astro.build/) - Renderizado híbrido ultra-rápido. Las páginas de cara al público se compilan de manera estática para máxima velocidad de carga.
2. **CMS Local**: [Keystatic CMS](https://keystatic.com/) con integración de React (`@astrojs/react`). Corre bajo un adaptador de Node (`@astrojs/node`) en modo standalone únicamente en las rutas `/keystatic` y sus endpoints administrativos.
3. **Estilo Visual**: Vanilla CSS con una paleta rosa pastel premium y estética cuidada.
4. **Logo de Marca**: Logo circular recortado profesionalmente con transparencia nativa (`public/images/logo.png`).
5. **Conexión Externa**: Enlace directo a WhatsApp mediante la API de `wa.me`, formateando dinámicamente pedidos fijos y presupuestos del cotizador.

---

## 🎨 Funcionalidades Clave

### 1. Cotizador Dinámico de Tortas
Permite a los clientes elegir una torta personalizada seleccionando paso a paso:
* **Tamaño / Porciones** (Chica, Mediana, Grande) con precios base.
* **Rellenos Premium** (Dulce de Leche, Crema, Frutillas, Nutella, etc.) con cálculo de coste adicional.
* **Estilo de Diseño** (Estándar, Especial con Macarons/Flores, Modelado Temático).
El sistema calcula en tiempo real el total estimado y genera un mensaje estructurado y listo para enviar por WhatsApp para cerrar la venta con la repostera.

### 2. Control de Días de Anticipación Mínima
Cada producto del catálogo cuenta con una regla de anticipación mínima. El calendario de entrega del cotizador calcula dinámicamente el primer día disponible en base a esta anticipación, impidiendo reservas fuera de término de manera automática.

---

## 📊 Estrategia de Autogestión (Doble Canal)

El proyecto ofrece dos alternativas de edición independientes y complementarias para que la repostera pueda gestionar su negocio sin depender de programadores:

### Opción A: Sincronización Dinámica con Google Sheets (Client-Side)
Ideal para cambiar precios rápidos, alterar descripciones o ajustar días de anticipación de forma inmediata desde el celular.
* **Cómo funciona**: Al cargar la página web, el navegador del cliente descarga el catálogo publicado como CSV desde Google Sheets y reemplaza en caliente la información de la web y el cotizador.
* **Ubicación en el código**: En `src/pages/index.astro`, configurá la constante:
  ```javascript
  const GOOGLE_SHEET_ID = "TU_ID_DE_GOOGLE_SHEET";
  ```
* **Columnas de la Hoja de Cálculo**: Para que la sincronización funcione correctamente, la hoja debe estar publicada en la web como CSV (`Archivo > Compartir > Publicar en la web > Formato CSV`) y contener las siguientes columnas (exactas y en español):
  | `id` | `precio` | `diasAnticipacion` | `aptoCelicos` | `descripcion` |
  | :--- | :--- | :--- | :--- | :--- |
  | `lemon-pie` | `15000` | `2` | `false` | `Masa crocante con abundante merengue...` |

### Opción B: Panel de Administración Keystatic CMS
Ideal para tareas avanzadas como subir nuevas imágenes de productos, agregar categorías completas o cambiar los nombres de los rellenos de forma visual.
* **Acceso**: `http://localhost:4321/keystatic` en desarrollo local.
* **Esquema de Configuración**: Definido completamente en español en `keystatic.config.ts`.
* **Guardado de Datos**: Los cambios hechos en Keystatic se guardan localmente en formato JSON en `src/data/products.json`, lo que permite un control total y versionable del catálogo.

---

## 📁 Estructura del Catálogo (`products.json`)
La base de datos del catálogo se localiza en `src/data/products.json` bajo la llave `"products"`. Cada objeto cuenta con los siguientes campos en español:

```json
{
  "products": [
    {
      "id": "lemon-pie",
      "nombre": "Lemon Pie Clásico",
      "descripcion": "Base de masa crocante, crema de limón suave...",
      "categoria": "tortas",
      "precio": 14000,
      "tipoPrecio": "fijo", // "fijo", "dinamico" o "cotizar"
      "imagen": "/images/lemon-pie.png",
      "aptoCelicos": false,
      "diasAnticipacion": 2,
      "personalizable": false
    },
    {
      "id": "torta-personalizada",
      "nombre": "Torta Personalizada",
      "descripcion": "Armá la torta de tus sueños...",
      "categoria": "tortas",
      "precio": 18000,
      "tipoPrecio": "dinamico",
      "imagen": "/images/torta-personalizada.png",
      "aptoCelicos": false,
      "diasAnticipacion": 4,
      "personalizable": true,
      "tamanos": [
        {"nombre": "Chica (10-12 porciones)", "precio": 18000}
      ],
      "rellenos": [
        {"nombre": "Nutella premium", "precio": 2500}
      ],
      "disenos": [
        {"nombre": "Diseño Temático", "precio": 6000}
      ]
    }
  ]
}
```

---

## 🛠️ Comandos de Desarrollo y Producción

### Instalar dependencias
```bash
npm install
```

### Iniciar servidor de desarrollo
Inicia el entorno de desarrollo y habilita el panel de Keystatic en `/keystatic`:
```bash
npm run dev
```

### Compilar para producción
Genera el compilado óptimo de la aplicación listo para producción dentro de `./dist/`:
```bash
npm run build
```

---

## 📌 Guía para Continuar el Desarrollo en otra Sesión
Si vas a retomar el desarrollo en otra conversación con una IA o con otro desarrollador, podés pedirle que:
1. Revise `keystatic.config.ts` para agregar nuevos campos globales o colecciones de decoración.
2. Añada nuevas categorías en el filtro de pestañas de `src/pages/index.astro`.
3. Configure un servicio de hosting Serverless o VPS que admita el adaptador de Astro Node para correr Keystatic en producción si no se desea usar Google Sheets en cliente.
