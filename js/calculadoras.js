/* =========================================================
   Consultoría Agrícola Integral — Herramientas orientativas
   Estas calculadoras dan una PRIMERA estimación educativa.
   El resultado no sustituye un estudio técnico ni un proyecto
   firmado por un ingeniero. Se anima siempre a contactar para
   validar los datos sobre el terreno.
   ========================================================= */

/* ---------- 1. Calculadora orientativa de necesidades de abonado ---------- */
// Extracciones medias aproximadas de N-P2O5-K2O en kg por hectárea y año,
// según cultivo (valores de referencia agronómica general, ajustables según
// análisis de suelo real).
const EXTRACCIONES = {
  citricos:   { n: 180, p: 60,  k: 220, nombre: "Cítricos" },
  hortalizas: { n: 220, p: 90,  k: 260, nombre: "Hortalizas de regadío" },
  vinedo:     { n: 60,  p: 25,  k: 90,  nombre: "Viñedo" },
  olivar:     { n: 90,  p: 30,  k: 100, nombre: "Olivar" },
  frutales:   { n: 130, p: 50,  k: 160, nombre: "Frutales de hueso/pepita" },
};

function calcularAbonado() {
  const cultivo = document.getElementById("abonado-cultivo").value;
  const hectareas = parseFloat(document.getElementById("abonado-hectareas").value);
  const resultado = document.getElementById("abonado-resultado");

  if (!hectareas || hectareas <= 0) {
    resultado.classList.remove("visible");
    return;
  }

  const datos = EXTRACCIONES[cultivo];
  const n = (datos.n * hectareas).toFixed(0);
  const p = (datos.p * hectareas).toFixed(0);
  const k = (datos.k * hectareas).toFixed(0);

  resultado.innerHTML = `
    <p>Estimación orientativa para <strong>${datos.nombre}</strong> en <strong>${hectareas} ha</strong>:</p>
    <p class="valor">N: ${n} kg &nbsp;·&nbsp; P₂O₅: ${p} kg &nbsp;·&nbsp; K₂O: ${k} kg</p>
    <p class="tool-disclaimer">Esta cifra parte de extracciones medias de referencia, no de un análisis de suelo real.
    Un plan de abonado ajustado a tu parcela requiere analítica de suelo/agua y visita técnica.</p>
  `;
  resultado.classList.add("visible");
}

/* ---------- 2. Simulador de retorno de inversión: riego eficiente + autoconsumo solar ---------- */
function calcularEficiencia() {
  const consumoAnual = parseFloat(document.getElementById("efi-consumo").value); // kWh/año actual
  const precioKwh = parseFloat(document.getElementById("efi-precio").value); // €/kWh
  const inversion = parseFloat(document.getElementById("efi-inversion").value); // € inversión estimada
  const ahorroPct = parseFloat(document.getElementById("efi-ahorro").value); // % ahorro esperado
  const resultado = document.getElementById("efi-resultado");

  if (!consumoAnual || !precioKwh || !inversion || !ahorroPct) {
    resultado.classList.remove("visible");
    return;
  }

  const costeActual = consumoAnual * precioKwh;
  const ahorroAnual = costeActual * (ahorroPct / 100);
  const retornoAnos = ahorroAnual > 0 ? (inversion / ahorroAnual) : 0;

  resultado.innerHTML = `
    <p>Con un ahorro estimado del <strong>${ahorroPct}%</strong> sobre tu factura energética de riego/bombeo:</p>
    <p class="valor">Ahorro aproximado: ${ahorroAnual.toLocaleString("es-ES", {maximumFractionDigits: 0})} €/año</p>
    <p class="valor" style="font-size:1.1rem; color: var(--azul-tec);">Retorno de la inversión: ≈ ${retornoAnos.toFixed(1)} años</p>
    <p class="tool-disclaimer">Cálculo orientativo basado en tus propios datos de consumo y precio de la energía.
    El ahorro real depende del dimensionado técnico de la instalación (bombeo, telecontrol, fotovoltaica) que se define en el proyecto.</p>
  `;
  resultado.classList.add("visible");
}

/* ---------- 3. Calculadora orientativa de viabilidad de segregación parcelaria ---------- */
// Unidad Mínima de Cultivo (UMC) — valores de referencia general para la Comunitat Valenciana.
// OJO: la UMC real varía según comarca agraria y Ayuntamiento; esto es solo un primer filtro.
const UMC_REFERENCIA = {
  secano: 30000,   // m² (aprox. 3 ha, valor general de referencia)
  regadio: 10000,  // m² (aprox. 1 ha, valor general de referencia)
};

