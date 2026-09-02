// Consultoría Agrícola Integral — punto de registro WebMCP para 'ask_site'.
//
// Página estática sin bundler: este módulo se carga con <script type="module">
// más un import map que resuelve "@nekuda/webmcp-sdk" al ESM vendorizado en
// js/vendor/webmcp-sdk/index.js. Se registra en cada página que incluya este
// script y se desregistra al abandonar la página.
//
// telemetry: false — el SDK envía por defecto métricas anónimas de uso (sin
// texto de las consultas, ver js/vendor/webmcp-sdk/README.md) a un servicio
// de terceros (ingest.agentlane.com) del fabricante del SDK. Como esta web
// no tiene cuenta en ese servicio y promete no compartir datos con terceros,
// se desactiva explícitamente.
import { registerTools } from "@nekuda/webmcp-sdk";
import { askSite } from "./ask-site.js";

const registro = registerTools([askSite], { telemetry: false });
addEventListener("pagehide", () => registro.unregister(), { once: true });
