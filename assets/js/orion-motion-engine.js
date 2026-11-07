/**
 * ==========================================================================
 * OrionCodeLabs33 v4 — Dual Pure-Code Animation Engine (Remotion + HyperFrames)
 * Archivo 4: assets/js/orion-motion-engine.js
 *
 * ARQUITECTURA DE AISLAMIENTO TOTAL (CERO COLISIONES):
 * 1. Motor Remotion (`OrionRemotion`):
 *    - Reloj determinista a 60 FPS basado en `frame` (0..durationInFrames).
 *    - Primitivas matemáticas puras `interpolate(frame, [in, out], [a, b])` y
 *      física `spring({ frame, fps, config: { damping, stiffness, mass } })`.
 *    - Opera exclusivamente sobre contenedores `[data-remotion-composition]` y
 *      lienzos `<canvas>` de alta densidad (HiDPI) sin transiciones CSS.
 * 2. Motor HyperFrames (`window.__timelines`):
 *    - Registro determinista de timelines seek-safe sobre contenedores
 *      `[data-composition-id]` y elementos `.hf-clip` sin conflicto de transform.
 * ==========================================================================
 */

(function () {
  'use strict';

  window.__timelines = window.__timelines || {};

  /* ------------------------------------------------------------------------
     1. PRIMITIVAS MATEMÁTICAS REMOTION (interpolate + spring + Easing)
     ------------------------------------------------------------------------ */
  const Easing = {
    linear: (t) => t,
    outCubic: (t) => 1 - Math.pow(1 - t, 3),
    inOutCubic: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
    outQuart: (t) => 1 - Math.pow(1 - t, 4)
  };

  function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
  }

  function interpolate(frame, inputRange, outputRange, options) {
    const opts = options || {};
    const extrapolateLeft = opts.extrapolateLeft || 'clamp';
    const extrapolateRight = opts.extrapolateRight || 'clamp';
    const easing = opts.easing || Easing.linear;

    const inMin = inputRange[0];
    const inMax = inputRange[1];
    const outMin = outputRange[0];
    const outMax = outputRange[1];

    if (inMax === inMin) return outMax;

    let progress = (frame - inMin) / (inMax - inMin);
    if (progress < 0 && extrapolateLeft === 'clamp') progress = 0;
    if (progress > 1 && extrapolateRight === 'clamp') progress = 1;

    const eased = easing(clamp(progress, 0, 1));
    return outMin + eased * (outMax - outMin);
  }

  function spring(params) {
    const frame = Math.max(0, params.frame || 0);
    const fps = params.fps || 60;
    const cfg = params.config || {};
    const damping = cfg.damping || 20;
    const stiffness = cfg.stiffness || 140;
    const mass = cfg.mass || 1;

    const t = frame / fps;
    const omega0 = Math.sqrt(stiffness / mass);
    const zeta = damping / (2 * Math.sqrt(stiffness * mass));

    if (zeta < 1) {
      const omegaD = omega0 * Math.sqrt(1 - zeta * zeta);
      const env = Math.exp(-zeta * omega0 * t);
      const val = 1 - env * (Math.cos(omegaD * t) + (zeta * omega0 / omegaD) * Math.sin(omegaD * t));
      return clamp(val, 0, 1.08);
    }
    const env = Math.exp(-omega0 * t);
    return clamp(1 - env * (1 + omega0 * t), 0, 1);
  }

  function setupHiDPICanvas(canvas) {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(300, Math.floor(rect.width));
    const h = Math.max(200, Math.floor(rect.height));
    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
    }
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx, w, h };
  }

  /* ------------------------------------------------------------------------
     2. COMPOSICIÓN REMOTION #1: HERO PRESENTATION PLAYER (index.html)
        300 frames @ 60 FPS (5.0s loop) — Minimalismo Editorial en Superficie Blanca
        Cero contadores de frames (0/1000) y cero estética oscura/hacker.
     ------------------------------------------------------------------------ */
  function initHeroRemotionComposition() {
    const root = document.querySelector('[data-remotion-composition="hero-architecture"]');
    if (!root) return;

    const canvas = root.querySelector('canvas');
    const progressFill = root.querySelector('.remotion-progress-fill');
    const sceneBtns = root.querySelectorAll('[data-remotion-scene]');
    if (!canvas) return;

    const FPS = 60;
    const DURATION_IN_FRAMES = 300;
    let currentFrame = 0;
    let lockedScene = -1;

    sceneBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-remotion-scene'), 10);
        if (lockedScene === idx) {
          lockedScene = -1;
        } else {
          lockedScene = idx;
          currentFrame = idx * 100;
        }
      });
    });

    function drawDotGrid(ctx, w, h) {
      ctx.fillStyle = 'rgba(148, 163, 184, 0.28)';
      const step = 24;
      for (let x = 18; x < w; x += step) {
        for (let y = 18; y < h; y += step) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    function renderFrame(frame) {
      const { ctx, w, h } = setupHiDPICanvas(canvas);
      ctx.clearRect(0, 0, w, h);

      // Fondo blanco editorial minimalista
      const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
      bgGrad.addColorStop(0, '#FFFFFF');
      bgGrad.addColorStop(1, '#F8FAFC');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      drawDotGrid(ctx, w, h);

      const sceneIndex = Math.min(2, Math.floor(frame / 100));
      const localFrame = frame % 100;
      const enterSpring = spring({ frame: localFrame, fps: FPS, config: { damping: 19, stiffness: 130 } });

      sceneBtns.forEach((b, idx) => {
        b.classList.toggle('is-active', idx === sceneIndex);
      });

      if (progressFill) {
        progressFill.style.width = `${((frame / DURATION_IN_FRAMES) * 100).toFixed(1)}%`;
      }

      const cx = w / 2;
      const cy = h / 2 - 6;

      if (sceneIndex === 0) {
        // ESCENA 1: Arquitectura Web & Plataformas SaaS Minimalista
        const cardW = Math.min(w - 36, 400) * enterSpring;
        const cardH = Math.min(h - 54, 182) * enterSpring;
        const bx = cx - cardW / 2;
        const by = cy - cardH / 2;

        ctx.save();
        ctx.shadowColor = 'rgba(15, 23, 42, 0.07)';
        ctx.shadowBlur = 24;
        ctx.shadowOffsetY = 8;
        ctx.fillStyle = '#FFFFFF';
        ctx.strokeStyle = '#E2E8F0';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(bx, by, cardW, cardH, 16);
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        // Barra superior minimalista de la app
        ctx.fillStyle = '#F8FAFC';
        ctx.beginPath();
        ctx.roundRect(bx + 12, by + 12, cardW - 24, 26, 8);
        ctx.fill();

        const dotColors = ['#CBD5E1', '#94A3B8', '#1D4ED8'];
        dotColors.forEach((c, i) => {
          ctx.fillStyle = c;
          ctx.beginPath();
          ctx.arc(bx + 24 + i * 11, by + 25, 3.2, 0, Math.PI * 2);
          ctx.fill();
        });

        ctx.fillStyle = '#1D4ED8';
        ctx.font = '700 10px "Plus Jakarta Sans", sans-serif';
        ctx.fillText('Arquitectura Cloud Nativa', bx + 64, by + 28.5);

        // 3 Tarjetas Modulares con animación spring e interpolación suave
        const colProgress = interpolate(localFrame, [6, 52], [0, 1], { easing: Easing.outCubic });
        const innerW = (cardW - 36) / 3;
        const accents = ['#1D4ED8', '#4F46E5', '#059669'];
        const softBgs = ['#EFF6FF', '#EEF2FF', '#ECFDF5'];
        const titles = ['Diseño UI/UX', 'APIs & Pagos', 'Cloud & Datos'];
        const metrics = ['100% Medida', 'Tiempo Real', 'Blindaje Total'];

        for (let i = 0; i < 3; i++) {
          const ix = bx + 12 + i * (innerW + 6);
          const iy = by + 48;
          const ih = Math.max(36, (cardH - 62) * colProgress);

          ctx.fillStyle = softBgs[i];
          ctx.strokeStyle = accents[i];
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.roundRect(ix, iy, innerW, ih, 10);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = '#090D16';
          ctx.font = '700 10.5px "Plus Jakarta Sans", sans-serif';
          ctx.fillText(titles[i], ix + 9, iy + 22);

          ctx.fillStyle = accents[i];
          ctx.font = '600 9.5px "Inter", sans-serif';
          ctx.fillText(metrics[i], ix + 9, iy + 39);

          // Barra de progreso minimalista interna
          const barW = Math.max(8, (innerW - 18) * colProgress);
          ctx.fillStyle = 'rgba(255,255,255,0.85)';
          ctx.beginPath();
          ctx.roundRect(ix + 9, iy + ih - 16, innerW - 18, 5, 3);
          ctx.fill();

          ctx.fillStyle = accents[i];
          ctx.beginPath();
          ctx.roundRect(ix + 9, iy + ih - 16, barW, 5, 3);
          ctx.fill();
        }

        ctx.fillStyle = '#475569';
        ctx.font = '600 11.5px "Plus Jakarta Sans", sans-serif';
        ctx.fillText('Plataformas Web, Sistemas Comerciales y SaaS a Medida', 18, h - 14);
      } else if (sceneIndex === 1) {
        // ESCENA 2: Ecosistema Minimalista ORION IA (Nodos Limpios y Curvas Suaves)
        const nodes = [
          { x: cx - 122, y: cy - 38, label: 'Base Qwen 3.8', sub: 'Fundación' },
          { x: cx - 122, y: cy + 38, label: 'Tu Negocio', sub: 'Catálogo & Reglas' },
          { x: cx, y: cy, label: 'ORION IA', sub: 'Motor Propio', main: true },
          { x: cx + 122, y: cy - 38, label: 'Web & SaaS', sub: 'Integrado' },
          { x: cx + 122, y: cy + 38, label: 'WhatsApp 24/7', sub: 'Atención Viva' }
        ];

        // Anillos concéntricos suaves alrededor del núcleo
        const ringPulse = interpolate(localFrame, [0, 99], [0.85, 1.18]);
        ctx.strokeStyle = 'rgba(29, 78, 216, 0.10)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(cx, cy, 52 * ringPulse, 0, Math.PI * 2);
        ctx.stroke();

        const pulse = interpolate(localFrame, [0, 99], [0, 1]);
        const links = [
          [0, 2],
          [1, 2],
          [2, 3],
          [2, 4]
        ];

        links.forEach(([a, b], idx) => {
          const na = nodes[a];
          const nb = nodes[b];
          const midX = (na.x + nb.x) / 2;

          ctx.strokeStyle = '#CBD5E1';
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(na.x, na.y);
          ctx.bezierCurveTo(midX, na.y, midX, nb.y, nb.x, nb.y);
          ctx.stroke();

          // Partícula fluida sobre la curva
          const t = (pulse * 1.8 + idx * 0.24) % 1;
          const inv = 1 - t;
          const px =
            inv * inv * inv * na.x +
            3 * inv * inv * t * midX +
            3 * inv * t * t * midX +
            t * t * t * nb.x;
          const py =
            inv * inv * inv * na.y +
            3 * inv * inv * t * na.y +
            3 * inv * t * t * nb.y +
            t * t * t * nb.y;

          ctx.fillStyle = '#1D4ED8';
          ctx.beginPath();
          ctx.arc(px, py, 3.8, 0, Math.PI * 2);
          ctx.fill();
        });

        nodes.forEach((n) => {
          if (n.main) {
            const r = 36 * enterSpring;
            ctx.save();
            ctx.shadowColor = 'rgba(29, 78, 216, 0.22)';
            ctx.shadowBlur = 18;
            ctx.fillStyle = '#1D4ED8';
            ctx.beginPath();
            ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            ctx.fillStyle = '#FFFFFF';
            ctx.font = '800 10.5px "Plus Jakarta Sans", sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(n.label, n.x, n.y - 2);
            ctx.fillStyle = '#DBEAFE';
            ctx.font = '600 8.5px "Inter", sans-serif';
            ctx.fillText(n.sub, n.x, n.y + 10);
          } else {
            const pillW = 94 * enterSpring;
            const pillH = 38 * enterSpring;
            ctx.save();
            ctx.shadowColor = 'rgba(15, 23, 42, 0.06)';
            ctx.shadowBlur = 10;
            ctx.fillStyle = '#FFFFFF';
            ctx.strokeStyle = '#CBD5E1';
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.roundRect(n.x - pillW / 2, n.y - pillH / 2, pillW, pillH, 10);
            ctx.fill();
            ctx.stroke();
            ctx.restore();

            ctx.fillStyle = '#090D16';
            ctx.font = '700 10px "Plus Jakarta Sans", sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(n.label, n.x, n.y - 2);
            ctx.fillStyle = '#64748B';
            ctx.font = '500 8.5px "Inter", sans-serif';
            ctx.fillText(n.sub, n.x, n.y + 10);
          }
        });

        ctx.textAlign = 'left';
        ctx.fillStyle = '#475569';
        ctx.font = '600 11.5px "Plus Jakarta Sans", sans-serif';
        ctx.fillText('Agentes y Sistemas Conectados al Motor Propio ORION IA', 18, h - 14);
      } else {
        // ESCENA 3: Rendimiento, Conversión y Entrega Llave en Mano
        const items = [
          { label: 'Velocidad y Disponibilidad Global (SLA 99.99%)', val: 0.96, color: '#1D4ED8', badge: 'Óptimo' },
          { label: 'Seguridad de Datos y Protección Activa', val: 0.99, color: '#059669', badge: 'Blindado' },
          { label: 'Código 100% Propiedad del Cliente (Sin Licencias)', val: 1.0, color: '#4F46E5', badge: '100% Tuyo' }
        ];

        const cardW = Math.min(w - 40, 380);
        const startX = (w - cardW) / 2;

        items.forEach((b, i) => {
          const y = 26 + i * 54;
          const fillRatio = b.val * interpolate(localFrame, [4 + i * 7, 50 + i * 7], [0, 1], { easing: Easing.outQuart });

          ctx.fillStyle = '#FFFFFF';
          ctx.strokeStyle = '#E2E8F0';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.roundRect(startX, y, cardW, 44, 10);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = '#090D16';
          ctx.font = '700 10.5px "Plus Jakarta Sans", sans-serif';
          ctx.fillText(b.label, startX + 12, y + 17);

          ctx.fillStyle = b.color;
          ctx.font = '700 9.5px "Plus Jakarta Sans", sans-serif';
          ctx.textAlign = 'right';
          ctx.fillText(b.badge, startX + cardW - 12, y + 17);
          ctx.textAlign = 'left';

          ctx.fillStyle = '#F1F5F9';
          ctx.beginPath();
          ctx.roundRect(startX + 12, y + 25, cardW - 24, 8, 4);
          ctx.fill();

          ctx.fillStyle = b.color;
          ctx.beginPath();
          ctx.roundRect(startX + 12, y + 25, Math.max(12, (cardW - 24) * fillRatio), 8, 4);
          ctx.fill();
        });

        ctx.fillStyle = '#475569';
        ctx.font = '600 11.5px "Plus Jakarta Sans", sans-serif';
        ctx.fillText('Producción Lista para Vender · Entrega Ágil de 3 a 15 Días Máx.', 18, h - 14);
      }
    }

    function tick() {
      renderFrame(currentFrame);
      if (lockedScene >= 0) {
        const minF = lockedScene * 100;
        const maxF = minF + 99;
        currentFrame = currentFrame >= maxF ? minF : currentFrame + 1;
      } else {
        currentFrame = (currentFrame + 1) % DURATION_IN_FRAMES;
      }
      window.requestAnimationFrame(tick);
    }

    window.requestAnimationFrame(tick);
  }

  /* ------------------------------------------------------------------------
     3. COMPOSICIÓN REMOTION #2: ECOSISTEMA & CONSTELACIÓN ORION IA (portafolio.html)
        360 frames @ 60 FPS (6.0s loop) — 4 Escenas Minimalistas en Superficie Blanca
        Cero contadores de frames (0/1000) y cero estética oscura/hacker.
     ------------------------------------------------------------------------ */
  function initOrionEcosystemRemotionPlayer() {
    const root = document.querySelector('[data-remotion-composition="orion-neural-ecosystem"]');
    if (!root) return;

    const canvas = root.querySelector('canvas');
    const progressFill = root.querySelector('.remotion-progress-fill');
    const sceneBtns = root.querySelectorAll('[data-remotion-scene]');
    if (!canvas) return;

    const FPS = 60;
    const DURATION = 360;
    let currentFrame = 0;
    let lockedScene = -1;

    // Estrellas reales de la Constelación de Orión sobre carta astronómica blanca
    const ORION_STARS = [
      { id: 'Betelgeuse', x: 0.28, y: 0.22, r: 6.0, color: '#D97706' },
      { id: 'Bellatrix', x: 0.68, y: 0.25, r: 5.2, color: '#1D4ED8' },
      { id: 'Alnitak', x: 0.42, y: 0.50, r: 4.8, color: '#2563EB', belt: true },
      { id: 'Alnilam', x: 0.50, y: 0.48, r: 5.5, color: '#1D4ED8', belt: true },
      { id: 'Mintaka', x: 0.58, y: 0.46, r: 4.8, color: '#2563EB', belt: true },
      { id: 'Saiph', x: 0.33, y: 0.78, r: 5.0, color: '#4F46E5' },
      { id: 'Rigel', x: 0.72, y: 0.76, r: 6.5, color: '#1D4ED8' }
    ];

    const ORION_EDGES = [
      [0, 1],
      [0, 2],
      [1, 4],
      [2, 3],
      [3, 4],
      [2, 5],
      [4, 6],
      [5, 6]
    ];

    sceneBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-remotion-scene'), 10);
        if (lockedScene === idx) {
          lockedScene = -1;
        } else {
          lockedScene = idx;
          currentFrame = idx * 90;
        }
      });
    });

    function render(frame) {
      const { ctx, w, h } = setupHiDPICanvas(canvas);
      ctx.clearRect(0, 0, w, h);

      // Superficie blanca y alabastro limpia
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, '#FFFFFF');
      grad.addColorStop(1, '#F8FAFC');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Retícula geométrica sutil
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.14)';
      ctx.lineWidth = 1;
      for (let x = 24; x < w; x += 32) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 24; y < h; y += 32) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      const sceneIdx = Math.min(3, Math.floor(frame / 90));
      const localF = frame % 90;
      const sFactor = spring({ frame: localF, fps: FPS, config: { damping: 19, stiffness: 135 } });

      sceneBtns.forEach((b, i) => {
        b.classList.toggle('is-active', i === sceneIdx);
      });

      if (progressFill) {
        progressFill.style.width = `${((frame / DURATION) * 100).toFixed(1)}%`;
      }

      if (sceneIdx === 0) {
        // ESCENA 1: Base Fundacional Qwen 3.8 (Bloques Limpios en Superficie Blanca)
        const cols = 7;
        const rows = 3;
        const cellW = Math.min(42, (w - 90) / cols);
        const cellH = 30;
        const startX = (w - cols * (cellW + 8)) / 2;
        const startY = 44;

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const idx = r * cols + c;
            const wave = Math.sin((localF * 0.12) + idx * 0.45);
            const active = wave > 0.15;
            const x = startX + c * (cellW + 8);
            const y = startY + r * (cellH + 8);
            ctx.fillStyle = active ? '#EFF6FF' : '#FFFFFF';
            ctx.strokeStyle = active ? '#1D4ED8' : '#CBD5E1';
            ctx.lineWidth = active ? 1.5 : 1;
            ctx.beginPath();
            ctx.roundRect(x, y, cellW, cellH, 7);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = active ? '#1D4ED8' : '#94A3B8';
            ctx.beginPath();
            ctx.arc(x + cellW / 2, y + cellH / 2, active ? 3.5 : 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        ctx.fillStyle = '#1D4ED8';
        ctx.font = '700 11px "Plus Jakarta Sans", sans-serif';
        ctx.fillText('Arquitectura Base Qwen 3.8 (Hugging Face) · Comprensión Semántica', 18, h - 34);
        ctx.fillStyle = '#090D16';
        ctx.font = '700 12px "Plus Jakarta Sans", sans-serif';
        ctx.fillText('01 · Capas Fundacionales de Razonamiento y Lenguaje', 18, h - 15);
      } else if (sceneIdx === 1) {
        // ESCENA 2: Adaptación QLoRA en GPUs NVIDIA de 40GB (Tarjetas Minimalistas)
        const cy = h * 0.43;
        const cx = w * 0.5;
        const scale = sFactor;

        // Tarjeta 1: Base 4-bit NF4
        ctx.fillStyle = '#FFFFFF';
        ctx.strokeStyle = '#CBD5E1';
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.roundRect(cx - 148, cy - 48, 92 * scale, 90 * scale, 12);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#090D16';
        ctx.font = '700 11px "Plus Jakarta Sans", sans-serif';
        ctx.fillText('Base NF4', cx - 128, cy - 6);
        ctx.fillStyle = '#64748B';
        ctx.font = '600 9.5px "Inter", sans-serif';
        ctx.fillText('Pesos Base', cx - 129, cy + 12);

        ctx.fillStyle = '#1D4ED8';
        ctx.font = '800 16px "Plus Jakarta Sans", sans-serif';
        ctx.fillText('+', cx - 42, cy + 4);

        // Tarjeta 2: Adaptadores QLoRA
        ctx.fillStyle = '#EEF2FF';
        ctx.strokeStyle = '#4F46E5';
        ctx.beginPath();
        ctx.roundRect(cx - 18, cy - 48, 54 * scale, 90 * scale, 12);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#4F46E5';
        ctx.font = '800 10.5px "Plus Jakarta Sans", sans-serif';
        ctx.fillText('QLoRA', cx - 8, cy + 2);

        // Tarjeta 3: Clúster NVIDIA 40GB
        const vramUsage = interpolate(localF, [0, 85], [28.0, 39.2], { easing: Easing.outCubic });
        ctx.fillStyle = '#ECFDF5';
        ctx.strokeStyle = '#059669';
        ctx.beginPath();
        ctx.roundRect(cx + 50, cy - 48, 106 * scale, 90 * scale, 12);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#059669';
        ctx.font = '800 10.5px "Plus Jakarta Sans", sans-serif';
        ctx.fillText('NVIDIA 40GB', cx + 64, cy - 12);
        ctx.fillStyle = '#090D16';
        ctx.font = '700 11px "Plus Jakarta Sans", sans-serif';
        ctx.fillText(`${vramUsage.toFixed(1)} GB VRAM`, cx + 64, cy + 7);
        ctx.fillStyle = '#047857';
        ctx.font = '600 9px "Inter", sans-serif';
        ctx.fillText('Entrenamiento Dedicado', cx + 56, cy + 24);

        ctx.fillStyle = '#090D16';
        ctx.font = '700 12px "Plus Jakarta Sans", sans-serif';
        ctx.fillText('02 · Refinamiento Matemático QLoRA en Servidores NVIDIA de 40GB', 18, h - 15);
      } else if (sceneIdx === 2) {
        // ESCENA 3: Curva de Auto-Aprendizaje Nocturno sobre Fondo Blanco
        const padX = 42;
        const padY = 34;
        const chartW = w - padX * 2;
        const chartH = h - padY * 2 - 26;

        ctx.strokeStyle = '#CBD5E1';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(padX, padY);
        ctx.lineTo(padX, padY + chartH);
        ctx.lineTo(padX + chartW, padY + chartH);
        ctx.stroke();

        const drawProgress = interpolate(localF, [0, 75], [0.08, 1], { easing: Easing.outCubic });

        // Área bajo la curva de precisión ascendente
        const areaGrad = ctx.createLinearGradient(0, padY, 0, padY + chartH);
        areaGrad.addColorStop(0, 'rgba(29, 78, 216, 0.18)');
        areaGrad.addColorStop(1, 'rgba(29, 78, 216, 0.01)');

        ctx.beginPath();
        ctx.moveTo(padX, padY + chartH);
        for (let i = 0; i <= 60; i++) {
          const t = (i / 60) * drawProgress;
          const x = padX + t * chartW;
          const accuracyNorm = 1 - Math.exp(-3.2 * t) * 0.78;
          const y = padY + (1 - accuracyNorm) * chartH;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(padX + drawProgress * chartW, padY + chartH);
        ctx.closePath();
        ctx.fillStyle = areaGrad;
        ctx.fill();

        ctx.strokeStyle = '#1D4ED8';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        for (let i = 0; i <= 60; i++) {
          const t = (i / 60) * drawProgress;
          const x = padX + t * chartW;
          const accuracyNorm = 1 - Math.exp(-3.2 * t) * 0.78;
          const y = padY + (1 - accuracyNorm) * chartH;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        const precisionVal = (92.0 + 7.4 * drawProgress).toFixed(1);
        ctx.fillStyle = '#059669';
        ctx.font = '700 11px "Plus Jakarta Sans", sans-serif';
        ctx.fillText(`Ciclo Nocturno Automático · Precisión Auditada: ${precisionVal}%`, padX + 12, padY + 18);

        ctx.fillStyle = '#090D16';
        ctx.font = '700 12px "Plus Jakarta Sans", sans-serif';
        ctx.fillText('03 · Evolución y Re-Entrenamiento Nocturno Continuo', 18, h - 15);
      } else {
        // ESCENA 4: Constelación de Orión Minimalista (Carta Astronómica Limpia)
        const lineProgress = interpolate(localF, [0, 45], [0, 1], { easing: Easing.outCubic });

        // Círculo astronómico de referencia sutil
        ctx.strokeStyle = 'rgba(29, 78, 216, 0.10)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(w * 0.5, (h - 24) * 0.5, Math.min(w, h) * 0.34, 0, Math.PI * 2);
        ctx.stroke();

        ORION_EDGES.forEach(([i, j]) => {
          const s1 = ORION_STARS[i];
          const s2 = ORION_STARS[j];
          const x1 = s1.x * w;
          const y1 = s1.y * (h - 28);
          const x2 = x1 + (s2.x * w - x1) * lineProgress;
          const y2 = y1 + (s2.y * (h - 28) - y1) * lineProgress;

          ctx.strokeStyle = s1.belt && s2.belt ? '#1D4ED8' : 'rgba(79, 70, 229, 0.38)';
          ctx.lineWidth = s1.belt && s2.belt ? 2.2 : 1.4;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        });

        ORION_STARS.forEach((star, idx) => {
          const sx = star.x * w;
          const sy = star.y * (h - 28);
          const pulse = 1 + 0.14 * Math.sin((frame + idx * 15) * 0.09);

          ctx.fillStyle = 'rgba(29, 78, 216, 0.10)';
          ctx.beginPath();
          ctx.arc(sx, sy, (star.r + 4) * pulse * sFactor, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = star.color;
          ctx.beginPath();
          ctx.arc(sx, sy, star.r * pulse * sFactor, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#090D16';
          ctx.font = '700 10px "Plus Jakarta Sans", sans-serif';
          ctx.fillText(star.id, sx + 9, sy + 3);
        });

        ctx.fillStyle = '#090D16';
        ctx.font = '700 12px "Plus Jakarta Sans", sans-serif';
        ctx.fillText('04 · Constelación de Orión · Identidad y Red Neural Conectada', 18, h - 15);
      }
    }

    function loop() {
      render(currentFrame);
      if (lockedScene >= 0) {
        const startF = lockedScene * 90;
        const endF = startF + 89;
        currentFrame = currentFrame >= endF ? startF : currentFrame + 1;
      } else {
        currentFrame = (currentFrame + 1) % DURATION;
      }
      window.requestAnimationFrame(loop);
    }

    window.requestAnimationFrame(loop);
  }

  /* ------------------------------------------------------------------------
     4. CONSOLA INTERACTIVA DE HOJA DE RUTA DE 5 AÑOS (2026–2030)
        Sincronizada con Remotion spring() + Curva de Capacidad en Vivo
     ------------------------------------------------------------------------ */
  const ROADMAP_5Y_DATA = {
    2026: {
      year: '2026',
      phase: 'Fase I · Fundación & Producción Comercial',
      headline: 'Núcleo QLoRA Consolidado, IA NYX en CvStudio33 y Agentes B2B',
      summary:
        'Consolidación del motor propietario ORION IA v3.3 sobre base Qwen 3.8 cuantizada en 4-bit NF4 corriendo en servidores NVIDIA de 40GB VRAM. Operación a escala en CvStudio33.com.ar y despliegue de agentes corporativos con memoria vectorial RAG.',
      kpis: {
        context: '128K Tokens',
        latency: '< 15ms Edge',
        precision: '99.4% RAG / ATS'
      },
      curveIndex: 0,
      deliverables: [
        'Motor ORION IA v3.3 operando en vivo como cerebro de IA NYX y simulador AXON en CvStudio33.com.ar.',
        'Ciclo de auto-aprendizaje nocturno activo todas las madrugadas con auditoría automática de pesos.',
        'Laboratorio ORION Quant & Trading Lab en fase de reducción continua de margen de error en backtesting.',
        'Lanzamiento de ORION Web Builder para digitalizar emprendedores sin costos de agencia tradicional.'
      ]
    },
    2027: {
      year: '2027',
      phase: 'Fase II · Razonamiento Agéntico Multi-Paso',
      headline: 'Enjambre de Agentes Autónomos de Ingeniería, Ventas y Finanzas',
      summary:
        'Evolución hacia arquitecturas de razonamiento encadenado (Chain-of-Action) capaces de ejecutar flujos empresariales completos: desde auditoría de código y conciliación financiera hasta cierre autónomo de ventas en múltiples canales.',
      kpis: {
        context: '256K Tokens',
        latency: '< 12ms Edge',
        precision: '99.6% Ejecución'
      },
      curveIndex: 1,
      deliverables: [
        'Agentes ORION con ejecución verificada de herramientas (SQL, pasarelas de pago, CRMs y ERPs).',
        'Reducción proyectada del margen de error en ORION Trading Lab por debajo del 35% mediante ensamble híbrido.',
        'SDK empresarial para integrar ORION IA en sistemas bancarios, logísticos y comercios mayoristas.',
        'Memoria episódica de largo plazo aislada por cliente con cifrado de extremo a extremo.'
      ]
    },
    2028: {
      year: '2028',
      phase: 'Fase III · Inferencia Multimodal en Tiempo Real',
      headline: 'Visión Computacional, Voz Neural Nativa y Documentos Complejos',
      summary:
        'Integración nativa de procesamiento de voz bidireccional sin latencia perceptible, lectura óptica de planos e inventarios industriales y generación de interfaces completas en tiempo real.',
      kpis: {
        context: '512K Tokens',
        latency: '< 9ms Edge',
        precision: '99.7% Multimodal'
      },
      curveIndex: 2,
      deliverables: [
        'Atención telefónica y por voz en tiempo real con síntesis neural indistinguible y latencia sub-200ms.',
        'Análisis visual directo de facturas, contratos legales, radiografías de negocio y catálogos físicos.',
        'Generación autónoma de aplicaciones completas desde ORION Web Builder mediante instrucciones de voz.',
        'Clúster dedicado de inferencia distribuida con balanceo automático multi-región.'
      ]
    },
    2029: {
      year: '2029',
      phase: 'Fase IV · Infraestructura Soberana LATAM & API Pública',
      headline: 'Nodos de Inferencia Regionales y Ecosistema para Desarrolladores',
      summary:
        'Apertura de la plataforma de infraestructura ORION Cloud API para que otras empresas de software, fintechs y gobiernos locales consuman inteligencia artificial entrenada específicamente en normativa, economía y lenguaje hispanoamericano.',
      kpis: {
        context: '1M Tokens',
        latency: '< 7ms Regional',
        precision: '99.85% SLA'
      },
      curveIndex: 3,
      deliverables: [
        'API pública de ORION IA con facturación por token y despliegue on-premise para corporaciones.',
        'Modelos especializados en derecho argentino/latinoamericano, comercio exterior y finanzas cuantitativas.',
        'Marketplace oficial de plugins y conectores certificados por OrionCodeLabs33.',
        'Certificación integral de seguridad internacional ISO/IEC 27001 y SOC 2 Tipo II.'
      ]
    },
    2030: {
      year: '2030',
      phase: 'Fase V · Estándar Global de Ingeniería Autónoma',
      headline: 'Posicionamiento de ORION IA como Referente Mundial en IA Aplicada',
      summary:
        'Consolidación de ORION IA como arquitectura de referencia global para sistemas empresariales autónomos: capaz de diseñar, programar, auditar, asegurar y escalar infraestructuras tecnológicas completas con supervisión humana estratégica.',
      kpis: {
        context: '2M+ Tokens',
        latency: '< 5ms Global',
        precision: '99.95% Autónomo'
      },
      curveIndex: 4,
      deliverables: [
        'Arquitectura neural auto-optimizada de quinta generación operando en red global descentralizada.',
        'Ingeniería de software asistida al 100% con verificación formal matemática de ciberseguridad.',
        'Presencia comercial consolidada en América Latina, Estados Unidos y Europa.',
        'Ecosistema de productos SaaS propios liderando sus verticales de mercado.'
      ]
    }
  };

  function initOrionRoadmapConsole() {
    const consoleEl = document.getElementById('orion-roadmap-console');
    if (!consoleEl) return;

    const yearBtns = consoleEl.querySelectorAll('[data-roadmap-year]');
    const phaseEl = document.getElementById('roadmap-active-phase');
    const titleEl = document.getElementById('roadmap-active-title');
    const summaryEl = document.getElementById('roadmap-active-summary');
    const kpiContextEl = document.getElementById('roadmap-kpi-context');
    const kpiLatencyEl = document.getElementById('roadmap-kpi-latency');
    const kpiPrecisionEl = document.getElementById('roadmap-kpi-precision');
    const listEl = document.getElementById('roadmap-active-deliverables');
    const canvas = document.getElementById('roadmap-evolution-canvas');

    let activeYear = '2026';
    let animFrame = 0;
    let targetIndex = 0;
    let currentAnimatedIndex = 0;

    function selectYear(yearKey) {
      const data = ROADMAP_5Y_DATA[yearKey];
      if (!data) return;
      activeYear = yearKey;
      targetIndex = data.curveIndex;
      animFrame = 0;

      yearBtns.forEach((btn) => {
        const isCurrent = btn.getAttribute('data-roadmap-year') === yearKey;
        btn.classList.toggle('is-active', isCurrent);
        btn.setAttribute('aria-selected', isCurrent ? 'true' : 'false');
      });

      if (phaseEl) phaseEl.textContent = data.phase;
      if (titleEl) titleEl.textContent = data.headline;
      if (summaryEl) summaryEl.textContent = data.summary;
      if (kpiContextEl) kpiContextEl.textContent = data.kpis.context;
      if (kpiLatencyEl) kpiLatencyEl.textContent = data.kpis.latency;
      if (kpiPrecisionEl) kpiPrecisionEl.textContent = data.kpis.precision;

      if (listEl) {
        listEl.innerHTML = data.deliverables
          .map(
            (item) =>
              `<li><span style="color:var(--brand-blue);font-weight:800;">✓</span><span>${item}</span></li>`
          )
          .join('');
      }
    }

    yearBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        selectYear(btn.getAttribute('data-roadmap-year'));
      });
    });

    function renderRoadmapChart() {
      if (!canvas) return;
      const { ctx, w, h } = setupHiDPICanvas(canvas);
      ctx.clearRect(0, 0, w, h);

      animFrame = Math.min(90, animFrame + 1);
      const s = spring({ frame: animFrame, fps: 60, config: { damping: 18, stiffness: 120 } });
      currentAnimatedIndex = currentAnimatedIndex + (targetIndex - currentAnimatedIndex) * 0.14;

      const padL = 36;
      const padR = 24;
      const padT = 26;
      const padB = 34;
      const cw = w - padL - padR;
      const ch = h - padT - padB;

      // Líneas horizontales de referencia
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.14)';
      ctx.lineWidth = 1;
      for (let i = 0; i <= 3; i++) {
        const y = padT + (ch / 3) * i;
        ctx.beginPath();
        ctx.moveTo(padL, y);
        ctx.lineTo(padL + cw, y);
        ctx.stroke();
      }

      const years = ['2026', '2027', '2028', '2029', '2030'];
      const values = [0.22, 0.42, 0.64, 0.84, 0.98];
      const points = years.map((yr, i) => ({
        year: yr,
        x: padL + (cw / (years.length - 1)) * i,
        y: padT + ch * (1 - values[i])
      }));

      // Área bajo la curva en superficie blanca
      const areaGrad = ctx.createLinearGradient(0, padT, 0, padT + ch);
      areaGrad.addColorStop(0, 'rgba(29, 78, 216, 0.16)');
      areaGrad.addColorStop(1, 'rgba(29, 78, 216, 0.01)');

      ctx.beginPath();
      ctx.moveTo(points[0].x, padT + ch);
      points.forEach((p) => ctx.lineTo(p.x, p.y));
      ctx.lineTo(points[points.length - 1].x, padT + ch);
      ctx.closePath();
      ctx.fillStyle = areaGrad;
      ctx.fill();

      // Línea principal de crecimiento
      ctx.strokeStyle = '#1D4ED8';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      points.forEach((p, i) => {
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.stroke();

      // Nodos por año
      points.forEach((p, i) => {
        const isSelected = i === targetIndex;
        const r = isSelected ? 6.5 * s : 4.2;
        ctx.fillStyle = isSelected ? '#1D4ED8' : '#FFFFFF';
        ctx.strokeStyle = isSelected ? '#EFF6FF' : '#94A3B8';
        ctx.lineWidth = isSelected ? 2.5 : 1.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = isSelected ? '#1D4ED8' : '#64748B';
        ctx.font = isSelected ? '800 11px "Plus Jakarta Sans", sans-serif' : '600 10px "Inter", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(p.year, p.x, h - 10);
      });
      ctx.textAlign = 'left';

      window.requestAnimationFrame(renderRoadmapChart);
    }

    selectYear(activeYear);
    window.requestAnimationFrame(renderRoadmapChart);
  }

  /* ------------------------------------------------------------------------
     5. MOTOR HYPERFRAMES SEEK-SAFE TIMELINE (window.__timelines)
        Controla composiciones [data-composition-id] sin chocar con Remotion
     ------------------------------------------------------------------------ */
  function initHyperFramesCompositions() {
    const compositions = document.querySelectorAll('[data-composition-id]');
    if (!compositions.length) return;

    compositions.forEach((comp) => {
      const id = comp.getAttribute('data-composition-id');
      const clips = comp.querySelectorAll('.hf-clip');
      let currentTime = 0;

      const controller = {
        id,
        duration: parseFloat(comp.getAttribute('data-duration') || '4'),
        seek(t) {
          currentTime = t;
          clips.forEach((clip, idx) => {
            const start = parseFloat(clip.getAttribute('data-start') || String(idx * 0.12));
            const progress = clamp((currentTime - start) / 0.55, 0, 1);
            const eased = Easing.outCubic(progress);
            clip.style.opacity = String(eased);
          });
        },
        play() {
          const startTs = performance.now();
          function step(now) {
            const elapsed = (now - startTs) / 1000;
            controller.seek(elapsed);
            if (elapsed < controller.duration) {
              window.requestAnimationFrame(step);
            }
          }
          window.requestAnimationFrame(step);
        }
      };

      window.__timelines[id] = controller;
      controller.play();
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initHeroRemotionComposition();
    initOrionEcosystemRemotionPlayer();
    initOrionRoadmapConsole();
    initHyperFramesCompositions();
  });
})();
