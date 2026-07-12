# Cómo publicar Consultoría Agrícola Integral al mínimo coste

Guía paso a paso, pensada para alguien sin experiencia previa en despliegue web.

## 1. Comparativa de opciones (2026)

| Opción | Qué incluye | Coste aproximado | A quién le conviene |
|---|---|---|---|
| **A. Gratis salvo el dominio** (recomendada) | Hosting gratis (Cloudflare Pages) + dominio .es de pago + email gratis (Zoho Mail) | **~10-15 €/año** (solo el dominio) | A quien no le importe configurar 3 servicios distintos una vez, y quiera el coste mínimo real |
| **B. Hosting español todo-en-uno** | Dominio + hosting + email, todo en un mismo panel (cPanel), con proveedores como Dinahosting, Hostalia o Raiola Networks | **~40-70 €/año** | A quien prefiera gestionarlo todo desde un único sitio y tener soporte telefónico en español |
| **C. Netlify/Vercel + Zoho** | Muy similar a la opción A, cambiando Cloudflare Pages por Netlify o Vercel (ambos gratis para sitios estáticos) | **~10-15 €/año** | Alternativa a A si prefieres esas plataformas; el resultado práctico es el mismo |

Con la web que hemos construido (HTML/CSS/JS puro, sin base de datos), cualquiera de las tres opciones funciona sin cambios en el código.

**Recomendación**: la opción A es la más barata y perfectamente viable para una web profesional de este tipo. La única "incomodidad" es que el correo Zoho gratuito solo se consulta desde su web o app (no desde Outlook/Apple Mail, salvo que pases al plan de pago, ~1 $/usuario/mes).

---

## 2. Pasos de la Opción A (coste mínimo): Cloudflare Pages + dominio .es + Zoho Mail

### Paso 1 — Registrar el dominio
1. Entra en un registrador acreditado para dominios `.es`: por ejemplo **Dondominio** o **Dinahosting** (ambos en español, con soporte y precios claros).
2. Busca `consultoriaagricolaintegral.es` (o el nombre final que elijas) y compruébalo disponible.
3. Regístralo por 1 año (~10-15 €). No aceptes extras como hosting o email en este paso: los harás gratis en los pasos siguientes.
4. Guarda las credenciales de acceso al panel del registrador: las necesitarás para apuntar el dominio a Cloudflare.

### Paso 2 — Crear cuenta gratuita en Cloudflare y añadir el dominio
1. Crea una cuenta en [cloudflare.com](https://www.cloudflare.com) (gratis).
2. Añade tu dominio `consultoriaagricolaintegral.es` como "sitio nuevo".
3. Cloudflare te dará **2 servidores DNS** (algo como `ana.ns.cloudflare.com`).
4. Vuelve al panel de tu registrador (Dondominio/Dinahosting) y cambia los servidores DNS del dominio por los que te ha dado Cloudflare.
5. Espera unas horas (a veces hasta 24h) a que el cambio se propague. Cloudflare te avisa por email cuando el dominio queda "activo".

### Paso 3 — Subir la web a Cloudflare Pages
Hay dos formas, de más a menos técnica:

**Opción sencilla (arrastrar y soltar), sin necesidad de saber programación:**
1. En el panel de Cloudflare, ve a **Workers & Pages → Create → Pages → Upload assets**.
2. Arrastra ahí la carpeta completa con todos los archivos de la web (`index.html`, `css/`, `js/`, etc.).
3. Cloudflare le asigna un subdominio del tipo `consultoriaagricolaintegral.pages.dev` para probar que todo funciona.
4. En la configuración del proyecto, ve a **Custom domains** y añade `consultoriaagricolaintegral.es` (y `www.consultoriaagricolaintegral.es`). Cloudflare configura el certificado HTTPS automáticamente, sin coste.

**Opción algo más avanzada (recomendable a futuro, no imprescindible ahora):** conectar un repositorio de GitHub con la web, para que cada actualización se publique sola. Se puede migrar a esto más adelante sin perder nada de lo ya hecho.

### Paso 4 — Configurar el correo info@consultoriaagricolaintegral.es (Zoho Mail gratis)
1. Crea una cuenta en [zoho.com/mail](https://www.zoho.com/mail/) con el plan **Forever Free**.
2. Zoho te pedirá verificar que el dominio es tuyo (añadiendo un registro TXT en el DNS). Como el DNS ya lo gestiona Cloudflare, este paso se hace desde el panel de Cloudflare, sección DNS.
3. Zoho te dará también registros **MX** para recibir correo: se añaden igualmente en el DNS de Cloudflare.
4. Crea el usuario `info@consultoriaagricolaintegral.es` desde el panel de Zoho.
5. A partir de ahí, consultas el correo desde `mail.zoho.com` o la app móvil de Zoho Mail (gratis).

### Paso 5 — Activar el formulario de contacto
El formulario ya está configurado con **FormSubmit** (gratis, sin necesidad de servidor propio). En cuanto publiques la web y alguien envíe el formulario por primera vez, FormSubmit mandará un correo de confirmación a `info@consultoriaagricolaintegral.es`: solo hay que confirmarlo una vez y queda activo para siempre.

### Paso 6 — Últimos ajustes antes de dar la web por "lista"
- Sustituir en el código el teléfono real y el número de WhatsApp (marcados como pendientes en `LEEME-pendientes.md`).
- Verificar que `https://www.consultoriaagricolaintegral.es` carga con el candado de seguridad (HTTPS) correctamente.
- Comprobar el formulario de contacto enviando un mensaje de prueba.
- Dar de alta el negocio en **Google Business Profile** (gratis, no es una red social; es la ficha que aparece en Google Maps y en las búsquedas locales). Muy recomendable para el SEO local en "ingeniería agrícola Valencia".

---

## 3. Coste total resumen (Opción A)

- Dominio `.es`: ~10-15 €/año
- Hosting web (Cloudflare Pages): 0 €
- Email profesional (Zoho Mail Free): 0 €
- Formulario de contacto (FormSubmit): 0 €
- Certificado HTTPS: 0 € (incluido por Cloudflare)

**Total: solo el precio del dominio, una vez al año.**

---

## 4. Si en el futuro quieres pasar a la Opción B (todo en un panel)

No hay ningún problema en empezar con la Opción A y cambiar después a un hosting con panel (Dinahosting, Hostalia, etc.) si algún día prefieres tenerlo todo centralizado: al ser una web estática, basta con volver a subir los mismos archivos al nuevo hosting y redirigir el dominio.
