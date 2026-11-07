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
        300 frames @ 60 FPS (5.0s loop) — 3 Escenas de Ingeniería en Vivo
     ------------------------------------------------------------------------ */
  function initHeroRemotionComposition() {
    const root = document.querySelector('[data-remotion-composition="hero-architecture"]');
    if (!root) return;

    const canvas = root.querySelector('canvas');
    const frameBadge = root.querySelector('[data-remotion-frame]');
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

    function renderFrame(frame) {
      const { ctx, w, h } = setupHiDPICanvas(canvas);
      ctx.clearRect(0, 0, w, h);

      // Fondo arquitectónico técnico
      ctx.fillStyle = '#090D16';
      ctx.fillRect(0, 0, w, h);

      // Grilla de precisión
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.08)';
      ctx.lineWidth = 1;
      const step = 28;
      for (let x = 0; x < w; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      const sceneIndex = Math.min(2, Math.floor(frame / 100));
      const localFrame = frame % 100;
      const enterSpring = spring({ frame: localFrame, fps: FPS, config: { damping: 18, stiffness: 130 } });

      sceneBtns.forEach((b, idx) => {
        b.classList.toggle('is-active', idx === sceneIndex);
      });

      if (frameBadge) {
        frameBadge.textContent = `ESCENA 0${sceneIndex + 1} · FRAME ${String(frame).padStart(3, '0')}/${DURATION_IN_FRAMES} · 60 FPS`;
      }
      if (progressFill) {
        progressFill.style.width = `${((frame / DURATION_IN_FRAMES) * 100).toFixed(1)}%`;
      }

      const cx = w / 2;
      const cy = h / 2;

      if (sceneIndex === 0) {
        // ESCENA 1: Arquitectura Web & Apps a Medida
        const boxW = Math.min(w * 0.78, 360) * enterSpring;
        const boxH = Math.min(h * 0.62, 165) * enterSpring;
        const bx = cx - boxW / 2;
        const by = cy - boxH / 2;

        ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
        ctx.strokeStyle = '#38BDF8';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(bx, by, boxW, boxH, 12);
        ctx.fill();
        ctx.stroke();

        // Barra superior del wireframe
        ctx.fillStyle = 'rgba(56, 189, 248, 0.14)';
        ctx.fillRect(bx + 12, by + 12, boxW - 24, 22);

        // Bloques modulares internos animados con interpolate()
        const colProgress = interpolate(localFrame, [8, 55], [0, 1], { easing: Easing.outCubic });
        const innerW = (boxW - 36) / 3;
        const colors = ['#2563EB', '#38BDF8', '#10B981'];
        const labels = ['UI / UX', 'API REST', 'SQL / RLS'];

        for (let i = 0; i < 3; i++) {
          const ix = bx + 12 + i * (innerW + 6);
          const iy = by + 44;
          const ih = (boxH - 58) * colProgress;
          ctx.fillStyle = 'rgba(30, 41, 59, 0.9)';
          ctx.strokeStyle = colors[i];
          ctx.beginPath();
          ctx.roundRect(ix, iy, innerW, Math.max(24, ih), 8);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = '#F8FAFC';
          ctx.font = '700 11px "Plus Jakarta Sans", sans-serif';
          ctx.fillText(labels[i], ix + 10, iy + 22);
        }

        ctx.fillStyle = '#E2E8F0';
        ctx.font = '700 12px "Plus Jakarta Sans", sans-serif';
        ctx.fillText('01 · Ingeniería de Plataformas Web & Apps Nativas', 18, h - 16);
      } else if (sceneIndex === 1) {
        // ESCENA 2: Integración del Motor Propietario ORION IA
        const nodes = [
          { x: cx - 115, y: cy - 38, label: 'Qwen 3.8 Base' },
          { x: cx - 115, y: cy + 38, label: 'Datos Negocio' },
          { x: cx, y: cy, label: 'ORION IA v3.3', main: true },
          { x: cx + 115, y: cy - 38, label: 'Web / SaaS' },
          { x: cx + 115, y: cy + 38, label: 'WhatsApp 24/7' }
        ];

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
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(na.x, na.y);
          ctx.lineTo(nb.x, nb.y);
          ctx.stroke();

          const p = (pulse * 2 + idx * 0.25) % 1;
          const px = na.x + (nb.x - na.x) * p;
          const py = na.y + (nb.y - na.y) * p;
          ctx.fillStyle = '#38BDF8';
          ctx.beginPath();
          ctx.arc(px, py, 4, 0, Math.PI * 2);
          ctx.fill();
        });

        nodes.forEach((n) => {
          const r = n.main ? 34 * enterSpring : 22 * enterSpring;
          ctx.fillStyle = n.main ? '#1D4ED8' : '#0F172A';
          ctx.strokeStyle = n.main ? '#38BDF8' : '#475569';
          ctx.lineWidth = n.main ? 2.2 : 1.4;
          ctx.beginPath();
          ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = '#FFFFFF';
          ctx.font = n.main ? '700 10px "Plus Jakarta Sans", sans-serif' : '600 9.5px "Inter", sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(n.label, n.x, n.y + (n.main ? 3 : r + 14));
        });
        ctx.textAlign = 'left';
        ctx.fillStyle = '#E2E8F0';
        ctx.font = '700 12px "Plus Jakarta Sans", sans-serif';
        ctx.fillText('02 · Núcleo Propietario ORION IA (QLoRA + RAG Vectorial)', 18, h - 16);
      } else {
        // ESCENA 3: Despliegue Global Edge + Ciberseguridad + Resultados
        const bars = [
          { label: 'Latencia Global Edge (<15ms)', val: 0.94, color: '#38BDF8' },
          { label: 'Blindaje WAF L7 & Zero-Trust', val: 0.99, color: '#10B981' },
          { label: 'Disponibilidad SLA 99.99%', val: 0.98, color: '#818CF8' }
        ];

        const barW = Math.min(w - 48, 350);
        const startX = (w - barW) / 2;
        bars.forEach((b, i) => {
          const y = 42 + i * 52;
          const fillRatio = b.val * interpolate(localFrame, [5 + i * 8, 55 + i * 8], [0, 1], { easing: Easing.outQuart });

          ctx.fillStyle = '#E2E8F0';
          ctx.font = '600 11px "Inter", sans-serif';
          ctx.fillText(b.label, startX, y);

          ctx.fillStyle = 'rgba(255,255,255,0.08)';
          ctx.beginPath();
          ctx.roundRect(startX, y + 8, barW, 12, 6);
          ctx.fill();

          ctx.fillStyle = b.color;
          ctx.beginPath();
          ctx.roundRect(startX, y + 8, Math.max(12, barW * fillRatio), 12, 6);
          ctx.fill();
        });

        ctx.fillStyle = '#E2E8F0';
        ctx.font = '700 12px "Plus Jakarta Sans", sans-serif';
        ctx.fillText('03 · Producción en Vivo · Propiedad Intelectual 100% del Cliente', 18, h - 16);
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
        360 frames @ 60 FPS (6.0s loop) — 4 Escenas Cinematográficas en Código Puro
     ------------------------------------------------------------------------ */
  function initOrionEcosystemRemotionPlayer() {
    const root = document.querySelector('[data-remotion-composition="orion-neural-ecosystem"]');
    if (!root) return;

    const canvas = root.querySelector('canvas');
    const frameBadge = root.querySelector('[data-remotion-frame]');
    const progressFill = root.querySelector('.remotion-progress-fill');
    const sceneBtns = root.querySelectorAll('[data-remotion-scene]');
    if (!canvas) return;

    const FPS = 60;
    const DURATION = 360;
    let currentFrame = 0;
    let lockedScene = -1;

    // Estrellas reales de la Constelación de Orión (Coordenadas normalizadas 0..1)
    const ORION_STARS = [
      { id: 'Betelgeuse', x: 0.28, y: 0.22, r: 6.5, color: '#F59E0B' },
      { id: 'Bellatrix', x: 0.68, y: 0.25, r: 5.5, color: '#38BDF8' },
      { id: 'Alnitak', x: 0.42, y: 0.50, r: 5.0, color: '#60A5FA', belt: true },
      { id: 'Alnilam', x: 0.50, y: 0.48, r: 5.8, color: '#FFFFFF', belt: true },
      { id: 'Mintaka', x: 0.58, y: 0.46, r: 5.0, color: '#60A5FA', belt: true },
      { id: 'Saiph', x: 0.33, y: 0.80, r: 5.2, color: '#38BDF8' },
      { id: 'Rigel', x: 0.72, y: 0.78, r: 7.0, color: '#818CF8' }
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

      // Fondo espacial técnico
      const grad = ctx.createRadialGradient(w * 0.5, h * 0.48, 10, w * 0.5, h * 0.5, Math.max(w, h) * 0.75);
      grad.addColorStop(0, '#111C38');
      grad.addColorStop(1, '#060913');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Retícula matemática
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.06)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 32) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 32) {
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

      if (frameBadge) {
        frameBadge.textContent = `SEC 0${sceneIdx + 1}/04 · FRAME ${String(frame).padStart(3, '0')}/${DURATION} · 60 FPS`;
      }
      if (progressFill) {
        progressFill.style.width = `${((frame / DURATION) * 100).toFixed(1)}%`;
      }

      if (sceneIdx === 0) {
        // ESCENA 1: Ingesta Base Qwen 3.8 desde Hugging Face
        const cols = 8;
        const rows = 4;
        const cellW = Math.min(36, (w - 90) / cols);
        const cellH = 26;
        const startX = (w - cols * (cellW + 6)) / 2;
        const startY = 48;

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const idx = r * cols + c;
            const active = ((localF + idx * 3) % 40) < 20;
            const x = startX + c * (cellW + 6);
            const y = startY + r * (cellH + 6);
            ctx.fillStyle = active ? 'rgba(37, 99, 235, 0.42)' : 'rgba(15, 23, 42, 0.85)';
            ctx.strokeStyle = active ? '#38BDF8' : 'rgba(148, 163, 184, 0.25)';
            ctx.beginPath();
            ctx.roundRect(x, y, cellW, cellH, 5);
            ctx.fill();
            ctx.stroke();
          }
        }

        ctx.fillStyle = '#38BDF8';
        ctx.font = '600 11px "JetBrains Mono", monospace';
        ctx.fillText('BASE: HuggingFace / Qwen-3.8-Foundation · Tensor Stream FP16', 18, h - 36);
        ctx.fillStyle = '#F8FAFC';
        ctx.font = '700 12.5px "Plus Jakarta Sans", sans-serif';
        ctx.fillText('Escena 01 · Tokenización Semántica y Pesos Base Qwen 3.8', 18, h - 16);
      } else if (sceneIdx === 1) {
        // ESCENA 2: Matrices QLoRA (W0 + B x A) en NVIDIA 40GB VRAM
        const cy = h * 0.44;
        const cx = w * 0.5;
        const scale = sFactor;

        // Matriz W0 Congelada (4-bit NF4)
        ctx.fillStyle = 'rgba(30, 41, 59, 0.92)';
        ctx.strokeStyle = '#60A5FA';
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.roundRect(cx - 145, cy - 52, 92 * scale, 96 * scale, 10);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '700 11px "Plus Jakarta Sans", sans-serif';
        ctx.fillText('W0 (NF4)', cx - 126, cy - 4);
        ctx.fillStyle = '#94A3B8';
        ctx.font = '500 9.5px "JetBrains Mono", monospace';
        ctx.fillText('4-bit Frozen', cx - 132, cy + 14);

        // Signo +
        ctx.fillStyle = '#38BDF8';
        ctx.font = '700 18px "JetBrains Mono", monospace';
        ctx.fillText('+', cx - 38, cy + 4);

        // Matrices Adaptadoras LoRA B x A
        ctx.fillStyle = 'rgba(109, 40, 217, 0.35)';
        ctx.strokeStyle = '#A855F7';
        ctx.beginPath();
        ctx.roundRect(cx - 14, cy - 52, 46 * scale, 96 * scale, 8);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#F8FAFC';
        ctx.font = '700 10px "JetBrains Mono", monospace';
        ctx.fillText('B·A', cx - 2, cy + 2);

        // Flecha hacia GPU NVIDIA 40GB
        const vramUsage = interpolate(localF, [0, 85], [24.2, 38.6], { easing: Easing.outCubic });
        ctx.fillStyle = 'rgba(4, 120, 87, 0.28)';
        ctx.strokeStyle = '#10B981';
        ctx.beginPath();
        ctx.roundRect(cx + 48, cy - 52, 108 * scale, 96 * scale, 10);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#34D399';
        ctx.font = '700 10.5px "Plus Jakarta Sans", sans-serif';
        ctx.fillText('NVIDIA 40GB', cx + 62, cy - 16);
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '700 11px "JetBrains Mono", monospace';
        ctx.fillText(`${vramUsage.toFixed(1)} GB VRAM`, cx + 60, cy + 6);
        ctx.fillStyle = '#A7F3D0';
        ctx.font = '500 9.5px "JetBrains Mono", monospace';
        ctx.fillText('Rank r=64 · α=128', cx + 58, cy + 26);

        ctx.fillStyle = '#F8FAFC';
        ctx.font = '700 12.5px "Plus Jakarta Sans", sans-serif';
        ctx.fillText('Escena 02 · Adaptación Matemática QLoRA en GPUs NVIDIA de 40GB', 18, h - 16);
      } else if (sceneIdx === 2) {
        // ESCENA 3: Auto-Aprendizaje Nocturno (Descenso de Gradiente & Loss Curve)
        const padX = 42;
        const padY = 38;
        const chartW = w - padX * 2;
        const chartH = h - padY * 2 - 26;

        ctx.strokeStyle = 'rgba(148, 163, 184, 0.3)';
        ctx.beginPath();
        ctx.moveTo(padX, padY);
        ctx.lineTo(padX, padY + chartH);
        ctx.lineTo(padX + chartW, padY + chartH);
        ctx.stroke();

        const drawProgress = interpolate(localF, [0, 75], [0.05, 1], { easing: Easing.outCubic });
        const maxX = padX + chartW * drawProgress;

        ctx.strokeStyle = '#38BDF8';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        for (let i = 0; i <= 60; i++) {
          const t = (i / 60) * drawProgress;
          const x = padX + t * chartW;
          const lossNormalized = Math.exp(-3.2 * t) * 0.82 + 0.12;
          const y = padY + (1 - lossNormalized) * chartH;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        const currentLoss = (1.84 * Math.exp(-1.9 * drawProgress)).toFixed(3);
        ctx.fillStyle = '#34D399';
        ctx.font = '700 11px "JetBrains Mono", monospace';
        ctx.fillText(`CICLO NOCTURNO 03:00 AM · LOSS: ${currentLoss} · PESOS AUDITADOS`, padX + 12, padY + 20);

        ctx.fillStyle = '#F8FAFC';
        ctx.font = '700 12.5px "Plus Jakarta Sans", sans-serif';
        ctx.fillText('Escena 03 · Re-Entrenamiento Nocturno Autónomo y Consolidación', 18, h - 16);
      } else {
        // ESCENA 4: Constelación de Orión & Inferencia en Producción
        const lineProgress = interpolate(localF, [0, 45], [0, 1], { easing: Easing.outCubic });

        ORION_EDGES.forEach(([i, j]) => {
          const s1 = ORION_STARS[i];
          const s2 = ORION_STARS[j];
          const x1 = s1.x * w;
          const y1 = s1.y * (h - 28);
          const x2 = x1 + (s2.x * w - x1) * lineProgress;
          const y2 = y1 + (s2.y * (h - 28) - y1) * lineProgress;

          ctx.strokeStyle = s1.belt && s2.belt ? '#38BDF8' : 'rgba(129, 140, 248, 0.55)';
          ctx.lineWidth = s1.belt && s2.belt ? 2.2 : 1.3;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        });

        ORION_STARS.forEach((star, idx) => {
          const sx = star.x * w;
          const sy = star.y * (h - 28);
          const pulse = 1 + 0.18 * Math.sin((frame + idx * 15) * 0.1);

          ctx.fillStyle = star.color;
          ctx.beginPath();
          ctx.arc(sx, sy, star.r * pulse * sFactor, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#E2E8F0';
          ctx.font = '600 10px "Plus Jakarta Sans", sans-serif';
          ctx.fillText(star.id, sx + 9, sy + 3);
        });

        ctx.fillStyle = '#F8FAFC';
        ctx.font = '700 12.5px "Plus Jakarta Sans", sans-serif';
        ctx.fillText('Escena 04 · Constelación Neural ORION IA Conectada al Ecosistema', 18, h - 16);
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

      // Área bajo la curva
      const areaGrad = ctx.createLinearGradient(0, padT, 0, padT + ch);
      areaGrad.addColorStop(0, 'rgba(56, 189, 248, 0.32)');
      areaGrad.addColorStop(1, 'rgba(56, 189, 248, 0.0)');

      ctx.beginPath();
      ctx.moveTo(points[0].x, padT + ch);
      points.forEach((p) => ctx.lineTo(p.x, p.y));
      ctx.lineTo(points[points.length - 1].x, padT + ch);
      ctx.closePath();
      ctx.fillStyle = areaGrad;
      ctx.fill();

      // Línea principal de crecimiento
      ctx.strokeStyle = '#38BDF8';
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
        const r = isSelected ? 6.5 * s : 4;
        ctx.fillStyle = isSelected ? '#38BDF8' : '#1E293B';
        ctx.strokeStyle = isSelected ? '#FFFFFF' : '#64748B';
        ctx.lineWidth = isSelected ? 2 : 1.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = isSelected ? '#38BDF8' : '#94A3B8';
        ctx.font = isSelected ? '700 11px "Plus Jakarta Sans", sans-serif' : '500 10px "Inter", sans-serif';
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
