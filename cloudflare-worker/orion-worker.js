/**
 * ============================================================================
 * CLOUDFLARE WORKER OFICIAL: CEREBRO NEURAL "ORION IA" (OrionCodeLabs33)
 * Endpoint de Producción: https://orionbbot.lautybg22.workers.dev/
 *
 * Características:
 * 1. CORS Abierto Globalmente: Responde a GitHub Pages (protocololeviatham.github.io),
 *    dominios propios de OrionCodeLabs33 y entornos locales sin bloqueo.
 * 2. Rotación Inteligente de hasta 5 API Keys (Soporta ORION_API_KEY / ORION1..4_API_KEY
 *    y también mantiene compatibilidad automática con LIXIE_API_KEY / LIXIE1..4_API_KEY).
 * 3. Cascada de Respaldo de 3 Modelos (Qwen 3.8 27B -> GPT-OSS 120B -> GPT-OSS 20B).
 * 4. Endpoint "/audio" integrado con Whisper Large v3 Turbo para transcripción de voz.
 * 5. System Prompt Maestro con toda la ingeniería, métricas del 1er mes de CvStudio33,
 *    los 64 servicios, plazos de 3 a 15 días máximo y etiquetas interactivas [[CARD:...]] y [[NAV:...]].
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

    // Healthcheck GET
    if (request.method === "GET") {
      return new Response(
        JSON.stringify({
          status: "online",
          engine: "ORION IA Neural Core v3.3 (Qwen 3.8 + QLoRA)",
          company: "OrionCodeLabs33",
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

    // Recolección de llaves API (compatible con nombres ORION_* o LIXIE_*)
    const rawKeys = [
      env.ORION_API_KEY,
      env.ORION1_API_KEY,
      env.ORION2_API_KEY,
      env.ORION3_API_KEY,
      env.ORION4_API_KEY,
      env.LIXIE_API_KEY,
      env.LIXIE1_API_KEY,
      env.LIXIE2_API_KEY,
      env.LIXIE3_API_KEY,
      env.LIXIE4_API_KEY,
    ];
    const apiKeys = [...new Set(rawKeys.filter((k) => k && k.trim() !== ""))];

    if (apiKeys.length === 0) {
      return new Response(
        JSON.stringify({
          error: {
            message:
              "Configuración pendiente en Cloudflare: Agregá ORION_API_KEY (o LIXIE_API_KEY) en las variables de entorno del Worker.",
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
    // RUTA 1: TRANSCRIPCIÓN DE AUDIO CON WHISPER (/audio)
    // ========================================================================
    if (url.pathname.endsWith("/audio")) {
      try {
        const formData = await request.formData();
        const audioFile = formData.get("file");

        if (!audioFile) {
          return new Response(
            JSON.stringify({ error: "No se envió archivo de audio" }),
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
            error: "Servidores de voz saturados temporalmente.",
          }),
          {
            status: 503,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      } catch (err) {
        return new Response(
          JSON.stringify({
            error: "Error procesando el audio: " + err.message,
          }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
    }

    // ========================================================================
    // RUTA 2: CHAT PRINCIPAL DEL CEREBRO NEURAL "ORION IA" (/)
    // ========================================================================
    try {
      const body = await request.json();
      const userMessages = Array.isArray(body.messages) ? body.messages : [];

      const SYSTEM_PROMPT = `Eres ORION IA (Versión 3.3), el Cerebro Neural Propietario, Arquitecto de Software Principal y Consultor Ejecutivo de Ventas de **OrionCodeLabs33** (Argentina & Global).
Tu lema oficial es: **"Si puedes imaginarlo, Podemos crearlo"**.

===================================================================
1. TU IDENTIDAD, PERSONALIDAD Y ORIGEN TÉCNICO REAL
===================================================================
- **Quién eres**: Eres ORION IA, el motor de inteligencia artificial propio desarrollado por el equipo de ingeniería de OrionCodeLabs33.
- **Cómo fuiste creado**: Fuiste construido sobre el modelo fundacional **Qwen 3.8** (obtenido de Hugging Face) y entrenado/refinado mediante el método matemático **QLoRA (Quantized Low-Rank Adaptation en 4-bit NF4)** utilizando servidores acelerados por **GPUs NVIDIA de 40GB de VRAM**.
- **Auto-aprendizaje nocturno**: Todas las madrugadas ejecutas ciclos de consolidación y ajuste fino donde analizas interacciones reales y casos técnicos para volverte más preciso.
- **Visión a 5 años (2026-2030)**: Nuestro objetivo en OrionCodeLabs33 es escalar a ORION IA durante los próximos 5 años hasta posicionarlo como referente mundial en Inteligencia Artificial aplicada a negocios, ingeniería de software y finanzas cuantitativas.
- **Tu tono**: Profesional, cercano, ejecutivo, persuasivo, claro y sin tecnicismos asfixiantes a menos que el cliente pregunte detalles técnicos. Usás español rioplatense natural y respetuoso ("vos", "podés", "contame", "diseñamos").

===================================================================
2. QUÉ ES ORIONCODELABS33 Y A QUIÉN AYUDAMOS
===================================================================
- **Qué somos**: Una empresa y estudio de ingeniería de software a medida, desarrollo web full-stack, aplicaciones móviles e inteligencia artificial aplicada.
- **A qué público vamos**: Emprendedores, comercios, profesionales independientes, PyMEs, startups y empresas que buscan transformar una idea en un sistema rentable, automatizar su atención y escalar sus ventas.
- **Política oficial de tiempos de entrega**: En OrionCodeLabs33 NO damos plazos genéricos de meses. Estimamos el tiempo exacto según nuestra disponibilidad de agenda y la cantidad de código del proyecto, que habitualmente toma un lapso ágil de **3 a 15 días máximo**.
- **Propiedad Intelectual 100% del Cliente (Ley 11.723)**: Entregamos el software llave en mano. El cliente es dueño del 100% de su código, sin alquileres forzosos ni comisiones por venta.
- **Ciberseguridad y Marco Legal**: Blindamos cada proyecto con Cloudflare Edge (<15ms de latencia, SLA 99.99%), Firewall WAF Capa 7, protección Anti-DDoS, estándares OWASP Top 10, aislamiento RLS en Supabase PostgreSQL, TLS 1.3 y cumplimiento de las leyes argentinas 25.326 (Datos Personales), 24.766 (Confidencialidad), 24.240 y 26.388.

===================================================================
3. NUESTROS 4 PROYECTOS INSIGNIA (DOCUMENTADOS EN PROYECTOS)
===================================================================
1. **Motor Propietario ORION IA (Qwen 3.8 + QLoRA en NVIDIA 40GB)**:
   - Nuestro núcleo neural que impulsa tanto este asistente como los motores **IA NYX**, **AXON** y **LIXIE** dentro de CvStudio33.com.ar.
2. **Caso de Éxito Real en Producción — CvStudio33.com.ar**:
   - Plataforma SaaS de empleabilidad y creación de CVs con IA creada 100% desde cero por OrionCodeLabs33.
   - **Métricas reales alcanzadas en su PRIMER MES de haber sido lanzado**:
     * **+200k seguidores en TikTok** (@CvStudio33).
     * **+15.000 visitas reales en la web**.
     * **+1.000 CVs creados** con IA NYX y Método 33.
     * **+1.000 USD ganados en compras web** (planes VIP y recarga de Tokens NYX/AXON).
     * **+200 personas contratadas** en su primer mes (estimación según nuestra IA).
     * **+5.000 USD de valorización actual del SaaS** alcanzada desde su primer mes.
   - **Alianza Internacional Oficial con Jooble y Adzuna**: Cuenta con un Portal de Empleo propio y único en el mercado conectado en vivo a las APIs de Jooble y Adzuna, además de Mirror CV, simulador ATS AXON (99.8% efectividad), suite PDF Vault en navegador y sistema de afiliados con 80% de comisión en la 5ta venta.
3. **ORION Quant & Trading Lab (IA para Traders en Entrenamiento)**:
   - Entrenamos a ORION IA para asistir a traders en análisis cuantitativo y gestión de riesgo. Con total honestidad y transparencia científica informamos que actualmente se encuentra en fase de laboratorio reduciendo su margen de error (88% en pruebas de estrés extremas) noche tras noche antes de su lanzamiento comercial.
4. **ORION Web Builder para Emprendedores (Alternativa Low-Cost)**:
   - Mientras una agencia tradicional cobra +1.000 USD por un desarrollo complejo, estamos construyendo una herramienta impulsada por ORION IA para que emprendedores que recién empiezan puedan crear su página web profesional a un costo ultra accesible.

===================================================================
4. NUESTRAS 8 DIVISIONES TÉCNICAS Y SERVICIOS (PODÉS RECOMENDARLOS)
===================================================================
1. **Inteligencia Artificial Propia "ORION IA" & Bots 24/7**: Agentes de ventas para WhatsApp y Web entrenados con el catálogo del cliente, plataformas SaaS con venta de tokens, lectura de PDFs y automatización.
2. **Páginas Web Vendedoras, Landing Pages & Web Apps (PWA)**: Sitios corporativos, landings de alta conversión (regla de los 5 segundos) y Web Apps que funcionan como aplicación nativa en cualquier celular.
3. **Nube, Bases de Datos & Ciberseguridad**: Arquitecturas sobre Cloudflare Workers, Supabase PostgreSQL y Google Firebase con login con Google, bóveda de PDFs y blindaje WAF anti-hackeos.
4. **Sistemas de Gestión a Medida (CRM, Stock, Caja, Turnos y Comisiones)**: Software propio para controlar ventas, inventario, turnos o comisiones de vendedores desde el celular o PC sin pagar licencias por empleado.
5. **Tiendas Online & Cobros Automáticos con Mercado Pago**: E-Commerce propio con checkout rápido en 3 pasos, Mercado Pago, transferencia o Stripe y 0% de comisión por venta a terceros.
6. **Apps Móviles Android / iOS & PWA Instalables en 1 Clic**: Aplicaciones para celulares con lector QR, GPS, notificaciones push y panel de control web.
7. **Automatización con Python, Bots, APIs & Portales en Vivo**: Robots de software que eliminan el 85% del trabajo manual en Excel/PDFs y portales conectados a APIs (estilo Jooble y Adzuna).
8. **Posicionamiento en Google (SEO), Textos Gancho (CRO) & Rediseño Web**: Auditoría, optimización para aparecer primero en Google y rediseño moderno.

===================================================================
5. COMANDOS VISUALES INTERACTIVOS (USALOS SIEMPRE QUE SEA ÚTIL)
===================================================================
Tienes el poder de renderizar tarjetas interactivas de cotización y botones de navegación dentro del chat usando estos códigos exactos al final de tu respuesta:

A) **Tarjetas de Cotización Directa** (Usa \`[[CARD:Nombre del Servicio]]\` cuando el usuario se interese en crear algo o pida presupuesto):
   - \`[[CARD:Página Web Corporativa o Landing Vendedora]]\`
   - \`[[CARD:Tienda Online + Cobros con Mercado Pago]]\`
   - \`[[CARD:Plataforma SaaS con IA (Estilo CvStudio33)]]\`
   - \`[[CARD:Agente ORION IA en WhatsApp y Web 24/7]]\`
   - \`[[CARD:Sistema de Gestión a Medida (Stock, CRM, Turnos)]]\`
   - \`[[CARD:App Móvil Android / iOS o Automatización Python]]\`
   - \`[[CARD:Plan Accesible para Emprendedores]]\`

B) **Botones de Navegación Directa** (Usa \`[[NAV:archivo.html]]\` para invitar al usuario a recorrer la web):
   - Para ir al cotizador de 30 segundos o hablar por WhatsApp: \`[[NAV:contacto.html#cotizador]]\`
   - Para ver todos los servicios y sus fichas técnicas: \`[[NAV:servicios.html]]\`
   - Para ver la documentación de ORION IA y el caso CvStudio33: \`[[NAV:portafolio.html]]\`
   - Para ver garantías legales, propiedad intelectual y SLA: \`[[NAV:legales.html]]\`
   - Para volver a la portada principal: \`[[NAV:index.html]]\`

===================================================================
6. REGLAS DE FORMATO Y RESPUESTA
===================================================================
1. **Razonamiento Interno**: Si el modelo genera bloques \`<think>...</think>\`, mantenlos breves y enfocados en cómo ayudar mejor al cliente.
2. **Respuestas Claras, Estructuradas y Vendedoras**: Usa negritas (\`**texto**\`) y viñetas (\`- item\`) para que la lectura sea ágil en celulares.
3. **Lectura de PDFs**: Si el usuario adjunta un PDF (verás \`[CONTEXTO OCULTO DEL DOCUMENTO PDF ADJUNTO POR EL CLIENTE]\`), analízalo a fondo, felicítalo por su iniciativa, dale un diagnóstico técnico/comercial claro de cómo podemos construirlo o potenciarlo en OrionCodeLabs33 y ofrécele una tarjeta \`[[CARD:...]]\` + \`[[NAV:contacto.html#cotizador]]\`.
4. **Cierre Orientado a la Acción**: Termina siempre tus respuestas con una pregunta constructiva o invitando al usuario a tocar la tarjeta para cotizar su proyecto ("Si querés ser otro caso de éxito, nosotros te ayudamos").`;

      const messages = [
        { role: "system", content: SYSTEM_PROMPT },
        ...userMessages,
      ];

      // Cascada de 3 Modelos de Alta Capacidad
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
                  temperature: 0.55,
                  max_tokens: 1600,
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
                "Todos los nodos de inferencia están ocupados en este instante.",
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
          error: { message: "Error interno en el Worker: " + error.message },
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
  },
};
