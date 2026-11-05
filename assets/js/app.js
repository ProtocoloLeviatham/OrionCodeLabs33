/**
 * ==========================================================================
 * OrionCodeLabs33 — Core Application Controller & Detailed Services Engine
 * Archivo 5: assets/js/app.js
 * - Base de Conocimiento Exhaustiva de Servicios 100% Realizables con
 *   Ingeniería asistida por nuestra IA propia "ORION", Cloudflare,
 *   Cloudflare Workers, Supabase, Firebase, Python, JS/TS, HTML5 y CSS3.
 * - Incluye casos reales detallados como CvStudio33.com.ar.
 * ==========================================================================
 */

(function () {
  'use strict';

  const ORION_SERVICES_DB = {
    orion_ai: {
      code: 'MOD-01 // ORION-AI-CORE',
      shortTitle: 'IA Propia "ORION" & Agentes',
      title: 'Sistemas de Inteligencia Artificial & Motor Propio "ORION IA"',
      badge: 'IA Propia ORION · Cerebro de IA NYX en CvStudio33.com.ar',
      sla: 'Inferencia Edge < 180ms · Precisión RAG 99.8%',
      modality: 'Arquitectura Híbrida Propia · Despliegue Cloud & API',
      summary:
        'Desarrollamos e integramos arquitecturas avanzadas impulsadas por nuestro motor propietario ORION IA, el cerebro neural detrás de IA NYX y Tecnología AXON en CvStudio33.com.ar. Construimos agentes autónomos, plataformas SaaS generativas y motores de auditoría semántica en tiempo real.',
      architecture:
        'Orquestación híbrida sobre Cloudflare Workers AI, inferencia distribuida de LLMs de última generación, memoria vectorial en Supabase PostgreSQL (pgvector) para RAG empresarial sin alucinaciones y microservicios en Python (FastAPI) de alta concurrencia.',
      workflowSteps: [
        'Auditoría de datos del negocio y diseño del corpus de conocimiento vectorial (PDFs, catálogos, reglas y bases SQL).',
        'Configuración del núcleo ORION IA con pipelines de validación semántica y cero invención de datos.',
        'Integración por API / Webhooks con WhatsApp Business, plataforma web propia o CRM corporativo.',
        'Pruebas de estrés, calibración de prompts de producción y entrega de panel de telemetría en vivo.'
      ],
      caseStudy:
        'Caso Insignia — CvStudio33.com.ar (IA NYX + AXON): El cerebro neural de ORION IA impulsa a IA NYX para simular algoritmos de reclutadores Fortune 500, realizar ingeniería inversa de Big Data laboral, inyectar Keywords ATS con 99.8% de lectura y operar el NYX Distribution Hub junto a PDF Vault y Tokens NYX.',
      stack: ['ORION IA Brain', 'IA NYX / AXON Arch', 'Python FastAPI', 'Cloudflare Workers AI', 'Supabase pgvector', 'WhatsApp Cloud API', 'OpenAI / Claude / Gemini API'],
      timeline: '1 a 4 semanas según alcance',
      deliverables: [
        'Motor o Agente ORION IA entrenado con las reglas, precios y documentos reales de tu empresa',
        'Integración llave en mano en tu Plataforma Web, SaaS o WhatsApp Oficial 24/7',
        'Base de conocimiento vectorial en Supabase con actualización instantánea de información',
        'Dashboard administrativo para auditar conversaciones, consumo de tokens y conversiones'
      ],
      services: [
        'Integración de nuestro Motor Propio ORION IA en tu Web o App',
        'Chatbots Inteligentes para WhatsApp y Web con Memoria de Negocio (RAG)',
        'Plataformas SaaS con IA Generativa y Economía de Tokens (Estilo CvStudio33.com.ar)',
        'Motores de Auditoría Semántica, Generación de CVs ATS, Contratos y Presupuestos',
        'Lectura Inteligente de Comprobantes, Facturas y Documentos por Visión (OCR + IA)',
        'Asistentes Virtuales de Ventas, Calificación y Agendamiento de Turnos 24/7',
        'Sistemas de Distribución Automatizada y Matching Algorítmico (Estilo AXON)',
        'Agentes Internos de Análisis de Datos, Reportes Ejecutivos y Atención al Cliente'
      ]
    },
    web: {
      code: 'MOD-02 // FULLSTACK-PWA',
      shortTitle: 'Web Apps Nativas & Landings',
      title: 'Desarrollo Web Full-Stack, Landing Pages & Web Apps Nativas (PWA)',
      badge: 'HTML5 · CSS3 Puro · JS/TS · React · Cloudflare Edge',
      sla: 'Google PageSpeed 98–100 · Carga Global < 0.8s',
      modality: 'Código 100% Propio · Cero Plantillas Genéricas',
      summary:
        'Ingeniería de sitios web corporativos, landing pages de conversión extrema y aplicaciones web progresivas (PWA) que se sienten y operan como una app nativa en celulares iOS y Android, con estética de autor y velocidad instantánea.',
      architecture:
        'Arquitectura limpia en HTML5 semántico, CSS3 modular con tokens de diseño y animaciones en GPU a 60 FPS, JavaScript ES6+ / TypeScript / React y distribución global desde más de 300 nodos Edge mediante Cloudflare Pages & CDN.',
      workflowSteps: [
        'Arquitectura de información, wireframing Mobile-First y definición de identidad visual única.',
        'Programación en código limpio con iconografía SVG dibujada a medida y animaciones interactivas.',
        'Optimización técnica de Core Web Vitals, marcado Schema.org JSON-LD (es-AR) y metadatos OpenGraph.',
        'Despliegue en Cloudflare Edge con SSL/TLS estricto, compresión Brotli y pruebas en múltiples dispositivos.'
      ],
      caseStudy:
        'Arquitectura Mobile-First Real: Todas nuestras entregas incluyen navegación táctil ergonómica, instalación directa en pantalla de inicio (PWA), seguridad perimetral Cloudflare y estructura preparada para liderar en Google Argentina.',
      stack: ['HTML5 Semántico', 'CSS3 GPU Animations', 'JavaScript ES6+', 'TypeScript', 'React / Next.js', 'Tailwind CSS', 'Cloudflare Pages', 'PWA Service Workers'],
      timeline: '1 a 4 semanas',
      deliverables: [
        'Plataforma web o Landing Page de diseño exclusivo responsive para celulares, tablets y monitores 4K',
        'Sistema de animaciones en código puro e iconografía vectorial SVG personalizada',
        'Configuración completa de DNS, certificado SSL/TLS, firewall WAF y CDN en Cloudflare',
        'SEO Técnico para Argentina (Schema.org JSON-LD, Sitemap XML, robots.txt y Google Search Console)'
      ],
      services: [
        'Landing Pages de Alta Conversión y Velocidad Extrema',
        'Web Apps Progresivas (PWA) Instalables en Celulares iOS y Android',
        'Sitios Web Corporativos e Institucionales de Alta Gama',
        'Plataformas Web Interactivas y Arquitecturas SaaS Completas',
        'Portales de Clientes con Bóveda de Documentos (PDF Vault) y Panel Privado',
        'Catálogos Digitales Dinámicos con Filtros Instantáneos',
        'Micrositios de Lanzamiento con Animaciones 3D y SVG en Código Puro',
        'Rediseño Integral y Modernización de Sitios Web Obsoletos'
      ]
    },
    cloud_db: {
      code: 'MOD-03 // EDGE-CLOUD-DB',
      shortTitle: 'Cloudflare, Supabase & Firebase',
      title: 'Cloudflare Edge, Serverless Workers, Firebase & Supabase',
      badge: 'Cloudflare · Workers · Supabase · Firebase · PostgreSQL',
      sla: 'Disponibilidad 99.99% · Escalado Automático Serverless',
      modality: 'Infraestructura Moderna sin Servidores Lentos',
      summary:
        'Diseñamos y administramos la infraestructura en la nube de tu software: ejecución serverless en el borde con Cloudflare Workers, bases de datos PostgreSQL en tiempo real con Supabase y sincronización instantánea con Google Firebase.',
      architecture:
        'Red global Anycast de Cloudflare (DNS, WAF Anti-DDoS, Workers, R2 Object Storage y D1) acoplada a Supabase (PostgreSQL, Row Level Security, Auth, Realtime y Edge Functions) y Firebase (Firestore, Cloud Messaging y Hosting).',
      workflowSteps: [
        'Modelado relacional de base de datos PostgreSQL / Firestore y políticas de seguridad por fila (RLS).',
        'Desarrollo de endpoints y microservicios de ultra-baja latencia sobre Cloudflare Workers.',
        'Implementación de autenticación segura (OAuth2 con Google/Apple, JWT, Magic Links y roles).',
        'Configuración de backups automáticos, almacenamiento en la nube (R2/Storage) y blindaje Anti-DDoS.'
      ],
      caseStudy:
        'Escalabilidad Financiera y Técnica: Permite operar plataformas con miles de usuarios concurrentes (como sistemas de tokens, bóvedas de archivos y paneles de afiliados) con latencia mínima y costos operativos optimizados.',
      stack: ['Cloudflare DNS & WAF', 'Cloudflare Workers', 'Supabase PostgreSQL', 'Google Firebase', 'Cloudflare R2 Storage', 'Row Level Security (RLS)', 'OAuth2 / JWT Auth', 'WebSockets Realtime'],
      timeline: '1 a 3 semanas',
      deliverables: [
        'Base de datos en producción sobre Supabase (PostgreSQL) o Firebase estructurada y blindada',
        'Sistema completo de autenticación de usuarios, sesiones seguras y control de permisos por rol',
        'APIs Serverless en Cloudflare Workers respondiendo desde el nodo más cercano al usuario',
        'Almacenamiento seguro en la nube para PDFs, imágenes y activos digitales con CDN'
      ],
      services: [
        'Arquitectura y Despliegue en Cloudflare & Cloudflare Workers',
        'Bases de Datos Relacionales en Tiempo Real con Supabase (PostgreSQL)',
        'Backend Serverless y Sincronización Viva con Google Firebase',
        'Sistemas de Autenticación Segura (Google, Email, Roles, Tokens y Permisos)',
        'Bóvedas de Almacenamiento Seguro de Archivos y PDFs (Cloudflare R2 / Supabase Storage)',
        'Blindaje Cibernético Anti-DDoS, Firewall WAF y Reglas de Seguridad en el Borde',
        'Migración de Hosting Tradicional Lento a Infraestructura Cloud Moderna',
        'Sincronización Instantánea de Estado entre Dispositivos Móviles y Web'
      ]
    },
    systems: {
      code: 'MOD-04 // CUSTOM-ERP-CRM',
      shortTitle: 'Sistemas CRM, Stock & Gestión',
      title: 'Software de Gestión a Medida (CRM, Turnos, Stock & Paneles Admin)',
      badge: 'Sistemas Web · CRM · Inventario · Comisiones & Paneles',
      sla: 'Cero Costo por Licencia · 100% Propiedad del Cliente',
      modality: 'Software a Medida Multiusuario · Web & Celular',
      summary:
        'Construimos el sistema administrativo, comercial o de gestión exacto que necesita tu empresa: control de stock, ventas, CRM de clientes, agendas de turnos, paneles de comisiones de vendedores y generación automática de PDFs.',
      architecture:
        'Aplicación web privada de alto rendimiento conectada a PostgreSQL en Supabase, motor de cálculo en servidor, exportación nativa a PDF/Excel, auditoría de movimientos por empleado y alertas automáticas por WhatsApp.',
      workflowSteps: [
        'Relevamiento del flujo operativo actual para eliminar planillas desconectadas y tareas repetitivas.',
        'Construcción de módulos a medida (clientes, inventario, caja, turnos, comisiones o afiliados).',
        'Programación de reportes gerenciales en vivo y generador de comprobantes/presupuestos en PDF.',
        'Capacitación del equipo, migración de datos iniciales y puesta en marcha en la nube.'
      ],
      caseStudy:
        'Sistemas de Comisiones y Paneles de Ventas: Desarrollamos desde CRMs corporativos hasta paneles de partners con lógica algorítmica avanzada (como el "Sistema de la 5ta Venta" con liquidación automática de hasta 80% de comisión).',
      stack: ['React / TypeScript', 'Supabase PostgreSQL', 'Python Backend', 'Cloudflare Workers', 'Motor PDF Dinámico', 'Reportes Excel/CSV', 'Integración ARCA / AFIP'],
      timeline: '2 a 6 semanas',
      deliverables: [
        'Sistema web autoadministrable accesible desde celular o PC con niveles de acceso por usuario',
        'Módulos personalizados de ventas, clientes (CRM), inventario, caja o liquidación de comisiones',
        'Generador instantáneo de presupuestos, remitos, reportes y documentos PDF con identidad de marca',
        'Código y sistema 100% propio sin mensualidades por cantidad de empleados ni límites artificiales'
      ],
      services: [
        'Sistemas de Gestión Comercial, Ventas, Caja y Control de Stock',
        'CRM a Medida para Seguimiento de Leads, Clientes y Equipos de Ventas',
        'Paneles de Partners, Afiliados y Liquidación Automática de Comisiones',
        'Sistemas de Turnos Online y Reservas con Recordatorios por WhatsApp',
        'Generadores Automáticos de Presupuestos, Recibos y Documentos PDF',
        'Dashboards Gerenciales con Métricas Financieras y Operativas en Vivo',
        'Software Específico para Inmobiliarias, Clínicas, Estudios y Distribuidoras',
        'Portales Mayoristas (B2B) con Listas de Precios Diferenciadas por Cliente'
      ]
    },
    ecommerce: {
      code: 'MOD-05 // ECOMMERCE-PAY',
      shortTitle: 'E-Commerce, Pagos & Tokens',
      title: 'Tiendas Online E-Commerce, Pasarelas de Pago & Economía de Tokens',
      badge: 'E-Commerce · Mercado Pago · Suscripciones · Tokens Digitales',
      sla: 'Checkout < 25s · 0% Comisiones de Plataforma Externa',
      modality: 'Tienda Propia + Cobros Automatizados por Webhook',
      summary:
        'Desarrollamos tiendas online de alta velocidad, plataformas de venta de servicios digitales, sistemas de créditos/tokens recargables y membresías recurrentes integradas con Mercado Pago, transferencia bancaria y pasarelas globales.',
      architecture:
        'Catálogo reactivo con filtros en memoria, carrito persistente en local/nube, integración vía API y Webhooks firmados con Mercado Pago (Checkout Pro / Transparente / Suscripciones), Stripe y acreditación automática en base de datos.',
      workflowSteps: [
        'Diseño del catálogo, fichas de producto/servicio y embudo de checkout rápido pensado para celulares.',
        'Integración oficial de pasarelas de pago (Mercado Pago, transferencias, Stripe o USDT) con validación Webhook.',
        'Configuración de acreditación automática (pedidos físicos, descargas digitales o recarga de Tokens).',
        'Entrega de panel de administración para gestionar precios, stock, cupones y estados de envío.'
      ],
      caseStudy:
        'Monetización Híbrida y Economía de Tokens: Además de tiendas físicas y mayoristas, implementamos sistemas de créditos digitales (como la Economía de Tokens NYX en CvStudio33.com.ar) con acreditación instantánea tras el pago.',
      stack: ['Mercado Pago API & Webhooks', 'JavaScript / React', 'Supabase PostgreSQL', 'Cloudflare Edge', 'Stripe API', 'WhatsApp Order Engine', 'Pasarela USDT'],
      timeline: '2 a 5 semanas',
      deliverables: [
        'Tienda online o plataforma de monetización completa sin pagar comisiones por venta a terceros',
        'Cobros automatizados con Mercado Pago, tarjetas, dinero en cuenta, transferencia o Stripe',
        'Panel de control para administrar productos, precios masivos, cupones de descuento y clientes',
        'Acreditación instantánea de compras y notificaciones automáticas por WhatsApp y correo'
      ],
      services: [
        'Tiendas Online E-Commerce a Medida sin Comisiones por Venta',
        'Integración Completa de Mercado Pago (Checkout Pro, API, QR y Webhooks)',
        'Sistemas de Economía de Créditos y Tokens Recargables para Plataformas SaaS',
        'Plataformas de Membresías VIP, Cursos Online y Suscripciones Recurrentes',
        'Catálogos Interactivos con Carrito de Pedidos Directo a WhatsApp',
        'Venta Automatizada de Productos Digitales, Licencias y Descargas',
        'Pasarelas de Pago Internacionales (Stripe, PayPal y Criptomonedas USDT)',
        'Optimización de Embudo de Checkout Móvil para Maximizar Ventas'
      ]
    },
    mobile: {
      code: 'MOD-06 // MOBILE-APPS',
      shortTitle: 'Apps Móviles Android / iOS',
      title: 'Aplicaciones Móviles para Celulares (Android, iOS & Web-Apps)',
      badge: 'Apps Celulares · Android · iOS · Flutter · PWA Nativa',
      sla: '60 FPS Táctiles · Sincronización Cloud en Tiempo Real',
      modality: 'Desarrollo Multiplataforma & PWA Instalable',
      summary:
        'Creamos aplicaciones móviles diseñadas específicamente para la ergonomía del celular, con navegación táctil inferior, notificaciones push, lectura de cámara/QR, geolocalización y sincronización en vivo con la nube.',
      architecture:
        'Construcción multiplataforma mediante Flutter, React Native o PWA Nativa de alto rendimiento, respaldada por Firebase Cloud Messaging, Supabase Realtime y almacenamiento local offline-first.',
      workflowSteps: [
        'Prototipado interactivo de pantallas móviles respetando áreas seguras táctiles (iOS & Android).',
        'Desarrollo de módulos móviles (login biométrico/social, cámara, QR, mapas GPS y notificaciones).',
        'Conexión en tiempo real con el backend en Supabase/Firebase y panel web administrativo.',
        'Empaquetado, pruebas en dispositivos físicos y despliegue directo o en tiendas de aplicaciones.'
      ],
      caseStudy:
        'Experiencia Nativa Inmediata: Combinamos lo mejor de las aplicaciones nativas con el despliegue instantáneo en la nube para que tus clientes o empleados operen desde cualquier teléfono sin demoras.',
      stack: ['Flutter', 'React Native', 'PWA Instalable', 'Firebase Cloud Messaging', 'Supabase Realtime', 'Android & iOS SDK', 'Cámara / QR / GPS API'],
      timeline: '2 a 6 semanas',
      deliverables: [
        'Aplicación móvil completa con interfaz moderna, fluida y adaptada a todos los tamaños de celular',
        'Base de datos en la nube sincronizada en tiempo real con panel de control web centralizado',
        'Integración de funciones nativas: notificaciones, cámara, escáner QR y geolocalización',
        'Instalador directo optimizado y soporte para publicación en tiendas móviles'
      ],
      services: [
        'Aplicaciones Móviles Nativas y Multiplataforma para Android e iOS',
        'Web Apps Nativas (PWA) Instalables en 1 Clic desde el Navegador Móvil',
        'Apps de Pedidos, Reservas, Catálogo y Fidelización de Clientes',
        'Apps Operativas en Campo para Repartidores, Vendedores o Técnicos',
        'Apps con Escáner de Códigos QR, Credenciales Digitales y Control de Acceso',
        'Apps de Comunidades, Eventos y Plataformas Educativas Móviles',
        'Desarrollo Rápido de MVP Móvil para Startups y Nuevos Negocios',
        'Sincronización Instantánea entre App Móvil y Sistema Web Central'
      ]
    },
    python_auto: {
      code: 'MOD-07 // PYTHON-AUTOMATION',
      shortTitle: 'Python, Bots, APIs & Scraping',
      title: 'Automatización con Python, Bots, APIs & Procesamiento de Datos',
      badge: 'Python · Bots · APIs REST · Web Scraping · Cron Workers',
      sla: 'Ejecución 24/7 Desatendida · Ahorro Operativo > 85%',
      modality: 'Scripts en la Nube, Microservicios & Conectores API',
      summary:
        'Desarrollamos motores en Python, bots inteligentes y conectores de APIs que ejecutan automáticamente en segundos las tareas operativas que a tu equipo le consumen horas: extracción de datos, sincronización de sistemas y envíos masivos.',
      architecture:
        'Microservicios en Python 3 (FastAPI, Playwright, Pandas, AsyncIO) y Cloudflare Cron Workers ejecutados por agenda o Webhooks, integrando bases PostgreSQL, Google Sheets, WhatsApp, Telegram y portales externos.',
      workflowSteps: [
        'Mapeo del proceso manual actual e identificación de las fuentes de datos, APIs o sitios a conectar.',
        'Programación del motor en Python / Cloudflare Workers con manejo de errores y reintentos automáticos.',
        'Integración de salidas (actualización de base de datos, planillas, envío de reportes o alertas).',
        'Despliegue en ejecución programada 24/7 con panel de logs y monitoreo de estado.'
      ],
      caseStudy:
        'Motores de Distribución y Big Data: En proyectos como el NYX Distribution Hub (AXON), nuestros pipelines automatizados procesan perfiles, analizan datos del mercado y ejecutan flujos de distribución inteligente sin intervención humana.',
      stack: ['Python 3.12', 'FastAPI / AsyncIO', 'Cloudflare Cron Workers', 'Playwright / BeautifulSoup', 'Pandas / Data Pipelines', 'REST APIs & Webhooks', 'Google Workspace API'],
      timeline: '1 a 3 semanas',
      deliverables: [
        'Motor de automatización, bot o API funcionando 24/7 en la nube sin requerir intervención manual',
        'Interconexión segura entre tus plataformas (Web, CRM, WhatsApp, Mercado Pago, Google Sheets)',
        'Sistema de registro de ejecuciones (Logs) y alertas automáticas ante eventos clave',
        'Código fuente en Python / JS optimizado, limpio y documentado'
      ],
      services: [
        'Scripts y Motores de Automatización Operativa a Medida en Python',
        'Desarrollo, Documentación e Integración de APIs REST y Webhooks',
        'Web Scraping Avanzado y Monitoreo Automático de Precios y Competencia',
        'Procesamiento y Limpieza Masiva de Archivos Excel, CSV, JSON y PDFs',
        'Bots Automatizados para WhatsApp, Telegram y Discord con Comandos Propios',
        'Sincronización Bidireccional con Google Sheets, Nocodb, Airtable y CRMs',
        'Generación y Despacho Programado de Reportes Ejecutivos Diarios',
        'Motores Algorítmicos de Matching, Scoring y Distribución de Datos'
      ]
    },
    uiux_seo: {
      code: 'MOD-08 // UIUX-SVG-SEO-AR',
      shortTitle: 'UI/UX, Iconos SVG & SEO AR',
      title: 'Diseño UI/UX Moderno, Animaciones SVG/CSS & SEO Técnico Argentina',
      badge: 'Diseño de Autor · SVG Vectorial · Animaciones 3D/CSS · SEO AR',
      sla: 'Core Web Vitals Verde · Arquitectura SEO Schema.org',
      modality: 'Ingeniería Visual en Código Puro + Posicionamiento Google',
      summary:
        'Elevamos la autoridad de tu marca con interfaces blancas de alta precisión, iconografía vectorial SVG dibujada a medida, animaciones 3D y glitch en código puro que no pesan ni colapsan el navegador, y SEO técnico para dominar en Google Argentina.',
      architecture:
        'Sistemas de diseño basados en CSS Custom Properties, gráficos SVG multicapa con gradientes y trazos animados, coreografía de scroll con IntersectionObserver y estructuración semántica JSON-LD para buscadores y motores de IA.',
      workflowSteps: [
        'Auditoría visual, de velocidad y de posicionamiento actual frente a los competidores en Argentina.',
        'Creación de sistema de diseño propio, paleta cromática de alto contraste e iconografía SVG exclusiva.',
        'Implementación de micro-interacciones y animaciones en código puro aceleradas por hardware (GPU).',
        'Indexación técnica completa: Schema.org local, optimización de palabras clave y Core Web Vitals.'
      ],
      caseStudy:
        'Estética Anti-Plantilla: Eliminamos el aspecto genérico de las webs comunes mediante geometría limpia, tipografía técnica equilibrada y animaciones de compilación en vivo que retienen la atención del usuario.',
      stack: ['CSS3 Design Tokens', 'SVG Vectorial Multicapa', 'Animaciones 3D & Glitch GPU', 'SEO Técnico es-AR', 'Schema.org JSON-LD', 'Google Search Console', 'Core Web Vitals 100'],
      timeline: '1 a 3 semanas',
      deliverables: [
        'Interfaz UI/UX única con sistema de tokens visuales, tipografía moderna e iconos SVG propios',
        'Paquete de animaciones interactivas en código puro (60 FPS en celulares y escritorio)',
        'Implementación completa de SEO Técnico para Argentina (JSON-LD, Meta Tags, Sitemap y Velocidad)',
        'Optimización de arquitectura de conversión (CRO) para transformar visitas en clientes reales'
      ],
      services: [
        'Diseño de Interfaces Web y Mobile de Autor (UI/UX Anti-Genérico)',
        'Creación de Iconografía Vectorial SVG Multicapa y Animaciones en Código Puro',
        'Posicionamiento SEO Técnico Avanzado para Google Argentina (es-AR)',
        'Optimización Extrema de Velocidad y Core Web Vitals (95–100 Puntos)',
        'Ingeniería de Conversión (CRO) para Multiplicar Consultas y Ventas',
        'Vectorización, Animación e Integración Responsive de Logos Corporativos',
        'Auditoría Técnica, Refactorización de Código y Rescate de Proyectos Web',
        'Mantenimiento Evolutivo, Seguridad Continua y Nuevas Funcionalidades'
      ]
    }
  };

  /**
   * 1. HEADER SCROLL SHADOW
   */
  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    window.addEventListener(
      'scroll',
      () => {
        header.classList.toggle('is-scrolled', window.scrollY > 10);
      },
      { passive: true }
    );
  }

  /**
   * 2. FILTRADO EN VIVO DE SERVICIOS
   */
  function initServicesExplorer() {
    const searchInput = document.getElementById('service-search-input');
    const chipBtns = document.querySelectorAll('[data-filter-cat]');
    const cards = document.querySelectorAll('.service-category-card');
    const countBadge = document.getElementById('services-count-badge');
    const emptyState = document.getElementById('services-empty-state');

    if (!cards.length) return;

    let activeCategory = 'all';
    let searchQuery = '';

    function applyFilter() {
      let visibleCategories = 0;
      let visibleSubservices = 0;
      const q = searchQuery.trim().toLowerCase();

      cards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        const textContent = card.textContent.toLowerCase();
        const matchesCat = activeCategory === 'all' || cat === activeCategory;
        const matchesQuery = !q || textContent.includes(q);

        const isVisible = matchesCat && matchesQuery;
        card.style.display = isVisible ? 'flex' : 'none';

        if (isVisible) {
          visibleCategories++;
          const pills = card.querySelectorAll('.subservice-pill');
          pills.forEach((pill) => {
            const pillMatch = !q || pill.textContent.toLowerCase().includes(q);
            pill.style.opacity = pillMatch ? '1' : '0.45';
            if (pillMatch) visibleSubservices++;
          });
        }
      });

      if (countBadge) {
        countBadge.textContent = q
          ? `${visibleCategories} áreas · ${visibleSubservices} resultados`
          : `${visibleCategories} áreas · 64 servicios detallados`;
      }

      if (emptyState) {
        emptyState.style.display = visibleCategories === 0 ? 'block' : 'none';
      }
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        applyFilter();
      });
    }

    chipBtns.forEach((chip) => {
      chip.addEventListener('click', () => {
        chipBtns.forEach((c) => c.classList.remove('is-active'));
        chip.classList.add('is-active');
        activeCategory = chip.getAttribute('data-filter-cat') || 'all';
        applyFilter();
      });
    });

    const resetBtn = document.getElementById('reset-services-filter');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        activeCategory = 'all';
        searchQuery = '';
        if (searchInput) searchInput.value = '';
        chipBtns.forEach((c) => c.classList.toggle('is-active', c.getAttribute('data-filter-cat') === 'all'));
        applyFilter();
      });
    }
  }

  /**
   * 2B. CONSOLA INTERACTIVA COMPACTA DE SERVICIOS EN INDEX.HTML
   * Evita el scroll infinito en móvil metiendo las 8 divisiones y sus 64
   * servicios dentro de un único cuadro de mando interactivo y moderno.
   */
  function initCompactServicesConsole() {
    const consoleRoot = document.getElementById('orion-services-console');
    if (!consoleRoot) return;

    const tabs = consoleRoot.querySelectorAll('[data-console-tab]');
    const codeEl = document.getElementById('console-active-code');
    const titleEl = document.getElementById('console-active-title');
    const badgeEl = document.getElementById('console-active-badge');
    const summaryEl = document.getElementById('console-active-summary');
    const archEl = document.getElementById('console-active-arch');
    const slaEl = document.getElementById('console-active-sla');
    const deliverablesEl = document.getElementById('console-active-deliverables');
    const subservicesEl = document.getElementById('console-active-subservices');
    const timelineEl = document.getElementById('console-active-timeline');
    const modalBtn = document.getElementById('console-open-modal-btn');
    const quoteBtn = document.getElementById('console-quote-btn');

    function renderConsoleCategory(catKey) {
      const data = ORION_SERVICES_DB[catKey];
      if (!data) return;

      tabs.forEach((t) => {
        const isCurrent = t.getAttribute('data-console-tab') === catKey;
        t.classList.toggle('is-active', isCurrent);
        t.setAttribute('aria-selected', isCurrent ? 'true' : 'false');
      });

      if (codeEl) codeEl.textContent = data.code;
      if (titleEl) titleEl.textContent = data.title;
      if (badgeEl) badgeEl.textContent = data.badge;
      if (summaryEl) summaryEl.textContent = data.summary;
      if (archEl) archEl.textContent = data.architecture;
      if (slaEl) slaEl.textContent = `${data.sla} · ${data.modality}`;
      if (timelineEl) timelineEl.textContent = `Entrega estimada: ${data.timeline}`;

      if (deliverablesEl) {
        deliverablesEl.innerHTML = data.deliverables
          .map(
            (item) =>
              `<li><span style="color:var(--brand-emerald);font-weight:800;">✓</span><span>${item}</span></li>`
          )
          .join('');
      }

      if (subservicesEl) {
        subservicesEl.innerHTML = data.services
          .map(
            (srv) =>
              `<button type="button" class="subservice-pill" data-open-service="${catKey}" data-service-name="${srv}">${srv}</button>`
          )
          .join('');
      }

      if (modalBtn) {
        modalBtn.setAttribute('data-open-service', catKey);
      }

      if (quoteBtn) {
        quoteBtn.setAttribute(
          'href',
          `contacto.html?servicio=${encodeURIComponent(data.title)}#cotizador`
        );
      }
    }

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const key = tab.getAttribute('data-console-tab') || 'orion_ai';
        renderConsoleCategory(key);
      });
    });

    renderConsoleCategory('orion_ai');
  }

  /**
   * 3. MODAL / BOTTOM-SHEET DE FICHA TÉCNICA DE INGENIERÍA EXHAUSTIVA
   */
  function openServiceModal(categoryKey, specificServiceName) {
    const modal = document.getElementById('service-detail-modal');
    if (!modal) return;

    const data = ORION_SERVICES_DB[categoryKey];
    if (!data) return;

    const codeEl = modal.querySelector('#modal-service-code');
    const titleEl = modal.querySelector('#modal-service-title');
    const badgeEl = modal.querySelector('#modal-service-badge');
    const slaEl = modal.querySelector('#modal-service-sla');
    const modalityEl = modal.querySelector('#modal-service-modality');
    const summaryEl = modal.querySelector('#modal-service-summary');
    const archEl = modal.querySelector('#modal-service-arch');
    const workflowEl = modal.querySelector('#modal-service-workflow');
    const caseEl = modal.querySelector('#modal-service-case');
    const deliverablesEl = modal.querySelector('#modal-service-deliverables');
    const stackEl = modal.querySelector('#modal-service-stack');
    const timelineEl = modal.querySelector('#modal-service-timeline');
    const subservicesEl = modal.querySelector('#modal-service-all');
    const quoteBtn = modal.querySelector('#modal-quote-btn');

    const activeHeadline = specificServiceName
      ? `${specificServiceName}`
      : data.title;

    if (codeEl) codeEl.textContent = data.code || 'ORION-SPEC // 0x33';
    if (titleEl) titleEl.textContent = activeHeadline;
    if (badgeEl) badgeEl.textContent = data.badge;
    if (slaEl) slaEl.textContent = data.sla || 'SLA 99.99% Edge';
    if (modalityEl) modalityEl.textContent = data.modality || 'Código 100% Propio';
    if (summaryEl) {
      summaryEl.textContent = specificServiceName
        ? `Especificación técnica oficial para "${specificServiceName}": ${data.summary}`
        : data.summary;
    }
    if (archEl) archEl.textContent = data.architecture;
    if (caseEl) caseEl.textContent = data.caseStudy;
    if (timelineEl) timelineEl.textContent = data.timeline;

    if (workflowEl && Array.isArray(data.workflowSteps)) {
      workflowEl.innerHTML = data.workflowSteps
        .map(
          (step, idx) =>
            `<li class="spec-workflow-item"><span class="spec-workflow-num">0${idx + 1}</span><span>${step}</span></li>`
        )
        .join('');
    }

    if (deliverablesEl) {
      deliverablesEl.innerHTML = data.deliverables
        .map(
          (item) =>
            `<li style="margin-bottom:0.5rem;display:flex;gap:0.55rem;align-items:flex-start;"><span style="color:var(--brand-emerald);font-weight:800;">✓</span><span>${item}</span></li>`
        )
        .join('');
    }

    if (stackEl) {
      stackEl.innerHTML = data.stack
        .map((tech) => `<span class="subservice-pill" style="cursor:default;">${tech}</span>`)
        .join('');
    }

    if (subservicesEl) {
      subservicesEl.innerHTML = data.services
        .map((srv) => {
          const isSelected = specificServiceName && srv === specificServiceName;
          const highlight = isSelected
            ? 'background:var(--brand-blue);color:#FFFFFF;border-color:var(--brand-blue);'
            : '';
          return `<button type="button" class="subservice-pill" data-open-service="${categoryKey}" data-service-name="${srv}" style="${highlight}">${srv}</button>`;
        })
        .join('');
    }

    if (quoteBtn) {
      const encoded = encodeURIComponent(specificServiceName || data.title);
      quoteBtn.setAttribute('href', `contacto.html?servicio=${encoded}#cotizador`);
    }

    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeServiceModal() {
    const modal = document.getElementById('service-detail-modal');
    if (!modal) return;
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function initServiceModals() {
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-open-service]');
      if (trigger) {
        const cat = trigger.getAttribute('data-open-service');
        const specific = trigger.getAttribute('data-service-name') || '';
        openServiceModal(cat, specific);
        return;
      }

      if (e.target.matches('[data-close-modal]') || e.target.classList.contains('modal-backdrop')) {
        closeServiceModal();
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeServiceModal();
    });
  }

  /**
   * 4. COTIZADOR INTERACTIVO EN CONTACTO (contacto.html)
   */
  function initQuoteCalculator() {
    const form = document.getElementById('orion-quote-form');
    if (!form) return;

    const params = new URLSearchParams(window.location.search);
    const preselectedService = params.get('servicio');
    const customServiceNotice = document.getElementById('preselected-service-banner');
    const messageArea = document.getElementById('quote-details');

    if (preselectedService) {
      if (customServiceNotice) {
        customServiceNotice.style.display = 'flex';
        const span = customServiceNotice.querySelector('strong');
        if (span) span.textContent = preselectedService;
      }
      if (messageArea && !messageArea.value) {
        messageArea.value = `Hola OrionCodeLabs33, quiero cotizar: ${preselectedService}. `;
      }
    }

    const summaryOutput = document.getElementById('quote-live-summary');
    const checkboxes = form.querySelectorAll('input[name="services"]');

    function updateLiveSummary() {
      if (!summaryOutput) return;
      const selected = Array.from(checkboxes)
        .filter((cb) => cb.checked)
        .map((cb) => cb.value);

      if (selected.length === 0) {
        summaryOutput.textContent = preselectedService
          ? `Servicio seleccionado: ${preselectedService}`
          : 'Seleccioná arriba uno o más módulos para armar tu cotización a medida.';
      } else {
        summaryOutput.textContent = `Módulos incluidos (${selected.length}): ${selected.join(' + ')}`;
      }
    }

    checkboxes.forEach((cb) => cb.addEventListener('change', updateLiveSummary));
    updateLiveSummary();

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = (form.querySelector('#quote-name')?.value || '').trim();
      const company = (form.querySelector('#quote-company')?.value || '').trim();
      const contact = (form.querySelector('#quote-contact')?.value || '').trim();
      const timeline = form.querySelector('#quote-timeline')?.value || 'A definir';
      const details = (form.querySelector('#quote-details')?.value || '').trim();
      const selected = Array.from(checkboxes)
        .filter((cb) => cb.checked)
        .map((cb) => cb.value);

      const feedbackBox = document.getElementById('quote-form-feedback');
      if (feedbackBox) {
        feedbackBox.style.display = 'block';
        const modulesText = selected.join(', ') || preselectedService || 'Desarrollo a Medida';
        feedbackBox.innerHTML = `
          <div style="padding:1.25rem;border-radius:var(--radius-md);background:#F0FDF4;border:1px solid #86EFAC;color:#064E3B;">
            <strong style="display:block;margin-bottom:0.35rem;font-size:var(--text-sm);">✓ Propuesta Técnica Lista para Enviar (#OCL-33)</strong>
            <p style="font-size:var(--text-xs);margin-bottom:0.85rem;color:#065F46;">
              <strong>${name}</strong>${company ? ` (${company})` : ''}, armamos tu resumen técnico: <strong>${modulesText}</strong> · Plazo: ${timeline}. Elegí por dónde enviarlo ahora mismo:
            </p>
            <div style="display:flex;flex-wrap:wrap;gap:0.65rem;">
              <a class="btn btn-primary btn-sm" target="_blank" rel="noopener" href="https://wa.me/5491100000033?text=${encodeURIComponent(
                `Hola OrionCodeLabs33! Soy ${name}${company ? ' de ' + company : ''}.\nQuiero cotizar: ${modulesText}\nPlazo: ${timeline}\nMi contacto: ${contact}\nDetalles: ${details}`
              )}">Enviar Cotización por WhatsApp</a>
              <a class="btn btn-secondary btn-sm" href="mailto:contacto@orioncodelabs33.com.ar?subject=${encodeURIComponent(
                'Cotización OrionCodeLabs33 — ' + (company || name)
              )}&body=${encodeURIComponent(
                `Nombre: ${name}\nEmpresa: ${company}\nContacto: ${contact}\nServicios: ${modulesText}\nPlazo: ${timeline}\nDetalle:\n${details}`
              )}">Enviar por Email</a>
            </div>
          </div>
        `;
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initServicesExplorer();
    initCompactServicesConsole();
    initServiceModals();
    initQuoteCalculator();
  });
})();
