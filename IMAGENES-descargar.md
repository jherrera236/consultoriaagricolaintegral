# Imágenes pendientes de descargar (fotografías de stock gratuitas)

Las ilustraciones (planos, plantas, naves, riego/solar) ya están hechas y colocadas — no hace falta tocarlas.
Solo quedan **2 fotografías genéricas** de bancos gratuitos que yo no puedo descargar automáticamente
(el entorno donde trabajo no tiene acceso a Unsplash/Pexels), así que aquí tienes exactamente qué buscar,
cómo elegirla bien, y dónde colocarla.

## Foto 1 — Portada de inicio: campo valenciano / cítricos
- **Dónde va**: justo debajo de la cabecera de `index.html`
- **Nombre de archivo**: guarda la foto como `img/foto-campo-valencia.jpg`
- **Qué buscar**: un campo de cítricos, huerta valenciana o regadío, en formato horizontal (apaisado), luz natural, sin personas reconocibles en primer plano
- **Dónde buscarla**:
  - [Pexels — "orange grove"](https://www.pexels.com/search/orange%20grove/)
  - [Unsplash — "campo de naranjos"](https://unsplash.com/es/s/fotos/campo-de-naranjos)
  - [Unsplash — "irrigation"](https://unsplash.com/s/photos/irrigation)

## Foto 2 — Página "Sobre nosotros": ingeniería/campo
- **Dónde va**: debajo de la cabecera de `sobre-nosotros.html`
- **Nombre de archivo**: guarda la foto como `img/foto-ingenieria-campo.jpg`
- **Qué buscar**: alguien revisando planos o un dispositivo en el campo, maquinaria agrícola moderna, o una imagen de riego tecnificado — evita fotos con marcas de agua o con personas identificables si no son tuyas
- **Dónde buscarla**:
  - [Unsplash — "solar farm"](https://unsplash.com/s/photos/solar-farm)
  - [Unsplash — "drip irrigation"](https://unsplash.com/s/photos/drip-irrigation)
  - [Pexels — "crops"](https://www.pexels.com/search/crops/)

## Cómo descargar y colocarlas (3 pasos)
1. Entra en el enlace, elige la foto que más te guste y pulsa "Descargar" (en Unsplash y Pexels es gratis, sin registro obligatorio).
2. Renombra el archivo descargado exactamente como se indica arriba (`foto-campo-valencia.jpg` o `foto-ingenieria-campo.jpg`) y muévelo a la carpeta `img/` de la web.
3. Abre `index.html` (o `sobre-nosotros.html`) con un editor de texto simple, busca el bloque comentado que empieza por `<!-- Cuando descargues la foto...` y sigue la instrucción: sustituye el `<div class="foto-banda pendiente">...</div>` por el código de ejemplo que aparece justo encima, en el comentario.

## Sobre la licencia
Tanto Unsplash como Pexels permiten uso comercial gratuito sin necesidad de atribución, pero es buena práctica
citar al fotógrafo (ya hay un hueco preparado para ello: `<span class="credito">Foto: ...</span>`) — dentro de
cada foto en Unsplash/Pexels aparece el nombre del autor para copiarlo ahí.
