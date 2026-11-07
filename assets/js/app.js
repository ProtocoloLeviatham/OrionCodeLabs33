/**
 * ==========================================================================
 * OrionCodeLabs33 v3 — Core Application Controller, Problem/Solution Specs,
 * Sticky Modal v2 & ORION 2-Option Dock Popover
 * Archivo: assets/js/app.js
 * ==========================================================================
 */

(function () {
  'use strict';

  const ORION_SERVICES_DB = {
    orion_ai: {
      code: 'MOD-01 // ORION-AI-CORE',
      shortTitle: 'IA Propia "ORION" & Bots 24/7',
      title: 'Inteligencia Artificial Propia "ORION IA", Agentes de Ventas 24/7 & Automatización',
      badge: 'IA Propia ORION · Qwen 3.8 + QLoRA en NVIDIA 40GB · Cerebro de CvStudio33',
      sla: 'Respuestas en < 1 segundo · Autoaprendizaje Nocturno 24/7',
      modality: 'Llave en Mano · Conectado a tu Web, WhatsApp y Sistemas',
      problem:
        '¿Perdés ventas porque tardás en contestar WhatsApp o mensajes a la noche y los fines de semana, o porque los bots comunes responden como robots sin entender a tu cliente?',
      solution:
        'Conectamos nuestra propia Inteligencia Artificial ORION IA (creada sobre Qwen 3.8 con método QLoRA en servidores NVIDIA de 40GB) entrenada con tus precios, catálogo y forma de vender para atender, cotizar y cerrar ventas las 24 horas.',
      summary:
        'Transformamos tu atención al cliente y tus operaciones con nuestro motor propietario ORION IA: el mismo cerebro neural que impulsa a IA NYX en CvStudio33.com.ar (que alcanzó +200k seguidores en TikTok, +15.000 visitas web y una valuación SaaS de +5.000 USD en su primer mes de lanzamiento). Aprende cada noche y se adapta 100% a tu negocio.',
      architecture:
        'Motor ORION IA basado en Qwen 3.8 (Hugging Face) optimizado con adaptadores QLoRA en GPU NVIDIA de 40GB, conectado a Cloudflare Workers y memoria vectorial en Supabase PostgreSQL para responder al instante sin inventar datos.',
      workflowSteps: [
        'Cargamos tus precios, catálogo, preguntas frecuentes y argumentos reales de venta.',
        'Afinamos tu agente o módulo con nuestro cerebro ORION IA y memoria segura.',
        'Lo integramos en tu WhatsApp Business Oficial, página web o plataforma SaaS.',
        'Tu negocio atiende en menos de 1 segundo, califica clientes y vende en automático 24/7.'
      ],
      caseStudy:
        'Caso de Éxito Real — CvStudio33.com.ar (Métricas del 1er Mes de Lanzamiento): Nuestro cerebro ORION IA potencia a IA NYX, AXON y su portal de empleo en alianza con Jooble y Adzuna, alcanzando en su primer mes de ser lanzado +200k en TikTok, +15.000 visitas web, +1.000 CVs creados, +1.000 USD en compras web, +200 contratados y una valorización SaaS que ronda los +5.000 USD.',
      stack: ['ORION IA (Qwen 3.8 + QLoRA)', 'NVIDIA 40GB GPU', 'IA NYX / AXON Arch', 'Python FastAPI', 'Cloudflare Workers', 'Supabase Vector RAG', 'WhatsApp Cloud API'],
      timeline: 'Según agenda y volumen de código (3 a 15 días máximo)',
      deliverables: [
        'Agente o motor ORION IA entrenado con tus precios, productos y reglas comerciales reales',
        'Conexión directa a tu WhatsApp Oficial o sitio web para atender, cotizar y vender 24/7',
        'Panel de control claro para supervisar conversaciones, clientes interesados y ventas',
        'Actualización continua y soporte directo para sumar promociones o nuevas funciones'
      ],
      services: [
        'Asistente de Ventas por WhatsApp y Web que Atiende 24/7 con ORION IA',
        'Plataformas Web SaaS con IA y Venta de Créditos/Tokens (Como CvStudio33.com.ar)',
        'Creación Automática de Presupuestos, Contratos y CVs Inteligentes',
        'Lectura Automática de Comprobantes de Pago, Facturas y PDFs con IA',
        'Agendamiento Automático de Turnos y Calificación de Clientes',
        'Portales de Empleo o Directorios Inteligentes (Estilo Alianza Jooble & Adzuna)',
        'Integración de Nuestro Motor ORION IA en tu Sistema Actual',
        'Automatización de Respuestas en Instagram, Web y WhatsApp Business'
      ]
    },
    web: {
      code: 'MOD-02 // FULLSTACK-PWA',
      shortTitle: 'Páginas Web & Web Apps',
      title: 'Diseño de Páginas Web Vendedoras, Landing Pages & Web Apps Nativas',
      badge: 'Impacto en 5 Segundos · Carga Instantánea · Perfecta en Todo Celular',
      sla: 'Puntaje Google 98–100 · Diseñada con Psicología de Conversión (CRO)',
      modality: '100% A Medida · Código Propio sin Plantillas Genéricas',
      problem:
        '¿Sentís que la gente entra a tu web o tus redes, mira 5 segundos y se va sin preguntarte ni comprarte porque la página tarda en cargar, se ve corrida en el celular o no transmite confianza?',
      solution:
        'Diseñamos una página web o Web App con estética única, textos gancho persuasivos y navegación fluida de aplicación móvil que atrapa al visitante en los primeros 5 segundos y lo lleva directo a comprarte o hablarte.',
      summary:
        'Creamos páginas web corporativas, landing pages de alta conversión y plataformas completas que funcionan con la suavidad de una app nativa en cualquier celular, combinando ingeniería limpia, SEO para Google y ganchos comerciales reales.',
      architecture:
        'Arquitectura frontend en HTML5 semántico, CSS3 con aceleración por hardware, JavaScript/TypeScript y despliegue global en la red Edge de Cloudflare (<15ms de latencia y blindaje SSL/WAF).',
      workflowSteps: [
        'Definimos tu objetivo comercial: captar clientes por WhatsApp, vender online o lanzar tu SaaS.',
        'Redactamos todos los títulos y textos con ganchos de venta (Problema → Solución → Acción).',
        'Programamos tu web a medida con animaciones fluidas y adaptación perfecta a celulares.',
        'La publicamos en tu propio dominio con certificado SSL, máxima velocidad y SEO en Google.'
      ],
      caseStudy:
        'Retención en 5 Segundos: Aplicamos la misma arquitectura visual y velocidad de carga que permitió a CvStudio33.com.ar convertir más de 15.000 visitas web de TikTok en más de 1.000 compras reales sin caídas.',
      stack: ['HTML5 Semántico', 'CSS3 GPU Animations', 'JavaScript / TypeScript', 'React / Next.js', 'Cloudflare Edge CDN', 'PWA Mobile Lock', 'SEO Google AR'],
      timeline: 'Según agenda y volumen de código (3 a 15 días máximo)',
      deliverables: [
        'Página web o Web App completa 100% adaptable a celulares, tablets y computadoras',
        'Redacción completa de textos gancho comerciales (Copywriting) enfocados en vender',
        'Dominio propio configurado, candado SSL, blindaje Cloudflare y carga en menos de 1 segundo',
        'Posicionamiento técnico en Google (SEO) y botones directos a tu WhatsApp o pasarela de cobro'
      ],
      services: [
        'Landing Pages Vendedoras para Anuncios y Redes Sociales',
        'Páginas Web para Empresas, Marcas Personales y Profesionales',
        'Web Apps que Funcionan como Aplicación Nativa en el Celular',
        'Plataformas Digitales Completas (Estilo CvStudio33.com.ar)',
        'Portales de Clientes con Descarga de Archivos y Acceso Privado',
        'Catálogos Digitales Rápidos con Pedido Directo por WhatsApp',
        'Rediseño Total de Páginas Web Antiguas o que No Venden',
        'Páginas de Lanzamiento con Animaciones Modernas a Medida'
      ]
    },
    cloud_db: {
      code: 'MOD-03 // EDGE-CLOUD-DB',
      shortTitle: 'Nube, Bases de Datos & Ciberseguridad',
      title: 'Bases de Datos Seguras, Usuarios, Ciberseguridad & Nube (Cloudflare, Supabase & Firebase)',
      badge: 'Cloudflare Workers · Supabase PostgreSQL · Firebase · Blindaje WAF',
      sla: 'SLA 99.99% · Cifrado TLS 1.3 · Soporta Tráfico Viral Masivo',
      modality: 'Infraestructura Escalable y Blindada contra Caídas',
      problem:
        '¿Tenés miedo de que tu web se caiga justo cuando hacés publicidad o un video se vuelve viral en TikTok, o de sufrir hackeos y perder la información de tus clientes y ventas?',
      solution:
        'Armamos tu infraestructura sobre la red mundial de Cloudflare Workers, Supabase y Google Firebase con ciberseguridad activa (WAF, anti-DDoS, permisos por fila RLS y copias de seguridad automáticas).',
      summary:
        'Construimos los cimientos invisibles pero críticos de tu negocio digital: cuentas de usuarios, inicio de sesión con Google, bases de datos en tiempo real, guardado seguro de archivos PDF y protección total frente a picos de tráfico o ataques.',
      architecture:
        'Distribución Serverless en Cloudflare Workers (+330 ciudades), clusters PostgreSQL con Row-Level Security (RLS) en Supabase y sincronización en vivo con Google Firebase bajo normativa Ley 25.326.',
      workflowSteps: [
        'Diseñamos la base de datos blindada para tus usuarios, clientes, pagos y documentos.',
        'Configuramos inicio de sesión seguro (con cuenta de Google, email, código o 2FA).',
        'Activamos el escudo de ciberseguridad de Cloudflare (Firewall WAF, TLS 1.3 y anti-bots).',
        'Programamos respaldos automáticos diarios para que tu información esté siempre a salvo.'
      ],
      caseStudy:
        'Tráfico Viral sin Caídas: Cuando los videos de @CvStudio33 (+200k seguidores en TikTok) enviaron miles de usuarios simultáneos a la web, nuestra arquitectura en Cloudflare y Supabase respondió en milisegundos con 0% de caídas.',
      stack: ['Cloudflare Edge & WAF', 'Cloudflare Workers', 'Supabase PostgreSQL', 'Google Firebase', 'OAuth 2.0 / Login Google', 'Ciberseguridad OWASP', 'Backups Automáticos'],
      timeline: 'Según agenda y volumen de código (3 a 15 días máximo)',
      deliverables: [
        'Base de datos en producción en Supabase (PostgreSQL) o Google Firebase con seguridad RLS',
        'Sistema completo de registro, inicio de sesión con Google y perfiles de usuario',
        'Blindaje de ciberseguridad en Cloudflare (WAF, protección anti-DDoS y certificado TLS 1.3)',
        'Bóveda segura en la nube para almacenar PDFs, comprobantes, fotos y documentos'
      ],
      services: [
        'Configuración de Hosting Ultrarrápido y Seguro con Cloudflare',
        'Bases de Datos de Clientes y Ventas en Supabase o Firebase',
        'Inicio de Sesión con Google, Correo y Perfiles de Usuario',
        'Guardado Seguro de Archivos, CVs, Facturas y Documentos en la Nube',
        'Protección y Ciberseguridad contra Hackeos, Bots y Tráfico Masivo',
        'Migración de Sitios Lentos a Servidores Modernos en la Nube',
        'Conexión de tu Web con Sistemas Externos y Bases de Datos',
        'Mantenimiento, Copias de Seguridad y Escalado en la Nube'
      ]
    },
    systems: {
      code: 'MOD-04 // CUSTOM-ERP-CRM',
      shortTitle: 'Sistemas de Gestión, CRM & Turnos',
      title: 'Sistemas a Medida para tu Negocio: Ventas, Stock, CRM, Turnos y Comisiones',
      badge: '100% Tuyo sin Alquileres por Usuario · Uso Simple desde Celular y PC',
      sla: 'Ahorrá +15 Horas por Semana · Reportes y PDFs en 1 Clic',
      modality: 'Software Propio Hecho Exactamente a la Medida de tu Operación',
      problem:
        '¿Tenés todo anotado en cuadernos, decenas de planillas de Excel que se rompen o programas enlatados carísimos que te cobran por cada empleado y no se adaptan a tu forma de trabajar?',
      solution:
        'Creamos tu propio sistema web privado, simple y rápido para controlar ventas, stock, caja diaria, turnos, clientes y comisiones de vendedores desde tu celular o computadora, sin pagar licencias mensuales por empleado.',
      summary:
        'Digitalizamos tu negocio con un sistema hecho a tu medida donde cada botón hace exactamente lo que necesitás: cargás una venta en segundos, descontás stock, emitís presupuestos en PDF con tu logo y ves cuánto ganaste en tiempo real.',
      architecture:
        'Aplicación web progresiva (PWA) multiusuario con roles de acceso (Administrador, Vendedor, Operador), base de datos en la nube, motor de PDF instantáneo y alertas automáticas por WhatsApp.',
      workflowSteps: [
        'Relevamos cómo trabajás hoy y qué tareas te hacen perder tiempo o dinero.',
        'Diseñamos pantallas limpias e intuitivas para que vos y tu equipo las usen sin capacitación larga.',
        'Automatizamos el cálculo de caja, stock, turnos o comisiones de vendedores y afiliados.',
        'Te entregamos el sistema llave en mano y te acompañamos en la puesta en marcha.'
      ],
      caseStudy:
        'Panel de Partners y Sistema de la 5ta Venta: En CvStudio33 desarrollamos un panel propio de afiliados que calcula comisiones de hasta el 80% de forma automática, gestiona retiros y emite documentos en segundos.',
      stack: ['Dashboard Web & Móvil', 'Supabase PostgreSQL', 'Python / TypeScript', 'Motor PDF Vault', 'Exportación Excel/CSV', 'Roles y Permisos', 'Alertas WhatsApp'],
      timeline: 'Según agenda y volumen de código (3 a 15 días máximo)',
      deliverables: [
        'Sistema de gestión 100% propio accesible desde cualquier celular, tablet o PC',
        'Usuarios ilimitados con niveles de permiso (dueño, encargados, vendedores, sucursales)',
        'Generador automático de presupuestos, recibos, órdenes de trabajo o reportes en PDF y Excel',
        'Tablero de ganancias, alertas de stock bajo y recordatorios automáticos por WhatsApp'
      ],
      services: [
        'Sistema de Ventas, Caja Diaria y Control de Stock Fácil de Usar',
        'CRM Simple para Seguimiento de Clientes, Presupuestos y Ventas',
        'Sistema de Turnos y Reservas Online con Avisos por WhatsApp',
        'Panel de Vendedores, Afiliados y Cálculo Automático de Comisiones',
        'Generador de Presupuestos y Recibos en PDF con el Logo de tu Marca',
        'Tablero de Control para Ver cuánto Ganás y qué se Vende Más',
        'Sistemas a Medida para Inmobiliarias, Consultorios, Estéticas y Comercios',
        'Portales Privados para Clientes Mayoristas con Lista de Precios'
      ]
    },
    ecommerce: {
      code: 'MOD-05 // ECOMMERCE-PAY',
      shortTitle: 'Tiendas Online & Cobros Automáticos',
      title: 'Tiendas Online, Cobros con Mercado Pago & Venta de Servicios, Cursos o Tokens',
      badge: 'Mercado Pago Oficial · Transferencias · 0% Comisiones por Venta a Terceros',
      sla: 'Checkout Rápido en 3 Pasos · Acreditación y Entrega Automática 24/7',
      modality: 'Tienda Propia Lista para Facturar Todos los Días',
      problem:
        '¿Las plataformas de alquiler te descuentan comisiones por cada venta, o tus clientes abandonan el carrito porque el proceso de compra es largo, confuso y lento en el celular?',
      solution:
        'Desarrollamos tu propia tienda online o plataforma de cobros con checkout ultrarrápido de 3 pasos, integrada directo a tu Mercado Pago, transferencia o Stripe para que el 100% de tu ganancia vaya a tu cuenta al instante.',
      summary:
        'Vendé productos físicos, servicios profesionales, cursos grabados, suscripciones o paquetes de créditos/tokens las 24 horas. El cliente elige, paga desde el celular y el sistema confirma el pedido o habilita el acceso sin que tengas que intervenir.',
      architecture:
        'Motor de comercio electrónico optimizado para conversión móvil con Webhooks seguros en Cloudflare Workers conectados a la API oficial de Mercado Pago, Stripe y notificaciones instantáneas.',
      workflowSteps: [
        'Armamos tu catálogo de productos, planes o paquetes con fotos, precios y ofertas claras.',
        'Conectamos tu cuenta de Mercado Pago, bancos o cobros en USD para acreditación directa.',
        'Configuramos la entrega automática (envío de pedido a WhatsApp, descarga o recarga de tokens).',
        'Te entregamos un panel fácil para cambiar precios en masa, crear cupones y ver tus ventas.'
      ],
      caseStudy:
        'Más de +1.000 USD Facturados en Compras Web: En CvStudio33.com.ar implementamos pasarelas serverless en Cloudflare Workers para la venta de plantillas, planes mensuales y recarga de Tokens NYX/AXON en vivo.',
      stack: ['Mercado Pago API Oficial', 'Cloudflare Workers Pay', 'Checkout Móvil 3 Pasos', 'Economía de Tokens/Créditos', 'Carrito Directo a WhatsApp', 'Stripe / PayPal USD'],
      timeline: 'Según agenda y volumen de código (3 a 15 días máximo)',
      deliverables: [
        'Tienda online o plataforma de cobros propia sin pagar comisiones por venta a intermediarios',
        'Integración oficial con Mercado Pago (tarjetas, dinero en cuenta), transferencia y USD',
        'Panel autoadministrable para actualizar productos, precios, stock y cupones en segundos',
        'Confirmación automática de pago y alerta inmediata en tu WhatsApp con el detalle del pedido'
      ],
      services: [
        'Tienda Online Completa sin Pagar Comisiones por Venta',
        'Integración de Cobros Automáticos con Mercado Pago y Tarjetas',
        'Sistema de Venta de Créditos, Tokens o Planes (Como CvStudio33)',
        'Páginas para Vender Cursos, Membresías o Contenido Descargable',
        'Catálogo con Carrito de Compras que Envía el Pedido a tu WhatsApp',
        'Cobros Internacionales en Dólares (Stripe, PayPal o USDT)',
        'Cupones de Descuento, Combos y Ofertas por Tiempo Limitado',
        'Mejora de Tiendas Actuales para que Más Visitas Terminen Comprando'
      ]
    },
    mobile: {
      code: 'MOD-06 // MOBILE-APPS',
      shortTitle: 'Apps para Celulares Android / iOS',
      title: 'Aplicaciones Móviles Nativas (Android / iOS) & Web Apps Instalables en 1 Clic',
      badge: 'Android · iPhone (iOS) · Instalable sin Fricción · Fluidez Nativa 60fps',
      sla: 'Diseño Ergonómico para el Pulgar · Sincronización en Tiempo Real',
      modality: 'App Móvil Completa + Panel de Administración Web',
      problem:
        '¿Tus clientes usan todo desde el teléfono pero tu negocio no tiene una app cómoda, o pedirles que descarguen una aplicación pesada hace que la mitad abandone antes de registrarse?',
      solution:
        'Creamos tanto aplicaciones nativas para Android e iOS como Web Apps Progresivas (PWA) que se instalan en 1 segundo directo desde un link de WhatsApp o TikTok, con menú inferior táctil y máxima velocidad.',
      summary:
        'Llevá tu marca a la pantalla principal del celular de tus clientes con una aplicación moderna, rápida y estable: ideal para pedidos, reservas de turnos, programas de puntos, lectura de códigos QR, comunidades o equipos de trabajo.',
      architecture:
        'Desarrollo multiplataforma en Flutter / React Native y estándares PWA de última generación con Service Workers, caché inteligente, cámara/QR, geolocalización y backend en Firebase/Supabase.',
      workflowSteps: [
        'Diseñamos cada pantalla pensando en el uso real con una sola mano desde el celular.',
        'Programamos las funciones clave (perfiles, pedidos, turnos, escáner QR, mapa o notificaciones).',
        'Conectamos la app a tu panel central para que controles usuarios y ventas en vivo.',
        'La dejamos lista para instalar en teléfonos Android e iPhone y publicarla en tiendas.'
      ],
      caseStudy:
        'Experiencia Táctil Perfecta: Cero pantallas que se mueven hacia los costados y cero botones cortados. Diseñamos con bloqueo estricto de viewport y navegación inferior ergonómica.',
      stack: ['Flutter Android & iOS', 'React Native', 'PWA Instalable en 1 Clic', 'Notificaciones Push', 'Escáner QR & Cámara', 'Firebase & Supabase Realtime'],
      timeline: 'Según agenda y volumen de código (3 a 15 días máximo)',
      deliverables: [
        'Aplicación móvil funcionando con fluidez total en celulares Android e iPhone (iOS)',
        'Panel de control web para administrar usuarios, pedidos, contenidos y notificaciones',
        'Integración de funciones móviles: cámara, lector QR, ubicación GPS y alertas push',
        'Acompañamiento completo en el despliegue, publicación y actualizaciones'
      ],
      services: [
        'Aplicaciones Móviles para Android e iPhone (iOS)',
        'Web Apps Instalables en el Celular en 1 Clic desde tu Link',
        'Apps de Pedidos, Reservas de Turnos y Beneficios para Clientes',
        'Apps de Trabajo para Repartidores, Vendedores o Equipos en Calle',
        'Apps con Lector de Códigos QR, Entradas y Credenciales Digitales',
        'Apps para Comunidades, Academias, Gimnasios y Eventos',
        'Lanzamiento Rápido de Primera Versión (MVP) para Nuevas Ideas',
        'Actualización y Mejora de Aplicaciones Móviles Existentes'
      ]
    },
    python_auto: {
      code: 'MOD-07 // PYTHON-AUTOMATION',
      shortTitle: 'Automatización, Bots & Portales',
      title: 'Automatización con Python, Bots Inteligentes, APIs & Portales de Datos en Vivo',
      badge: 'Python 3.12 · Conectores Oficiales API · Funciona Solo las 24 Horas',
      sla: 'Ahorra el 85% del Trabajo Manual · Cero Errores de Carga',
      modality: 'Robots de Software, Integraciones & Portales Automatizados',
      problem:
        '¿Tu equipo pierde horas todos los días copiando datos entre planillas, revisando precios a mano, enviando avisos uno por uno o actualizando publicaciones en distintos portales?',
      solution:
        'Programamos robots de software en Python y conectores automáticos en la nube que hacen todo ese trabajo repetitivo en segundos, las 24 horas, conectando tus sistemas y enviándote el resultado listo a tu celular.',
      summary:
        'Desde portales de empleo o inmobiliarios conectados en vivo a grandes redes internacionales hasta bots que cruzan datos de Excel, generan PDFs, monitorean precios de la competencia y envían reportes diarios por WhatsApp o Telegram.',
      architecture:
        'Microservicios en Python (FastAPI / AsyncIO) y tareas programadas (Cron Triggers) en Cloudflare Workers integradas con APIs REST globales (Jooble, Adzuna, Mercado Pago, Telegram, WhatsApp y Google Workspace).',
      workflowSteps: [
        'Identificamos qué tarea manual te consume horas o qué plataformas querés conectar en vivo.',
        'Desarrollamos el script o motor en Python con reglas claras y validación anti-errores.',
        'Lo desplegamos en la nube para que corra solo cada minuto, hora o noche sin depender de tu PC.',
        'Recibís alertas instantáneas, reportes limpios o tu portal actualizado en piloto automático.'
      ],
      caseStudy:
        'Portal de Empleo Propio en Alianza con Jooble y Adzuna (CvStudio33): Automatizamos la conexión y filtrado algorítmico de vacantes reales por radio en KM y salario, logrando +200 contrataciones estimadas en su primer mes.',
      stack: ['Python 3.12 Async', 'APIs Jooble & Adzuna', 'Cloudflare Cron Workers', 'Bots WhatsApp & Telegram', 'Google Sheets / Excel API', 'Scraping & Data Pipelines'],
      timeline: 'Según agenda y volumen de código (3 a 15 días máximo)',
      deliverables: [
        'Robot de software o integración API funcionando 24/7 en la nube de forma autónoma',
        'Conexión automática entre tu sitio web, hojas de cálculo, base de datos y medios de pago',
        'Alertas y resúmenes automáticos enviados directo a tu WhatsApp, Telegram o correo',
        'Monitoreo, registro de actividad y soporte incluido ante cualquier cambio externo'
      ],
      services: [
        'Portales de Empleo o Buscadores Conectados a APIs (Como Jooble y Adzuna)',
        'Automatización de Tareas Repetitivas en Excel, Google Sheets y PDFs',
        'Bots para WhatsApp y Telegram que Envían Alertas y Reportes',
        'Monitoreo Automático de Precios, Stock o Publicaciones de la Competencia',
        'Conexión entre tu Página Web, tu CRM y tus Medios de Pago',
        'Extracción Ordenada de Datos Públicos para Investigación Comercial',
        'Envío Automático de Reportes Diarios de Ventas a tu Celular',
        'Sistemas de Recomendación y Cruce Inteligente de Datos'
      ]
    },
    uiux_seo: {
      code: 'MOD-08 // UIUX-SVG-SEO-AR',
      shortTitle: 'Posicionamiento SEO & Rediseño CRO',
      title: 'Posicionamiento en Google (SEO), Textos Gancho (CRO) & Rediseño Web Profesional',
      badge: 'Aparecé Primero en Google · Textos que Convencen en 5 Segundos',
      sla: 'Velocidad 100/100 · Más Consultas y Ventas con el Mismo Tráfico',
      modality: 'Auditoría + SEO Técnico + Copywriting Vendedor + Diseño UI/UX',
      problem:
        '¿Tenés una página web que parece hecha con una plantilla genérica, no aparece cuando buscan tu rubro en Google o recibe visitas pero casi nadie toca el botón de contacto?',
      solution:
        'Rediseñamos la experiencia visual de tu sitio con identidad propia, corregimos cada fallo en celulares, escribimos textos gancho persuasivos y aplicamos SEO técnico para que Google te posicione y los visitantes te compren.',
      summary:
        'Combinamos diseño de interfaz moderno (sin clichés de IA), psicología de ventas (CRO) para superar la regla de los 5 segundos y posicionamiento orgánico en Google para transformar una web estancada en tu mejor canal de ventas.',
      architecture:
        'Optimización Core Web Vitals, datos estructurados Schema.org JSON-LD para Google Argentina y global, iconografía vectorial SVG a medida y arquitectura de conversión probada.',
      workflowSteps: [
        'Auditamos tu web actual: velocidad, vista en celulares, textos y palabras clave en Google.',
        'Reescribimos tus titulares y secciones con ganchos claros de Problema → Solución → Prueba Social.',
        'Renovamos el diseño, los iconos SVG, las animaciones y el flujo de contacto sin fricción.',
        'Indexamos las mejoras en Google y medimos el aumento real en consultas y ventas.'
      ],
      caseStudy:
        'De Visita a Comprador en Segundos: La combinación de métricas en vivo, prueba social verificada y formularios de 1 toque multiplicó la tasa de contacto y ventas en nuestros proyectos propios y de clientes.',
      stack: ['SEO Técnico Google AR', 'Copywriting de Respuesta Directa', 'Optimización CRO (Regla 5s)', 'Diseño UI/UX a Medida', 'Iconos & Logos SVG Propios', 'Schema.org JSON-LD'],
      timeline: 'Según agenda y volumen de código (3 a 15 días máximo)',
      deliverables: [
        'Optimización SEO completa (títulos, metadatos, Schema.org, sitemap y velocidad) para Google',
        'Reescritura profesional de textos con ganchos comerciales que atrapan al cliente',
        'Corrección definitiva de desbordes, pantallas corridas o botones cortados en celulares',
        'Rediseño visual moderno con iconos vectoriales propios y llamadas a la acción claras'
      ],
      services: [
        'Posicionamiento en Google (SEO) para Atraer Clientes Todos los Meses',
        'Redacción de Textos Gancho (Copywriting) Claros y Vendedores',
        'Optimización de Conversión (CRO) para que Más Visitas te Compren',
        'Arreglo de Páginas Desalineadas o que se Ven Mal en el Celular',
        'Aceleración de Páginas Web Lentas para No Perder Clientes',
        'Animación Moderna de Logos e Iconos Propios en Alta Calidad',
        'Auditoría Completa de tu Web con Plan de Mejoras Inmediatas',
        'Mantenimiento Mensual y Actualizaciones para tu Tranquilidad'
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
   * 2. FILTRADO EN VIVO DE SERVICIOS (servicios.html)
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
      if (summaryEl) summaryEl.textContent = `${data.problem} ${data.solution}`;
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
   * 2C. PANEL INTERACTIVO orion-engine://stack-produccion CON CAJÓN Y BOTÓN DE CERRAR
   */
  function initShowcaseStackPanel() {
    const drawer = document.getElementById('showcase-inline-drawer');
    if (!drawer) return;

    const titleEl = document.getElementById('showcase-drawer-title');
    const problemEl = document.getElementById('showcase-drawer-problem');
    const solutionEl = document.getElementById('showcase-drawer-solution');
    const fullSpecBtn = document.getElementById('showcase-drawer-open-modal');
    const closeDrawerBtn = document.getElementById('showcase-drawer-close');
    const rows = document.querySelectorAll('.showcase-row[data-stack-preview]');

    rows.forEach((row) => {
      row.addEventListener('click', (e) => {
        if (e.target.closest('[data-open-service]')) return;
        const cat = row.getAttribute('data-stack-preview') || 'orion_ai';
        const data = ORION_SERVICES_DB[cat];
        if (!data) return;

        rows.forEach((r) => r.classList.remove('is-selected'));
        row.classList.add('is-selected');

        if (titleEl) titleEl.textContent = data.shortTitle;
        if (problemEl) problemEl.textContent = data.problem;
        if (solutionEl) solutionEl.textContent = data.solution;
        if (fullSpecBtn) fullSpecBtn.setAttribute('data-open-service', cat);

        drawer.classList.add('is-open');
      });
    });

    if (closeDrawerBtn) {
      closeDrawerBtn.addEventListener('click', () => {
        drawer.classList.remove('is-open');
        rows.forEach((r) => r.classList.remove('is-selected'));
      });
    }
  }

  /**
   * 3. MODAL / BOTTOM-SHEET DE FICHA TÉCNICA v2 (CON BOTÓN CERRAR FIJO ARRIBA Y ABAJO)
   */
  let lastFocusedTrigger = null;

  function openServiceModal(categoryKey, specificServiceName, triggerEl) {
    const modal = document.getElementById('service-detail-modal');
    if (!modal) return;

    const data = ORION_SERVICES_DB[categoryKey];
    if (!data) return;

    if (triggerEl) lastFocusedTrigger = triggerEl;

    const codeEl = modal.querySelector('#modal-service-code');
    const titleEl = modal.querySelector('#modal-service-title');
    const badgeEl = modal.querySelector('#modal-service-badge');
    const slaEl = modal.querySelector('#modal-service-sla');
    const modalityEl = modal.querySelector('#modal-service-modality');
    const problemEl = modal.querySelector('#modal-service-problem');
    const solutionEl = modal.querySelector('#modal-service-solution');
    const summaryEl = modal.querySelector('#modal-service-summary');
    const archEl = modal.querySelector('#modal-service-arch');
    const workflowEl = modal.querySelector('#modal-service-workflow');
    const caseEl = modal.querySelector('#modal-service-case');
    const deliverablesEl = modal.querySelector('#modal-service-deliverables');
    const stackEl = modal.querySelector('#modal-service-stack');
    const timelineEl = modal.querySelector('#modal-service-timeline');
    const subservicesEl = modal.querySelector('#modal-service-all');
    const quoteBtn = modal.querySelector('#modal-quote-btn');

    const activeHeadline = specificServiceName ? `${specificServiceName}` : data.title;

    if (codeEl) codeEl.textContent = data.code || 'ORION-SPEC // 0x33';
    if (titleEl) titleEl.textContent = activeHeadline;
    if (badgeEl) badgeEl.textContent = data.badge;
    if (slaEl) slaEl.textContent = data.sla || 'SLA 99.99% Edge';
    if (modalityEl) modalityEl.textContent = data.modality || 'Código 100% Propio';
    if (problemEl) problemEl.textContent = data.problem || '';
    if (solutionEl) solutionEl.textContent = data.solution || '';

    if (summaryEl) {
      summaryEl.textContent = specificServiceName
        ? `Solución específica "${specificServiceName}": ${data.summary}`
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

    const bodyScroll = modal.querySelector('.bottom-sheet-body') || modal.querySelector('.bottom-sheet');
    if (bodyScroll) bodyScroll.scrollTop = 0;

    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    const closeBtn = modal.querySelector('[data-close-modal]');
    if (closeBtn) {
      setTimeout(() => closeBtn.focus({ preventScroll: true }), 60);
    }
  }

  function closeServiceModal() {
    const modal = document.getElementById('service-detail-modal');
    if (!modal) return;
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    if (lastFocusedTrigger && typeof lastFocusedTrigger.focus === 'function') {
      lastFocusedTrigger.focus({ preventScroll: true });
    }
  }

  function initServiceModals() {
    document.addEventListener('click', (e) => {
      const closeBtn = e.target.closest('[data-close-modal]');
      if (closeBtn || e.target.classList.contains('modal-backdrop')) {
        closeServiceModal();
        return;
      }

      const trigger = e.target.closest('[data-open-service]');
      if (trigger) {
        const cat = trigger.getAttribute('data-open-service');
        const specific = trigger.getAttribute('data-service-name') || '';
        openServiceModal(cat, specific, trigger);
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeServiceModal();
      }
    });

    // Soporte táctil para deslizar hacia abajo desde la cabecera de la ficha en celulares
    const sheetHead = document.querySelector('.bottom-sheet-sticky-head');
    const sheet = document.querySelector('.bottom-sheet');
    if (sheetHead && sheet) {
      let startY = 0;
      let currentY = 0;
      let dragging = false;

      sheetHead.addEventListener(
        'touchstart',
        (e) => {
          if (e.touches.length !== 1) return;
          startY = e.touches[0].clientY;
          currentY = startY;
          dragging = true;
        },
        { passive: true }
      );

      sheetHead.addEventListener(
        'touchmove',
        (e) => {
          if (!dragging) return;
          currentY = e.touches[0].clientY;
          const delta = Math.max(0, currentY - startY);
          if (delta > 0) {
            sheet.style.transform = `translateY(${Math.min(delta, 220)}px)`;
          }
        },
        { passive: true }
      );

      sheetHead.addEventListener('touchend', () => {
        if (!dragging) return;
        dragging = false;
        const delta = currentY - startY;
        sheet.style.transform = '';
        if (delta > 75) {
          closeServiceModal();
        }
      });
    }
  }

  /**
   * 3B. BOTÓN CENTRAL "ORION" EN EL DOCK INFERIOR:
   * Navegación directa y exclusiva al Chatbot Orión.html
   */
  function initOrionDirectChatbotLink() {
    const orionDockBtn = document.querySelector('.dock-item-orion');
    if (!orionDockBtn) return;
    if (orionDockBtn.tagName.toLowerCase() === 'a') {
      orionDockBtn.setAttribute('href', 'Orión.html');
    } else {
      orionDockBtn.addEventListener('click', () => {
        window.location.href = 'Orión.html';
      });
    }
  }

  /**
   * 4. SISTEMA CRO DE COMPRA RÁPIDA Y CONTACTO SIN FRICCIÓN (contacto.html)
   */
  function initQuoteCalculator() {
    const form = document.getElementById('orion-quote-form');
    if (!form) return;

    const params = new URLSearchParams(window.location.search);
    const preselectedService = params.get('servicio');
    const customServiceNotice = document.getElementById('preselected-service-banner');
    const messageArea = document.getElementById('quote-details');
    const goalCards = form.querySelectorAll('.cro-goal-card');
    const summaryOutput = document.getElementById('quote-live-summary');
    const directWaBtn = document.getElementById('cro-instant-wa-btn');

    let selectedGoals = new Set();

    if (preselectedService) {
      selectedGoals.add(preselectedService);
      if (customServiceNotice) {
        customServiceNotice.style.display = 'flex';
        const span = customServiceNotice.querySelector('strong');
        if (span) span.textContent = preselectedService;
      }
      if (messageArea && !messageArea.value) {
        messageArea.value = `Hola OrionCodeLabs33! Quiero cotizar: ${preselectedService}.`;
      }
    }

    function buildWhatsAppUrl() {
      const name = (form.querySelector('#quote-name')?.value || '').trim();
      const contact = (form.querySelector('#quote-contact')?.value || '').trim();
      const urgency = form.querySelector('#quote-timeline')?.value || 'Lo antes posible';
      const details = (form.querySelector('#quote-details')?.value || '').trim();
      const chosen = Array.from(selectedGoals);
      const goalText = chosen.length
        ? chosen.join(' + ')
        : preselectedService || 'Desarrollo Web / IA a Medida';

      let msg = `¡Hola OrionCodeLabs33! Quiero ser el próximo caso de éxito.\n`;
      if (name) msg += `• Mi nombre: ${name}\n`;
      msg += `• Me interesa: ${goalText}\n`;
      msg += `• Prioridad: ${urgency}\n`;
      if (contact) msg += `• Mi contacto: ${contact}\n`;
      if (details) msg += `• Idea / Detalle: ${details}`;

      return `https://wa.me/5491100000033?text=${encodeURIComponent(msg)}`;
    }

    function syncUI() {
      const chosen = Array.from(selectedGoals);
      if (summaryOutput) {
        if (chosen.length === 0) {
          summaryOutput.textContent =
            'Tocá arriba qué querés crear (podés elegir 1 o varios) y hablá directo con nosotros.';
        } else {
          summaryOutput.textContent = `Seleccionado (${chosen.length}): ${chosen.join(' + ')}`;
        }
      }
      if (directWaBtn) {
        directWaBtn.setAttribute('href', buildWhatsAppUrl());
      }
    }

    goalCards.forEach((card) => {
      const val = card.getAttribute('data-goal-value') || '';
      if (card.classList.contains('is-selected') && val) {
        selectedGoals.add(val);
      }
      card.addEventListener('click', () => {
        if (!val) return;
        if (selectedGoals.has(val)) {
          selectedGoals.delete(val);
          card.classList.remove('is-selected');
          card.setAttribute('aria-pressed', 'false');
        } else {
          selectedGoals.add(val);
          card.classList.add('is-selected');
          card.setAttribute('aria-pressed', 'true');
        }
        syncUI();
      });
    });

    form.addEventListener('input', syncUI);
    syncUI();

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = (form.querySelector('#quote-name')?.value || 'Cliente').trim();
      const contact = (form.querySelector('#quote-contact')?.value || '').trim();
      const timeline = form.querySelector('#quote-timeline')?.value || 'Lo antes posible';
      const details = (form.querySelector('#quote-details')?.value || '').trim();
      const chosen = Array.from(selectedGoals);
      const modulesText = chosen.join(' + ') || preselectedService || 'Proyecto Personalizado';
      const waUrl = buildWhatsAppUrl();

      const feedbackBox = document.getElementById('quote-form-feedback');
      if (feedbackBox) {
        feedbackBox.style.display = 'block';
        feedbackBox.innerHTML = `
          <div style="padding:1.25rem;border-radius:var(--radius-md);background:#F0FDF4;border:1.5px solid #86EFAC;color:#064E3B;">
            <strong style="display:block;margin-bottom:0.35rem;font-size:var(--text-sm);">✓ ¡Excelente ${name}! Tu solicitud está lista</strong>
            <p style="font-size:var(--text-xs);margin-bottom:0.9rem;color:#065F46;">
              Armamos tu pedido para <strong>${modulesText}</strong> (${timeline}). Tocá el botón verde para abrir WhatsApp con todo cargado o envialo por correo:
            </p>
            <div style="display:flex;flex-wrap:wrap;gap:0.65rem;">
              <a class="btn btn-primary btn-sm" target="_blank" rel="noopener" href="${waUrl}">Abrir en WhatsApp Ahora →</a>
              <a class="btn btn-secondary btn-sm" href="mailto:contacto@orioncodelabs33.com.ar?subject=${encodeURIComponent(
                'Quiero empezar mi proyecto — ' + name
              )}&body=${encodeURIComponent(
                `Nombre: ${name}\nContacto: ${contact}\nQué busco: ${modulesText}\nPrioridad: ${timeline}\nDetalle:\n${details}`
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
    initShowcaseStackPanel();
    initServiceModals();
    initOrionDirectChatbotLink();
    initQuoteCalculator();
  });
})();
