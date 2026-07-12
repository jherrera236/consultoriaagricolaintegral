# Consultoría Agrícola Integral — pendientes antes de publicar

Este sitio está terminado a nivel de contenido y código, pero quedan **3 cosas que solo tú puedes cerrar** antes de publicarlo:

## 1. Teléfono de contacto
Aparece como "(por confirmar)" en:
- `index.html` y todas las páginas de servicio (pie de página)
- `contacto.html` (sección de datos de contacto)

Busca el texto `(por confirmar)` y sustitúyelo por tu número real.

## 2. Número de WhatsApp
En `contacto.html`, el botón de WhatsApp apunta a `https://wa.me/34000000000`.
Sustituye `000000000` por tu número real (formato: `34` + número sin espacios ni el `+`).

## 3. Email info@consultoriaagricolaintegral.es
La web usa `info@consultoriaagricolaintegral.es` como email de contacto y como destino del formulario.
Para que funcione de verdad necesitas:
1. Registrar el dominio `consultoriaagricolaintegral.es` (o el que finalmente elijas).
2. Crear la cuenta de correo `info@consultoriaagricolaintegral.es` con tu proveedor de hosting/dominio.
3. La primera vez que alguien envíe el formulario de contacto, el servicio **FormSubmit** (gratuito, sin registro) enviará un email de confirmación a esa dirección — solo hay que confirmarlo una vez y ya queda activo.

Si prefieres no depender de FormSubmit, la alternativa más sencilla es alojar la web en **Netlify** y activar "Netlify Forms" (gratis, sin tocar el HTML).

## Sobre el nombre de dominio
El sitio está preparado para `consultoriaagricolaintegral.es`. Si finalmente registras otro dominio, solo hay que
cambiar las URLs `https://www.consultoriaagricolaintegral.es/...` en:
- las etiquetas `<link rel="canonical">` de cada página
- `sitemap.xml`
- `robots.txt`

## Cómo publicar la web
Es una web estática (HTML + CSS + JS), sin base de datos. Puedes subirla tal cual a cualquier hosting
(Netlify, Vercel, hosting tradicional con cPanel, etc.) simplemente copiando todos los archivos de esta
carpeta a la raíz del hosting.

## Estructura de archivos
```
index.html                                  Inicio
servicios.html                              Resumen de servicios
servicio-tramites-parcelarios.html          Servicio 1
servicio-asesoramiento-agronomico.html      Servicio 2
servicio-construccion-rural.html            Servicio 3
servicio-eficiencia-hidrica-energetica.html Servicio 4
herramientas-ia.html                        Calculadoras interactivas
sobre-nosotros.html                         Sobre la empresa
contacto.html                               Formulario + datos de contacto
css/style.css                               Estilos
js/main.js                                  Menú móvil
js/calculadoras.js                          Lógica de las 3 calculadoras
sitemap.xml, robots.txt                     SEO técnico
```

## Próximos pasos sugeridos (cuando quieras)
- Fotos reales de tus proyectos/parcelas (las cards actuales usan iconos, no fotos de stock).
- Un blog o sección de "casos" para seguir posicionando en Google con contenido nuevo.
- Alta en Google Business Profile (no es una red social; es ficha de negocio en Google, muy recomendable para SEO local).
