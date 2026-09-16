# Registro de entrenamiento (PWA)

App de una sola página para apuntar series, peso y repeticiones de una rutina de 5 días
(3 de tren superior, 2 de tren inferior) y ver el progreso por ejercicio. Funciona sin conexión
y se instala en el iPhone como una app más. Los datos viven en el teléfono (`localStorage`);
la copia de seguridad es el JSON que exporta la pestaña Historial.

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | Toda la app: estilos, rutina, dibujos de los ejercicios y lógica. |
| `manifest.webmanifest` | Nombre, ícono y colores con los que se instala. |
| `sw.js` | Service worker: guarda la app en caché para abrirla sin internet. |
| `icon-*.png` | Íconos (180 para iOS, 192/512 para Android/Chrome, maskable). |

## Cómo funciona el registro

- Un entrenamiento se identifica por **fecha + día de rutina**. Si guardas el Día 1 de hoy y
  vuelves a abrir la app hoy, lo ves cargado tal cual; al volver a guardar se **actualiza**,
  no se duplica.
- Al abrir la app otro día, propone el siguiente día de la rutina en blanco. Si dejaste algo
  sin guardar, lo respeta.
- Desde **Historial** puedes **Editar** (lo carga en Entrenar) o **Borrar** cualquier entrenamiento.
- Cambiar la fecha o el día de rutina carga lo que ya exista guardado para esa combinación.

## Publicar (GitHub Pages)

1. Crea un repositorio y sube estos archivos a la raíz (o a `docs/`).
2. Settings → Pages → *Deploy from a branch* → rama `main`, carpeta `/ (root)`.
3. La URL queda como `https://<usuario>.github.io/<repo>/`.

Cada vez que publiques cambios, **sube el número de `CACHE` en `sw.js`** (`entreno-v2`, `v3`, …)
para que los teléfonos descarguen la versión nueva. La actualización se aplica en el siguiente
arranque de la app.

Alternativas sin Git: arrastrar la carpeta a [Netlify Drop](https://app.netlify.com/drop) o a Cloudflare Pages.

## Instalar en el iPhone

1. Abre la URL en **Safari** (no en Chrome ni desde un enlace dentro de otra app).
2. Botón **Compartir** → **Añadir a pantalla de inicio**.
3. Abre la app desde el ícono. La primera apertura necesita internet; después funciona sin conexión.

Las web apps instaladas en la pantalla de inicio no están sujetas al borrado de datos a los
7 días que Safari aplica a los sitios normales. Aun así, exporta la copia `.json` de vez en cuando.

## Probar en local

```bash
python -m http.server 8765
```

y abrir <http://localhost:8765/>. El service worker solo se registra sobre `http(s)`, no al abrir el archivo directamente.
