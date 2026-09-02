// Consultoría Agrícola Integral — herramientas WebMCP
//
// Expone el catálogo de servicios como una herramienta que un agente de IA
// (Claude en Chrome, ChatGPT Atlas, Comet, etc.) puede invocar directamente
// mientras navega esta web, siguiendo el borrador de especificación WebMCP
// del W3C Web Machine Learning Community Group (2025-2026):
// https://github.com/webmachinelearning/webmcp
//
// Si el navegador del visitante no soporta esta API todavía (la mayoría, a
// día de hoy), este script no hace nada: no rompe ni modifica el
// comportamiento normal de la web para personas.
(function () {
  "use strict";

  var mc =
    (typeof document !== "undefined" && document.modelContext) ||
    (typeof navigator !== "undefined" && navigator.modelContext);

  if (!mc || typeof mc.registerTool !== "function") {
    return;
  }

  var BASE = "https://www.consultoriaagricolaintegral.es/";

  var SERVICIOS = [
    {
      nombre: "Trámites y gestión de parcelas",
      url: BASE + "servicio-tramites-parcelarios.html",
      descripcion:
        "Segregaciones y agrupaciones parcelarias, deslindes, legalización de edificaciones y explotaciones, tramitación de ayudas agrarias y PAC.",
      palabrasClave: [
        "segregacion", "segregar", "agrupacion parcelaria", "deslinde",
        "legalizar", "legalizacion", "catastro", "sigpac", "pac", "parcela"
      ]
    },
    {
      nombre: "Asesoramiento agronómico",
      url: BASE + "servicio-asesoramiento-agronomico.html",
      descripcion:
        "Planes de abonado ajustados a análisis de suelo, planificación de cultivos, seguimiento fitosanitario y recomendaciones de manejo.",
      palabrasClave: [
        "plan de abonado", "fertilizacion", "analisis de suelo", "cultivo",
        "fitosanitario", "plagas", "riego", "manejo agronomico", "cuaderno de explotacion"
      ]
    },
    {
      nombre: "Construcción rural",
      url: BASE + "servicio-construccion-rural.html",
      descripcion:
        "Proyecto y dirección de obra de naves agrícolas, almacenes, balsas de riego e instalaciones ganaderas.",
      palabrasClave: [
        "nave agricola", "almacen", "balsa de riego", "instalacion ganadera",
        "proyecto de obra", "direccion de obra", "construccion", "edificacion rural"
      ]
    },
    {
      nombre: "Eficiencia energética e hídrica",
      url: BASE + "servicio-eficiencia-hidrica-energetica.html",
      descripcion:
        "Auditorías de consumo de agua y energía, riego de precisión, telecontrol y proyectos de autoconsumo solar para bombeo y frío.",
      palabrasClave: [
        "placas solares", "autoconsumo", "eficiencia energetica", "ahorro de agua",
        "riego de precision", "telecontrol", "bombeo", "auditoria energetica"
      ]
    },
    {
      nombre: "Medio ambiente",
      url: BASE + "servicio-medio-ambiente.html",
      descripcion:
        "Estudios de impacto ambiental e integración paisajística, y cálculo de huella de carbono de la explotación.",
      palabrasClave: [
        "impacto ambiental", "eia", "estudio ambiental", "integracion paisajistica",
        "huella de carbono", "medio ambiente"
      ]
    },
    {
      nombre: "Formación para entidades",
      url: BASE + "servicio-formacion.html",
      descripcion:
        "Cursos y jornadas técnicas a medida para cooperativas, comunidades de regantes, ayuntamientos y empresas del sector.",
      palabrasClave: [
        "curso", "formacion", "jornada tecnica", "cooperativa",
        "comunidad de regantes", "ayuntamiento", "capacitacion"
      ]
    },
    {
      nombre: "Ayudas y subvenciones GVA",
      url: BASE + "servicio-ayudas-gva.html",
      descripcion:
        "Asesoramiento en ayudas sectoriales y de emergencia de la Generalitat: DANA, apicultura, Huerta de València y modernización de regadíos.",
      palabrasClave: [
        "ayuda", "subvencion", "gva", "generalitat", "dana", "apicultura",
        "huerta de valencia", "modernizacion de regadios", "ura"
      ]
    }
  ];

  function normaliza(texto) {
    return (texto || "")
      .toString()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  mc.registerTool({
    name: "cai-buscar-servicios",
    description:
      "Busca en el catálogo de servicios de ingeniería agrícola y rural de " +
      "Consultoría Agrícola Integral (Comunitat Valenciana: Valencia, Castellón y " +
      "Alicante) por palabra clave o necesidad del usuario, y devuelve nombre, " +
      "descripción y URL de cada servicio que encaja. Si no se indica ningún " +
      "filtro, devuelve el catálogo completo (7 servicios).",
    inputSchema: {
      type: "object",
      properties: {
        consulta: {
          type: "string",
          description:
            "Palabra clave o necesidad en lenguaje natural, por ejemplo " +
            "'segregar una parcela', 'placas solares para riego' o " +
            "'plan de abonado obligatorio'."
        },
        categoria: {
          type: "string",
          enum: SERVICIOS.map(function (s) {
            return s.nombre;
          }),
          description:
            "Nombre exacto de una de las 7 categorías de servicio, si ya se conoce."
        }
      }
    },
    execute: async function (args) {
      args = args || {};
      var consultaNorm = normaliza(args.consulta);
      var categoria = args.categoria;

      var resultados = SERVICIOS.filter(function (s) {
        if (categoria && s.nombre !== categoria) {
          return false;
        }
        if (!consultaNorm) {
          return true;
        }
        var haystack = normaliza(
          s.nombre + " " + s.descripcion + " " + s.palabrasClave.join(" ")
        );
        if (haystack.indexOf(consultaNorm) !== -1) {
          return true;
        }
        return consultaNorm.split(/\s+/).some(function (palabra) {
          return palabra.length > 2 && haystack.indexOf(palabra) !== -1;
        });
      });

      var sinCoincidencias = resultados.length === 0;
      if (sinCoincidencias) {
        resultados = SERVICIOS;
      }

      var payload = {
        empresa: "Consultoría Agrícola Integral",
        zona_de_servicio: "Comunitat Valenciana (Valencia, Castellón y Alicante)",
        coincidencia_exacta: !sinCoincidencias,
        total_resultados: resultados.length,
        servicios: resultados.map(function (s) {
          return { nombre: s.nombre, descripcion: s.descripcion, url: s.url };
        }),
        siguiente_paso:
          "Para solicitar presupuesto o resolver dudas sobre cualquiera de " +
          "estos servicios, usa la herramienta 'cai-solicitar-presupuesto' del " +
          "formulario en " + BASE + "contacto.html, o indica al usuario que " +
          "contacte por email (info@consultoriaagricolaintegral.es), teléfono " +
          "(692 03 27 85) o WhatsApp."
      };

      return {
        content: [{ type: "text", text: JSON.stringify(payload, null, 2) }]
      };
    }
  });
})();
