// Consultoría Agrícola Integral — herramienta WebMCP 'ask_site'
//
// Responde preguntas del visitante buscando por palabra clave en el contenido
// propio del sitio (FAQ de cada servicio, entradas del blog y descripciones de
// los 7 servicios), en vez de exigir que el agente haga scraping de la página.
// Es solo recuperación de contenido: devuelve los fragmentos más relevantes y
// su URL de origen; el agente compone la respuesta final.
//
// Construida con @nekuda/webmcp-sdk (js/vendor/webmcp-sdk/, cargado vía import
// map) en vez de tocar document.modelContext directamente.
import { defineTool } from "@nekuda/webmcp-sdk";
import { SITE_CONTENT } from "./site-content.js";

const TIPOS = ["servicio", "blog", "faq"];

// Palabras funcionales muy frecuentes en espa\u00f1ol: se descartan de la consulta
// para que no aporten coincidencias falsas en textos largos (p.ej. "sin" no
// deber\u00eda, por s\u00ed sola, emparejar cualquier fragmento que contenga "sin").
const PALABRAS_VACIAS = new Set([
  "de", "la", "el", "los", "las", "un", "una", "unos", "unas", "que", "para",
  "por", "con", "sin", "en", "es", "y", "o", "a", "al", "del", "se", "su",
  "sus", "mi", "tu", "como", "mas", "pero", "si", "no", "lo", "le", "les",
  "yo", "me", "nos", "les", "esta", "este", "esto", "estos", "estas", "ese",
  "esa", "esos", "esas", "hay", "ha", "he", "han", "muy", "ya", "cual",
  "cuales", "cuando", "donde", "quien", "quienes", "porque",
]);

function normaliza(texto) {
  return (texto || "")
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function puntua(item, palabras) {
  const haystack = normaliza(item.titulo + " " + item.texto);
  let puntos = 0;
  for (const palabra of palabras) {
    if (palabra.length <= 2 || PALABRAS_VACIAS.has(palabra)) continue;
    if (haystack.includes(palabra)) {
      puntos += haystack.startsWith(palabra) || item.titulo && normaliza(item.titulo).includes(palabra) ? 2 : 1;
    }
  }
  return puntos;
}

export const askSite = defineTool({
  stableKey: "content.ask_site",
  name: "ask_site",
  title: "Buscar en el contenido del sitio",
  description:
    "Busca por palabra clave o pregunta en el contenido público de Consultoría " +
    "Agrícola Integral: preguntas frecuentes de cada servicio, entradas del blog " +
    "sobre ayudas y normativa agraria (planes de abonado, PAC, subvenciones, " +
    "sequía, plagas, maquinaria) y descripciones de los 7 servicios. Devuelve los " +
    "fragmentos de texto más relevantes junto con la URL de origen para que el " +
    "agente responda dudas concretas del visitante (plazos, requisitos, " +
    "normativa, en qué consiste un servicio) sin tener que leer la web completa. " +
    "Úsala para preguntas de contenido; para explorar el catálogo completo de " +
    "servicios usa 'cai-buscar-servicios', y para enviar una solicitud de " +
    "presupuesto o contacto usa 'cai-solicitar-presupuesto' en /contacto.html.",
  inputSchema: {
    type: "object",
    properties: {
      consulta: {
        type: "string",
        description:
          "Pregunta o palabra clave en lenguaje natural, por ejemplo " +
          "'¿cuándo es obligatorio el plan de abonado?' o 'ayudas por la DANA'.",
      },
      tipo: {
        type: "string",
        enum: TIPOS,
        description:
          "Limita la búsqueda a un tipo de contenido: 'servicio' (descripciones " +
          "de servicio), 'blog' (entradas del blog) o 'faq' (preguntas " +
          "frecuentes). Si se omite, busca en todos.",
      },
      limite: {
        type: "integer",
        minimum: 1,
        maximum: 10,
        default: 5,
        description: "Número máximo de resultados a devolver (por defecto 5).",
      },
    },
    required: ["consulta"],
    additionalProperties: false,
  },
  annotations: { readOnlyHint: true, untrustedContentHint: false },
  async execute(input) {
    const consulta = (input && input.consulta) || "";
    const tipo = input && input.tipo;
    const limite = Math.min(Math.max((input && input.limite) || 5, 1), 10);

    if (!consulta.trim()) {
      throw new Error("ask_site: 'consulta' no puede estar vacía.");
    }
    if (tipo && !TIPOS.includes(tipo)) {
      throw new Error(`ask_site: 'tipo' debe ser uno de ${TIPOS.join(", ")}.`);
    }

    const palabras = normaliza(consulta).split(/\s+/).filter(Boolean);
    const candidatos = tipo ? SITE_CONTENT.filter((item) => item.tipo === tipo) : SITE_CONTENT;

    const puntuados = candidatos
      .map((item) => ({ item, puntos: puntua(item, palabras) }))
      .filter((entry) => entry.puntos > 0)
      .sort((a, b) => b.puntos - a.puntos)
      .slice(0, limite);

    if (puntuados.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                empresa: "Consultoría Agrícola Integral",
                consulta,
                total_resultados: 0,
                resultados: [],
                nota:
                  "No se ha encontrado contenido del sitio que coincida con esta " +
                  "consulta. Prueba con otras palabras clave, usa " +
                  "'cai-buscar-servicios' para ver el catálogo completo de " +
                  "servicios, o remite al visitante a info@consultoriaagricolaintegral.es.",
              },
              null,
              2
            ),
          },
        ],
      };
    }

    const payload = {
      empresa: "Consultoría Agrícola Integral",
      consulta,
      total_resultados: puntuados.length,
      resultados: puntuados.map(({ item }) => ({
        tipo: item.tipo,
        titulo: item.titulo,
        texto: item.texto,
        url: item.url,
      })),
    };

    return { content: [{ type: "text", text: JSON.stringify(payload, null, 2) }] };
  },
});
