// Consultoría Agrícola Integral — punto de registro WebMCP para 'ask_site'.
//
// Página estática sin bundler: este módulo se carga con <script type="module">
// más un import map que resuelve "@nekuda/webmcp-sdk" al ESM vendorizado en
// js/vendor/webmcp-sdk/index.js. Se registra en cada página que incluya este
// script y se desregistra al abandonar la página.
import { registerTools } from "@nekuda/webmcp-sdk";
import { askSite } from "./ask-site.js";

const registro = registerTools([askSite]);
addEventListener("pagehide", () => registro.unregister(), { once: true });
