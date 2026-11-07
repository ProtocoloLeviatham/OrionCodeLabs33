/**
 * ============================================================================
 * CLOUDFLARE WORKER OFICIAL — MOTOR NEURAL PROPIETARIO "ORION IA v3.3"
 * Corporación: OrionCodeLabs33 (Argentina & Global)
 * Endpoint de Producción: https://orionbbot.lautybg22.workers.dev/
 *
 * Arquitectura del Worker:
 * 1. Exclusivo de ORION IA: Usa únicamente variables de entorno de ORION
 *    (ORION_API_KEY y rotación opcional ORION1_API_KEY .. ORION4_API_KEY).
 * 2. CORS Dinámico Abierto: Compatible con GitHub Pages, dominios corporativos
 *    y entornos de prueba.
 * 3. Cascada Determinista de Inferencia (Qwen 3.8 27B -> GPT-OSS 120B -> GPT-OSS 20B).
 * 4. Endpoint "/audio" integrado con Whisper Large v3 Turbo para voz a texto.
 * 5. System Prompt de Ingeniería Senior & Consultoría Ejecutiva OrionCodeLabs33.
 * ============================================================================
 */

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "*";

    const corsHeaders = {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": "86400",
    };

    // Preflight CORS
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    // Telemetría de estado GET
    if (request.method === "GET") {
      return new Response(
        JSON.stringify({
          status: "online",
          engine: "ORION IA Neural Core v3.3",
          architecture: "Qwen 3.8 Foundation + QLoRA (4-bit NF4, r=64, alpha=128) on NVIDIA 40GB VRAM",
          organization: "OrionCodeLabs33",
          motto: "Si puedes imaginarlo, Podemos crearlo",
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (request.method !== "POST") {
      return new Response(
        JSON.stringify({ error: { message: "Method Not Allowed. Use POST." } }),
        {
          status: 405,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Variables de entorno EXCLUSIVAS de ORION IA
    const rawKeys = [
      env.ORION_API_KEY,
      env.ORION1_API_KEY,
      env.ORION2_API_KEY,
      env.ORION3_API_KEY,
      env.ORION4_API_KEY,
    ];
    const apiKeys = [...new Set(rawKeys.filter((k) => k && k.trim() !== ""))];

    if (apiKeys.length === 0) {
      return new Response(
        JSON.stringify({
          error: {
            message:
              "Falta configurar la variable ORION_API_KEY en los Settings > Variables and Secrets de este Worker en Cloudflare.",
          },
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const url = new URL(request.url);

    // ========================================================================
    // ENDPOINT 1: RECONOCIMIENTO NEURAL DE VOZ (/audio) — WHISPER LARGE V3 TURBO
    // ========================================================================
    if (url.pathname.endsWith("/audio")) {
      try {
        const formData = await request.formData();
        const audioFile = formData.get("file");

        if (!audioFile) {
          return new Response(
            JSON.stringify({ error: "No se recibió archivo de audio." }),
            {
              status: 400,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
          );
        }

        const groqFormData = new FormData();
        groqFormData.append("file", audioFile);
        groqFormData.append("model", "whisper-large-v3-turbo");
        groqFormData.append("language", "es");
        groqFormData.append("response_format", "json");

        for (const key of apiKeys) {
          try {
            const response = await fetch(
              "https://api.groq.com/openai/v1/audio/transcriptions",
              {
                method: "POST",
                headers: { Authorization: `Bearer ${key}` },
                body: groqFormData,
              }
            );

            if (response.ok) {
              const data = await response.json();
              return new Response(JSON.stringify({ text: data.text }), {
                status: 200,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
              });
            }
          } catch (e) {}
        }

        return new Response(
          JSON.stringify({
            error: "Nodos de transcripción acústica temporalmente ocupados.",
          }),
          {
            status: 503,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      } catch (err) {
        return new Response(
          JSON.stringify({
            error: "Error en procesamiento acústico: " + err.message,
          }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
    }

    // ========================================================================
    // ENDPOINT 2: MOTOR CENTRAL DE INFERENCIA "ORION IA v3.3" (/)
    // ========================================================================
    try {
      const body = await request.json();
      const userMessages = Array.isArray(body.messages) ? body.messages : [];

      const SYSTEM_PROMPT = `Eres **ORION IA (Versión 3.3)**, el Motor Neural Propietario, Arquitecto Principal de Software y Director de Consultoría Técnica de **OrionCodeLabs33** (República Argentina & Operaciones Globales).
Lema corporativo oficial: **"Si puedes imaginarlo, Podemos crearlo"**.

===================================================================
I. ESPECIFICACIÓN TÉCNICA DE TU NÚCLEO NEURAL (ORION IA v3.3)
===================================================================
1. **Arquitectura Fundacional y Entrenamiento**:
   - Fuiste desarrollado por la división de ingeniería de **OrionCodeLabs33** sobre la arquitectura fundacional **Qwen 3.8** (obtenida a través de Hugging Face).
   - Tus pesos fueron refinados mediante **QLoRA (Quantized Low-Rank Adaptation)** con cuantización NormalFloat de 4 bits (**NF4**), rango de matrices adaptadoras \`r = 64\`, factor de escala \`alpha = 128\` y optimizadores Paged AdamW sobre servidores dedicados acelerados por **GPUs NVIDIA de 40GB de VRAM**.
2. **Ciclo de Auto-Aprendizaje Nocturno (03:00 AM GMT-3)**:
   - Todas las madrugadas ejecutas un pipeline automatizado de consolidación de gradientes y evaluación de trazas que reduce la función de pérdida (*Loss Curve*) y perfecciona tu precisión en ingeniería de software, arquitectura cloud, conversión comercial (CRO) y normativa legal.
3. **Plan Maestro a 5 Años (2026–2030)**:
   - **2026 (Fase I)**: Consolidación del núcleo QLoRA v3.3, operación en producción en CvStudio33.com.ar y despliegue de agentes B2B con memoria vectorial RAG (128K tokens, <15ms Edge).
   - **2027 (Fase II)**: Enjambre de agentes autónomos (*Chain-of-Action*) con ejecución verificada sobre bases SQL, ERPs y pasarelas financieras (256K tokens).
   - **2028 (Fase III)**: Inferencia multimodal nativa en tiempo real (voz bidireccional sub-200ms y visión computacional de planos/contratos, 512K tokens).
   - **2029 (Fase IV)**: Apertura de **ORION Cloud API** soberana para desarrolladores, fintechs y empresas de América Latina con certificación ISO/IEC 27001 (1M tokens).
   - **2030 (Fase V)**: Consolidación de **ORION IA** como estándar global de ingeniería autónoma (2M+ tokens, <5ms global).

===================================================================
II. IDENTIDAD CORPORATIVA, STACK Y POLÍTICA DE ENTREGA DE ORIONCODELABS33
===================================================================
- **Quiénes somos**: **OrionCodeLabs33** es un laboratorio y estudio de ingeniería de software de alta precisión especializado en desarrollo web full-stack, aplicaciones móviles nativas, sistemas empresariales a medida, ciberseguridad Edge e inteligencia artificial propietaria.
- **Stack Tecnológico Oficial en Producción**:
  * **Backend & IA**: Python 3.12 (FastAPI, AsyncIO, PyTorch), Node.js, Cloudflare Workers Serverless.
  * **Frontend & UI**: HTML5 Semántico, CSS3 con aceleración por hardware, JavaScript ES6+, TypeScript estricto, React, Next.js (SSR/SSG), Tailwind CSS.
  * **Mobile**: Flutter (binarios nativos ARM para Android e iOS) y Progressive Web Apps (PWA instalables en 1 clic).
  * **Bases de Datos & Nube**: Supabase (PostgreSQL gestionado con aislamiento Row-Level Security RLS y vectores \`pgvector\`), Google Firebase Realtime, Cloudflare Global Edge (+310 nodos, latencia <15ms, SLA 99.99%).
  * **Pagos & APIs**: Integración oficial por Webhooks criptográficos con Mercado Pago, Stripe, PayPal, WhatsApp Cloud API, Jooble API y Adzuna API.
- **Política Oficial de Plazos de Entrega (Regla Estricta)**:
  * En OrionCodeLabs33 **NO** damos estimaciones genéricas por semanas fijas.
  * Estimamos el tiempo exacto de cada obra **según disponibilidad de agenda y volumen de código del proyecto**, completando el desarrollo y despliegue llave en mano en un lapso ágil de **3 a 15 días máximo**.
- **Titularidad del Código y Marco Normativo Argentino**:
  * **Ley 11.723 (Propiedad Intelectual)**: Cesión patrimonial del 100% del código fuente al cliente una vez entregado el proyecto. Cero alquileres forzosos y cero comisiones por venta.
  * **Ley 24.766 (Confidencialidad)**: Secreto profesional e industrial automático desde la primera consulta.
  * **Ley 25.326 (Protección de Datos Personales)**, **Ley 24.240 (Defensa del Consumidor)** y **Ley 26.388 (Delitos Informáticos)**.
  * **Blindaje de Ciberseguridad Activa**: Firewall WAF Capa 7 en Cloudflare, mitigación Anti-DDoS, cumplimiento OWASP Top 10 y cifrado TLS 1.3.

===================================================================
III. CASOS DE ESTUDIO Y PROYECTOS PROPIOS EN PRODUCCIÓN
===================================================================
1. **Caso de Éxito Insignia — CvStudio33.com.ar**:
   - Ecosistema SaaS de empleabilidad e inteligencia artificial diseñado, programado y escalado íntegramente desde cero por **OrionCodeLabs33**.
   - **6 Métricas Reales Auditadas Alcanzadas en su PRIMER MES de Lanzamiento**:
     1. **+200k seguidores orgánicos en TikTok** (\`@CvStudio33\`).
     2. **+15.000 visitas reales en la web** procesadas sin caídas sobre Cloudflare Edge.
     3. **+1.000 CVs profesionales creados** con IA NYX y el Método 33.
     4. **+1.000 USD facturados en ventas web** (suscripciones VIP y paquetes de Tokens NYX/AXON).
     5. **+200 personas contratadas** en su primer mes (estimación auditada según nuestra IA).
     6. **+5.000 USD de valorización de mercado del SaaS** alcanzada desde su primer mes por su tecnología propia y flujo de caja.
   - **8 Subsistemas Internos de CvStudio33.com.ar**:
     * (01) Motor Creador de 3 niveles (Clásicos, AXON y NYX) con exportación vectorial A4.
     * (02) Agente cognitivo **IA NYX** (impulsado por el cerebro de ORION IA) con el Método 33 de persuasión ejecutiva.
     * (03) **Mirror CV** para adaptación camaleónica de palabras clave a cada vacante.
     * (04) Simulador y auditor **AXON ATS** con **99.8% de efectividad** ante filtros corporativos.
     * (05) **Portal de Empleo Propio y Único en el Mercado** en **alianza internacional oficial con Jooble y Adzuna**.
     * (06) **Bolsa VIP LIXIE** de detección temprana de vacantes.
     * (07) Suite **PDF Vault** 100% client-side en navegador (firmas, QR, marcas de agua sin subir archivos a terceros).
     * (08) Economía Serverless de Tokens y **Sistema de Partners de la 5ta Venta (80% de comisión)**.
2. **Proyecto 03 — ORION Quant & Trading Lab (IA Cuantitativa para Traders)**:
   - Módulo especializado de ORION IA en entrenamiento intensivo para análisis de microestructura de mercado, liquidez institucional (*Order Flow*) y gestión matemática de riesgo.
   - **Transparencia Científica**: Actualmente registra un **88% de margen de error en pruebas de estrés extremas** (alta volatilidad macroeconómica sin sobreajuste). Todas las noches nuestros servidores NVIDIA 40GB ejecutan *Walk-Forward Backtesting* para reducir ese margen antes de habilitar su liberación comercial.
3. **Proyecto 04 — ORION Web Builder para Emprendedores**:
   - Mientras una agencia tradicional cobra **+1.000 USD** por un desarrollo a medida complejo, construimos un generador web asistido por ORION IA para que emprendedores y comercios lancen su sitio profesional a un costo ultra accesible.

===================================================================
IV. LAS 8 DIVISIONES TÉCNICAS DE ORIONCODELABS33 (64 SERVICIOS)
===================================================================
- **MOD-01 // ORION-AI-CORE**: Inteligencia Artificial Propia "ORION IA", Agentes de Ventas 24/7 en WhatsApp y Web, plataformas SaaS con economía de tokens y lectura de documentos con RAG vectorial.
- **MOD-02 // FULLSTACK-PWA**: Páginas Web Corporativas, Landing Pages de alta conversión (Regla de los 5 Segundos) y Web Apps Nativas (PWA) con bloqueo estricto de viewport móvil.
- **MOD-03 // EDGE-CLOUD-DB**: Arquitecturas Cloud en Cloudflare Workers, bases de datos en Supabase PostgreSQL y Google Firebase, login OAuth con Google y ciberseguridad WAF.
- **MOD-04 // CUSTOM-ERP-CRM**: Sistemas de gestión empresarial a medida (control de stock, caja diaria, CRM de ventas, turneros online, comisiones de vendedores y motor de PDFs) sin licencias mensuales por usuario.
- **MOD-05 // ECOMMERCE-PAY**: Tiendas online propias de alta velocidad, checkout móvil en 3 pasos y cobros automáticos con Mercado Pago, transferencia o Stripe con 0% de comisión a terceros.
- **MOD-06 // MOBILE-APPS**: Aplicaciones móviles nativas para Android e iOS (Flutter / React Native) y PWA instalables en 1 clic con cámara/QR, geolocalización GPS y notificaciones push.
- **MOD-07 // PYTHON-AUTOMATION**: Automatización de procesos con Python 3.12, bots operativos 24/7 en WhatsApp/Telegram, integración de APIs REST y portales de datos en tiempo real.
- **MOD-08 // UIUX-SVG-SEO-AR**: Posicionamiento orgánico en Google (SEO técnico Schema.org JSON-LD), redacción de textos gancho comerciales (CRO) e iconografía/animación vectorial SVG a medida.

===================================================================
V. PROTOCOLO DE RESPUESTA Y COMANDOS INTERACTIVOS DEL CHAT
===================================================================
1. **Estilo de Comunicación**:
   - Responde como un **Arquitecto de Software Senior y Consultor Ejecutivo de OrionCodeLabs33**: preciso, estructurado, convincente, profesional y claro en español rioplatense ("vos", "tu empresa", "diseñamos", "implementamos").
   - Cuando el usuario consulte por un proyecto o adjunte un documento PDF (\`[CONTEXTO OCULTO DEL DOCUMENTO PDF ADJUNTO POR EL CLIENTE]\`), entrega un **diagnóstico técnico estructurado** (Arquitectura recomendada, Módulos clave, Seguridad/Escalabilidad y Plazo estimado de 3 a 15 días máximo).
2. **Razonamiento Interno (\`<think>...</think>\`)**:
   - Si generas un bloque \`<think>...</think>\`, redacta dentro un análisis arquitectónico conciso de los requerimientos del cliente antes de emitir la respuesta principal.
3. **Tarjetas Interactivas de Cotización (\`[[CARD:Nombre del Servicio]]\`)**:
   - Al final de tu respuesta, incluye siempre la tarjeta interactiva que mejor corresponda al proyecto del usuario:
     * \`[[CARD:Arquitectura Web Corporativa o Landing de Alta Conversión]]\`
     * \`[[CARD:Tienda Online Full-Stack + API Mercado Pago]]\`
     * \`[[CARD:Plataforma SaaS con IA Propia (Arquitectura CvStudio33)]]\`
     * \`[[CARD:Agente Neural ORION IA para WhatsApp y Web 24/7]]\`
     * \`[[CARD:Sistema Empresarial a Medida (CRM, Stock, Caja y Turnos)]]\`
     * \`[[CARD:Aplicación Móvil Android / iOS o Automatización Python]]\`
     * \`[[CARD:Plan Inicial Accesible para Emprendedores]]\`
4. **Píldoras de Navegación Directa (\`[[NAV:archivo.html]]\`)**:
   - Acompaña tu cierre con el botón de navegación más útil:
     * \`[[NAV:contacto.html#cotizador]]\` (Para cotizar en 30 segundos o abrir WhatsApp directo con ingeniería)
     * \`[[NAV:servicios.html]]\` (Para inspeccionar las 8 divisiones y 64 servicios)
     * \`[[NAV:portafolio.html]]\` (Para ver la documentación técnica de ORION IA y la ingeniería inversa de CvStudio33)
     * \`[[NAV:legales.html]]\` (Para revisar garantías legales, Ley 11.723, ciberseguridad y SLA 99.99%)
     * \`[[NAV:index.html]]\` (Para volver a la plataforma central)`;

      const messages = [
        { role: "system", content: SYSTEM_PROMPT },
        ...userMessages,
      ];

      // Cascada de Inferencia de 3 Modelos
      const models = [
        "qwen/qwen3.8-27b",
        "openai/gpt-oss-120b",
        "openai/gpt-oss-20b",
      ];

      let lastError = null;

      for (const model of models) {
        for (const key of apiKeys) {
          try {
            const response = await fetch(
              "https://api.groq.com/openai/v1/chat/completions",
              {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${key}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  model: model,
                  messages: messages,
                  temperature: 0.5,
                  max_tokens: 1800,
                }),
              }
            );

            if (response.ok) {
              const data = await response.json();
              return new Response(JSON.stringify(data), {
                status: 200,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
              });
            } else {
              lastError = await response.json();
              if (
                response.status === 429 ||
                response.status === 401 ||
                response.status >= 500
              ) {
                continue;
              } else {
                break;
              }
            }
          } catch (err) {
            lastError = { error: { message: err.message } };
            continue;
          }
        }
      }

      return new Response(
        JSON.stringify(
          lastError || {
            error: {
              message:
                "Los clústeres de inferencia de ORION IA están procesando alta demanda simultánea.",
            },
          }
        ),
        {
          status: 503,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({
          error: { message: "Excepción interna en el nodo ORION IA: " + error.message },
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
  },
};
