/**
 * ==========================================================================
 * OrionCodeLabs33 — Pure Vanilla JS Animation Engine
 * Archivo 4: assets/js/animations.js
 * - Animación "Si puedes imaginarlo, Podemos crearlo" (Sin etiquetas "render",
 *   caja 100% bloqueada sin estirar jamás la pantalla)
 * - Coreografía Scroll-Reveal con IntersectionObserver
 * - Control automático del video del logo en loop silencioso en el Footer
 * ==========================================================================
 */

(function () {
  'use strict';

  const PHRASE = 'Si puedes imaginarlo, Podemos crearlo';

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /**
   * Formatea la cadena como código puro:
   * <code>"Si puedes imaginarlo, Podemos crearlo"</code>
   */
  function formatCodeStep(charCount) {
    const openTag = '<code>';
    const quote1 = '"';
    const body = PHRASE;
    const quote2 = '"';
    const closeTag = '</code>';

    const full = openTag + quote1 + body + quote2 + closeTag;
    const sliced = full.slice(0, charCount);

    let html = '';

    // 1. <code>
    const p1 = sliced.slice(0, openTag.length);
    if (p1) {
      html += `<span class="c-tag">${escapeHtml(p1)}</span>`;
    }

    // 2. "Si puedes imaginarlo, Podemos crearlo"
    const bodyEnd = openTag.length + quote1.length + body.length + quote2.length;
    if (sliced.length > openTag.length) {
      const p2 = sliced.slice(openTag.length, Math.min(sliced.length, bodyEnd));
      html += `<span class="c-str">${escapeHtml(p2)}</span>`;
    }

    // 3. </code>
    if (sliced.length > bodyEnd) {
      const p3 = sliced.slice(bodyEnd);
      html += `<span class="c-tag">${escapeHtml(p3)}</span>`;
    }

    return html;
  }

  /**
   * Motor principal de la frase en el subtítulo:
   * Escribe en código -> Glitch -> Frase limpia -> Glitch -> Vuelve a código
   */
  function initOrionMottoAnimation() {
    const box = document.getElementById('orion-motto-box');
    if (!box) return;

    const codeTarget = box.querySelector('#motto-code-text');
    if (!codeTarget) return;

    const fullLength = ('<code>"' + PHRASE + '"</code>').length;
    const glitchStepsToRender = [
      '<Si puedes imaginarlo, Podemos crearlo />',
      '{ Si puedes imaginarlo, Podemos crearlo }',
      'Si puedes imaginarlo, Podemos crearlo'
    ];
    const glitchStepsToCode = [
      '{ Si puedes imaginarlo, Podemos crearlo }',
      '<code>"Si puedes imaginarlo..."</code>',
      '<code>"Si puedes imaginarlo, Podemos crearlo"</code>'
    ];

    let idx = 0;
    let timer = null;

    function phase1WriteCode() {
      box.classList.remove('is-rendered', 'is-glitching');
      idx = 0;

      function nextChar() {
        idx++;
        codeTarget.innerHTML = formatCodeStep(idx);

        if (idx < fullLength) {
          const speed = 26 + Math.floor(Math.random() * 24);
          timer = window.setTimeout(nextChar, speed);
        } else {
          timer = window.setTimeout(phase2GlitchToRender, 650);
        }
      }

      nextChar();
    }

    function phase2GlitchToRender() {
      box.classList.add('is-glitching');
      let step = 0;
      box.setAttribute('data-glitch', glitchStepsToRender[0]);

      const iv = window.setInterval(() => {
        step++;
        if (step < glitchStepsToRender.length) {
          box.setAttribute('data-glitch', glitchStepsToRender[step]);
        }
      }, 115);

      timer = window.setTimeout(() => {
        window.clearInterval(iv);
        phase3ShowCleanPhrase();
      }, 360);
    }

    function phase3ShowCleanPhrase() {
      box.classList.remove('is-glitching');
      box.classList.add('is-rendered');

      timer = window.setTimeout(phase4GlitchToCode, 3400);
    }

    function phase4GlitchToCode() {
      box.classList.add('is-glitching');
      let step = 0;
      box.setAttribute('data-glitch', glitchStepsToCode[0]);

      const iv = window.setInterval(() => {
        step++;
        if (step < glitchStepsToCode.length) {
          box.setAttribute('data-glitch', glitchStepsToCode[step]);
        }
      }, 115);

      timer = window.setTimeout(() => {
        window.clearInterval(iv);
        phase1WriteCode();
      }, 360);
    }

    phase1WriteCode();
  }

  /**
   * Coreografía de aparición progresiva al hacer scroll
   */
  function initScrollReveal() {
    const targets = document.querySelectorAll(
      '.service-category-card, .bento-card, .tech-logo-card, .showcase-row, .reveal-on-scroll'
    );
    if (!targets.length || !('IntersectionObserver' in window)) return;

    targets.forEach((el, i) => {
      el.classList.add('reveal-on-scroll');
      el.style.transitionDelay = `${(i % 6) * 45}ms`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    targets.forEach((el) => observer.observe(el));
  }

  /**
   * Iluminación Spotlight en tarjetas y reproducción garantizada del video en el Footer
   */
  function initInteractiveAndVideo() {
    const cards = document.querySelectorAll('.spotlight-card');
    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      });
    });

    // Asegura que todos los videos del logo estén silenciados y en loop continuo
    const videos = document.querySelectorAll('.footer-logo-video');
    videos.forEach((vid) => {
      vid.muted = true;
      vid.loop = true;
      vid.playsInline = true;
      const playPromise = vid.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {});
      }
    });
  }

  /**
   * Motor de Métricas Animadas en Vivo (Caso de Éxito CvStudio33):
   * Sube progresivamente (+200k TikTok, +15.000 visitas web, +1.000 CVs,
   * +1.000 USD ventas web, +200 contratados 1er mes) y llena barras de progreso.
   */
  function initLiveMetricsCounter() {
    const metricCards = document.querySelectorAll('.cvstudio-metric-card');
    if (!metricCards.length) return;

    function formatMetricNumber(val, formatType) {
      const rounded = Math.round(val);
      if (formatType === 'dot-thousands') {
        return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      }
      return String(rounded);
    }

    function animateCard(card, delayMs) {
      if (card.dataset.animated === '1') return;
      card.dataset.animated = '1';

      const valEl = card.querySelector('[data-metric-target]');
      const barEl = card.querySelector('.metric-progress-fill');
      if (!valEl) return;

      const target = parseFloat(valEl.dataset.metricTarget || '100');
      const prefix = valEl.dataset.metricPrefix || '+';
      const suffix = valEl.dataset.metricSuffix || '';
      const fmt = valEl.dataset.metricFormat || 'plain';
      const barWidth = barEl ? (barEl.dataset.progressTarget || '92%') : '92%';

      window.setTimeout(() => {
        if (barEl) {
          barEl.style.width = barWidth;
        }

        const duration = 2100;
        const startTime = performance.now();

        function stepFrame(now) {
          const elapsed = now - startTime;
          const progress = Math.min(1, elapsed / duration);
          // Easing suave pero progresivo (easeOutQuart)
          const eased = 1 - Math.pow(1 - progress, 4);
          const currentVal = target * eased;

          valEl.textContent = `${prefix}${formatMetricNumber(currentVal, fmt)}${suffix}`;

          if (progress < 1) {
            window.requestAnimationFrame(stepFrame);
          } else {
            valEl.textContent = `${prefix}${formatMetricNumber(target, fmt)}${suffix}`;
          }
        }

        window.requestAnimationFrame(stepFrame);
      }, delayMs);
    }

    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const allCards = entry.target.querySelectorAll('.cvstudio-metric-card');
              if (allCards.length) {
                allCards.forEach((c, idx) => animateCard(c, idx * 140));
              } else if (entry.target.classList.contains('cvstudio-metric-card')) {
                animateCard(entry.target, 0);
              }
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );

      const wrappers = document.querySelectorAll('.cvstudio-live-metrics-wrap');
      if (wrappers.length) {
        wrappers.forEach((w) => obs.observe(w));
      } else {
        metricCards.forEach((c) => obs.observe(c));
      }
    } else {
      metricCards.forEach((c, idx) => animateCard(c, idx * 120));
    }
  }

  /**
   * Motor Automático en Loop Infinito ("Cómo construimos tu proyecto paso a paso" en portafolio.html)
   * Corre solo automáticamente en loop continuo alternando entre Código en Vivo y App UI Renderizada
   * sin requerir clics manuales del usuario.
   */
  function initProcess3DScrollEngine() {
    const steps = document.querySelectorAll('.process-3d-step');
    if (!steps.length) return;

    function triggerCompilerTransition(compilerEl, toCompiled) {
      if (!compilerEl || compilerEl.dataset.busy === '1') return;
      compilerEl.dataset.busy = '1';
      compilerEl.classList.add('is-compiling');

      window.setTimeout(() => {
        compilerEl.classList.remove('is-compiling');
        if (toCompiled) {
          compilerEl.classList.add('is-compiled');
        } else {
          compilerEl.classList.remove('is-compiled');
        }
        const btn = compilerEl.querySelector('.compiler-mode-toggle');
        if (btn) {
          btn.textContent = compilerEl.classList.contains('is-compiled')
            ? '⚡ Loop Activo: Vista App en Vivo'
            : '⚡ Loop Activo: Sintetizando Código';
        }
        compilerEl.dataset.busy = '0';
      }, 320);
    }

    steps.forEach((step, index) => {
      step.classList.add('is-in-3d-focus');
      const compiler = step.querySelector('.code-render-compiler');
      const toggleBtn = step.querySelector('.compiler-mode-toggle');

      // Permite clic opcional, pero funciona 100% solo en loop automático
      if (compiler && toggleBtn) {
        toggleBtn.addEventListener('click', () => {
          const nextState = !compiler.classList.contains('is-compiled');
          triggerCompilerTransition(compiler, nextState);
        });
      }

      if (compiler) {
        // Inicia alternancia automática desfasada por etapa para que toda la página tenga vida en loop
        const initialDelay = 900 + index * 1100;
        window.setTimeout(() => {
          triggerCompilerTransition(compiler, true);
          window.setInterval(() => {
            const nextState = !compiler.classList.contains('is-compiled');
            triggerCompilerTransition(compiler, nextState);
          }, 4600);
        }, initialDelay);
      }
    });

    // Rotación automática de foco luminoso entre las etapas
    let activeStepIdx = 0;
    window.setInterval(() => {
      steps.forEach((s, idx) => {
        s.classList.toggle('is-loop-active', idx === activeStepIdx);
      });
      activeStepIdx = (activeStepIdx + 1) % steps.length;
    }, 3200);
  }

  /**
   * 5. MOTOR ESPACIAL DE LA CONSTELACIÓN DE ORIÓN AL DESLIZAR (portafolio.html#orion-ia)
   */
  function initOrionConstellationScroll() {
    const stage = document.querySelector('.orion-constellation-stage');
    if (!stage) return;

    const svg = stage.querySelector('.constellation-svg-viewport');
    const telemetryBadge = stage.querySelector('#orion-live-epoch-status');
    const epochs = [
      'QWEN 3.8 BASE // QLORA 4-BIT NF4 · VRAM 21.8 / 40.0 GB NVIDIA',
      'AUTO-APRENDIZAJE NOCTURNO ACTIVO // EPOCH #334 · LOSS 0.041',
      'CINTURÓN DE ORIÓN SINCRONIZADO // ALNITAK · ALNILAM · MINTAKA',
      'HUGGING FACE WEIGHTS // ADAPTADORES LORA R=64 · BF16 PRECISION'
    ];

    if (telemetryBadge) {
      let epIdx = 0;
      window.setInterval(() => {
        epIdx = (epIdx + 1) % epochs.length;
        telemetryBadge.textContent = epochs[epIdx];
      }, 3100);
    }

    if (svg) {
      window.addEventListener(
        'scroll',
        () => {
          const rect = stage.getBoundingClientRect();
          const vh = window.innerHeight || 800;
          if (rect.top < vh && rect.bottom > 0) {
            const ratio = Math.max(-1, Math.min(1, (vh / 2 - (rect.top + rect.height / 2)) / (vh / 2)));
            const ringGroup = svg.querySelector('#orion-space-ring');
            const starsGroup = svg.querySelector('#orion-space-stars');
            if (ringGroup) {
              ringGroup.style.transform = `rotate(${ratio * 12}deg)`;
              ringGroup.style.transformOrigin = '210px 135px';
            }
            if (starsGroup) {
              starsGroup.style.transform = `translateY(${ratio * -8}px)`;
            }
          }
        },
        { passive: true }
      );
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    initOrionMottoAnimation();
    initScrollReveal();
    initInteractiveAndVideo();
    initLiveMetricsCounter();
    initProcess3DScrollEngine();
    initOrionConstellationScroll();
  });
})();