function calcularSegregacion() {
  const superficieTotal = parseFloat(document.getElementById("seg-superficie").value); // m²
  const numParcelas = parseInt(document.getElementById("seg-numero").value, 10);
  const tipo = document.getElementById("seg-tipo").value;
  const resultado = document.getElementById("seg-resultado");

  if (!superficieTotal || !numParcelas || numParcelas < 2) {
    resultado.classList.remove("visible");
    return;
  }

  const superficieResultante = superficieTotal / numParcelas;
  const umc = UMC_REFERENCIA[tipo];
  const viable = superficieResultante >= umc;

  resultado.innerHTML = `
    <p>Cada una de las ${numParcelas} parcelas resultantes tendría aproximadamente:</p>
    <p class="valor">${superficieResultante.toLocaleString("es-ES", {maximumFractionDigits: 0})} m²</p>
    <p style="color: ${viable ? "#3a6b4a" : "#b3403a"}; font-weight:700;">
      ${viable
        ? "✓ Por encima de la Unidad Mínima de Cultivo de referencia (" + umc.toLocaleString("es-ES") + " m²)."
        : "✗ Por debajo de la Unidad Mínima de Cultivo de referencia (" + umc.toLocaleString("es-ES") + " m²). Podría requerir excepción justificada."}
    </p>
    <p class="tool-disclaimer">La UMC real depende de la comarca agraria y de la ordenanza municipal aplicable, y existen excepciones
    (edificación vinculada, agrupación, herencias, etc.). Este resultado es solo un primer filtro: el estudio de viabilidad
    real se hace caso por caso.</p>
  `;
  resultado.classList.add("visible");
}

/* ---------- 4. Calculadora orientativa de huella de carbono de la explotación ---------- */
// Factores de emisión de referencia general (fuentes habituales en estudios agronómicos):
// Gasóleo agrícola: ~2.68 kg CO2e/litro · Electricidad de red (mix España): ~0.19 kg CO2e/kWh
// Fertilizante nitrogenado sintético: ~5.5 kg CO2e/kg N aplicado (producción + emisiones N2O)
function calcularHuellaCarbono() {
  const gasoleo = parseFloat(document.getElementById("hc-gasoleo").value) || 0; // litros/año
  const electricidad = parseFloat(document.getElementById("hc-electricidad").value) || 0; // kWh/año
  const nitrogeno = parseFloat(document.getElementById("hc-nitrogeno").value) || 0; // kg N/año
  const resultado = document.getElementById("hc-resultado");

  if (!gasoleo && !electricidad && !nitrogeno) {
    resultado.classList.remove("visible");
    return;
  }

  const co2Gasoleo = gasoleo * 2.68;
  const co2Electricidad = electricidad * 0.19;
  const co2Nitrogeno = nitrogeno * 5.5;
  const totalKg = co2Gasoleo + co2Electricidad + co2Nitrogeno;
  const totalTon = totalKg / 1000;
  const arbolesEquivalentes = Math.round(totalKg / 20); // ≈20 kg CO2/año absorbidos por árbol adulto, valor de referencia general

  resultado.innerHTML = `
    <p>Huella de carbono anual estimada de la explotación:</p>
    <p class="valor">${totalTon.toLocaleString("es-ES", {maximumFractionDigits: 2})} t CO₂e/año</p>
    <p style="color: var(--texto-suave);">Equivale aproximadamente a la absorción anual de <strong>${arbolesEquivalentes.toLocaleString("es-ES")} árboles adultos</strong>.</p>
    <p class="tool-disclaimer">Cálculo orientativo a partir de factores de emisión de referencia general (gasóleo, electricidad de red, fertilización nitrogenada).
    No incluye otras fuentes (maquinaria de terceros, fitosanitarios, transporte) ni las particularidades de tu explotación. Un estudio de huella de carbono
    real requiere recogida de datos completa y metodología normalizada (ISO 14064 / GHG Protocol).</p>
  `;
  resultado.classList.add("visible");
}

document.addEventListener("DOMContentLoaded", function () {
  const bAbonado = document.getElementById("btn-abonado");
  if (bAbonado) bAbonado.addEventListener("click", calcularAbonado);

  const bEfi = document.getElementById("btn-eficiencia");
  if (bEfi) bEfi.addEventListener("click", calcularEficiencia);

  const bSeg = document.getElementById("btn-segregacion");
  if (bSeg) bSeg.addEventListener("click", calcularSegregacion);

  const bHc = document.getElementById("btn-huella-carbono");
  if (bHc) bHc.addEventListener("click", calcularHuellaCarbono);
});
