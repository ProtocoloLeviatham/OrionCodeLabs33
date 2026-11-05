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
   * Motor 3D de Scroll y Compilación Glitch Código -> Render ("Cómo construimos tu proyecto paso a paso")
   * Liviano, 60 FPS constantes en GPU y con alternancia interactiva entre Código Puro y Módulo Renderizado.
   */
  function initProcess3DScrollEngine() {
    const arena = document.querySelector('.process-3d-arena');
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
            ? '</> Ver Código Puro'
            : '⚡ Compilar Render';
        }
        compilerEl.dataset.busy = '0';
      }, 380);
    }

    // Botones manuales de cada etapa para alternar Código <-> Render con efecto Glitch
    steps.forEach((step) => {
      const compiler = step.querySelector('.code-render-compiler');
      const toggleBtn = step.querySelector('.compiler-mode-toggle');
      if (compiler && toggleBtn) {
        toggleBtn.addEventListener('click', () => {
          const nextState = !compiler.classList.contains('is-compiled');
          triggerCompilerTransition(compiler, nextState);
        });
      }

      // Inclinación 3D sutil por puntero (throttled por rAF)
      let rafId = null;
      step.addEventListener('mousemove', (e) => {
        if (!step.classList.contains('is-in-3d-focus') || window.innerWidth < 900) return;
        if (rafId) return;
        rafId = window.requestAnimationFrame(() => {
          const rect = step.getBoundingClientRect();
          const nx = (e.clientX - rect.left) / rect.width - 0.5;
          const ny = (e.clientY - rect.top) / rect.height - 0.5;
          step.style.setProperty('--step-rx', `${(-ny * 3.5).toFixed(2)}deg`);
          step.style.setProperty('--step-ry', `${(nx * 4.5).toFixed(2)}deg`);
          rafId = null;
        });
      });

      step.addEventListener('mouseleave', () => {
        if (step.classList.contains('is-in-3d-focus')) {
          step.style.setProperty('--step-rx', '0deg');
          step.style.setProperty('--step-ry', '0deg');
        }
      });
    });

    if ('IntersectionObserver' in window) {
      const stepObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const stepEl = entry.target;
            if (entry.isIntersecting) {
              stepEl.classList.add('is-in-3d-focus');
              const idx = Number(stepEl.dataset.stepIndex || 1);
              if (arena) {
                const pct = Math.min(100, Math.round((idx / steps.length) * 100));
                arena.style.setProperty('--rail-progress', `${pct}%`);
              }

              // Auto-compila de Código Puro a Render con Glitch la primera vez que entra en foco
              const compiler = stepEl.querySelector('.code-render-compiler');
              if (compiler && !compiler.dataset.autoCompiled) {
                compiler.dataset.autoCompiled = '1';
                window.setTimeout(() => {
                  triggerCompilerTransition(compiler, true);
                }, 720);
              }
            }
          });
        },
        { threshold: 0.22, rootMargin: '0px 0px -45px 0px' }
      );

      steps.forEach((s) => stepObserver.observe(s));
    } else {
      steps.forEach((s) => s.classList.add('is-in-3d-focus'));
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    initOrionMottoAnimation();
    initScrollReveal();
    initInteractiveAndVideo();
    initProcess3DScrollEngine();
  });
})();
