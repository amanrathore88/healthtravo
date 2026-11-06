import React, { useRef, useEffect } from 'react';

/**
 * HeroImageReveal
 * Interactive executive hover animation:
 * - Base layer: High-definition monochrome/B&W founder portrait.
 * - Revealer: Wherever the user hovers or glides their cursor, the vibrant full-color
 *   studio portrait is revealed beneath a smooth, organic, smoky radial mist.
 * - Transition: The color trail softly lingers and evaporates like smoke over ~1.2s,
 *   fading seamlessly back to obsidian monochrome when the cursor stops or moves away.
 */
export default function HeroImageReveal({ className = '', imageClassName = '' }) {
  const containerRef = useRef(null);
  const baseImgRef = useRef(null);
  const canvasRef = useRef(null);

  // Animation & tracking refs
  const maskCanvasRef = useRef(null);
  const colorImgRef = useRef(null);
  const animFrameIdRef = useRef(null);
  const isColorLoadedRef = useRef(false);

  const mouseStateRef = useRef({
    x: -1000,
    y: -1000,
    lastX: -1000,
    lastY: -1000,
    isHovering: false,
    hasActiveSmoke: false,
    fadeCounter: 0,
  });

  useEffect(() => {
    // 1. Preload matching color studio portrait
    const colorImg = new Image();
    colorImg.src = '/assets/founder-patient-hero-color.png';
    colorImg.onload = () => {
      isColorLoadedRef.current = true;
      colorImgRef.current = colorImg;
      syncCanvasSize();
    };

    // 2. Offscreen mask canvas
    const maskCanvas = document.createElement('canvas');
    maskCanvasRef.current = maskCanvas;

    // 3. Canvas sizing synchronization
    function syncCanvasSize() {
      const baseImg = baseImgRef.current;
      const canvas = canvasRef.current;
      if (!baseImg || !canvas) return;

      const rect = baseImg.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const dpr = window.devicePixelRatio || 1;
      const cssW = Math.round(rect.width);
      const cssH = Math.round(rect.height);

      if (canvas.width !== cssW * dpr || canvas.height !== cssH * dpr) {
        canvas.width = cssW * dpr;
        canvas.height = cssH * dpr;
        canvas.style.width = cssW + 'px';
        canvas.style.height = cssH + 'px';
      }

      if (maskCanvas.width !== cssW || maskCanvas.height !== cssH) {
        maskCanvas.width = cssW;
        maskCanvas.height = cssH;
      }
    }

    const resizeObserver = new ResizeObserver(() => {
      syncCanvasSize();
    });

    if (baseImgRef.current) {
      resizeObserver.observe(baseImgRef.current);
    }

    // 4. Smoky Puff Drawer with organic vapor feathering
    function drawSmokePuff(ctx, px, py, intensity = 1.0) {
      const baseRadius = Math.min(Math.max(window.innerWidth * 0.1, 115), 160);
      const jitterX = (Math.random() - 0.5) * 8;
      const jitterY = (Math.random() - 0.5) * 8;
      const radius = baseRadius * (0.85 + Math.random() * 0.3);

      const grad = ctx.createRadialGradient(
        px + jitterX, py + jitterY, 0,
        px + jitterX, py + jitterY, radius
      );
      grad.addColorStop(0, 'rgba(255, 255, 255, ' + (0.95 * intensity) + ')');
      grad.addColorStop(0.35, 'rgba(255, 255, 255, ' + (0.85 * intensity) + ')');
      grad.addColorStop(0.65, 'rgba(255, 255, 255, ' + (0.42 * intensity) + ')');
      grad.addColorStop(0.85, 'rgba(255, 255, 255, ' + (0.12 * intensity) + ')');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.save();
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(px + jitterX, py + jitterY, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // 5. Main Render & Dissipation Loop
    function renderLoop() {
      const canvas = canvasRef.current;
      const maskCanvas = maskCanvasRef.current;
      const colorImg = colorImgRef.current;
      const state = mouseStateRef.current;

      if (canvas && maskCanvas && colorImg && isColorLoadedRef.current) {
        const maskCtx = maskCanvas.getContext('2d', { willReadFrequently: false });
        const ctx = canvas.getContext('2d');
        const cssW = maskCanvas.width;
        const cssH = maskCanvas.height;
        const dpr = window.devicePixelRatio || 1;

        if (cssW > 0 && cssH > 0 && maskCtx && ctx) {
          // A. Draw new smoke puffs if hovering
          if (state.isHovering && state.x >= 0 && state.y >= 0) {
            state.hasActiveSmoke = true;
            state.fadeCounter = 0;

            if (state.lastX >= 0 && state.lastY >= 0) {
              const dx = state.x - state.lastX;
              const dy = state.y - state.lastY;
              const dist = Math.hypot(dx, dy);
              const steps = Math.max(1, Math.min(Math.floor(dist / 10), 20));

              for (let i = 0; i <= steps; i++) {
                const t = i / steps;
                const curX = state.lastX + dx * t;
                const curY = state.lastY + dy * t;
                drawSmokePuff(maskCtx, curX, curY, 0.9);
              }
            } else {
              drawSmokePuff(maskCtx, state.x, state.y, 1.0);
            }

            state.lastX = state.x;
            state.lastY = state.y;
          } else {
            state.lastX = -1000;
            state.lastY = -1000;
          }

          // B. Dissipate existing smoke softly (evaporation effect)
          if (state.hasActiveSmoke) {
            maskCtx.save();
            maskCtx.globalCompositeOperation = 'destination-out';
            // 0.038 gives a luxurious ~1.2s fade duration at 60fps
            maskCtx.fillStyle = 'rgba(0, 0, 0, 0.038)';
            maskCtx.fillRect(0, 0, cssW, cssH);
            maskCtx.restore();

            state.fadeCounter++;
            // After ~75 frames without hover, clear completely and enter idle
            if (!state.isHovering && state.fadeCounter > 75) {
              maskCtx.clearRect(0, 0, cssW, cssH);
              state.hasActiveSmoke = false;
            }
          }

          // C. Blit masked color image onto visible canvas
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          if (state.hasActiveSmoke) {
            ctx.save();
            ctx.scale(dpr, dpr);

            // Draw the smoke mask
            ctx.drawImage(maskCanvas, 0, 0, cssW, cssH);

            // Composite the color image strictly where mask is white/opaque
            ctx.globalCompositeOperation = 'source-in';
            ctx.drawImage(colorImg, 0, 0, cssW, cssH);

            ctx.restore();
          }
        }
      }

      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    }

    animFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      resizeObserver.disconnect();
    };
  }, []);

  // Mouse / Touch Event Handlers
  const handlePointerMove = (clientX, clientY) => {
    const baseImg = baseImgRef.current;
    if (!baseImg) return;

    const rect = baseImg.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const state = mouseStateRef.current;
    state.x = x;
    state.y = y;
    state.isHovering = true;
  };

  const handleMouseMove = (e) => {
    handlePointerMove(e.clientX, e.clientY);
  };

  const handleMouseEnter = (e) => {
    const baseImg = baseImgRef.current;
    if (!baseImg) return;
    const rect = baseImg.getBoundingClientRect();
    const state = mouseStateRef.current;
    state.x = e.clientX - rect.left;
    state.y = e.clientY - rect.top;
    state.lastX = state.x;
    state.lastY = state.y;
    state.isHovering = true;
  };

  const handleMouseLeave = () => {
    const state = mouseStateRef.current;
    state.isHovering = false;
    state.x = -1000;
    state.y = -1000;
    state.lastX = -1000;
    state.lastY = -1000;
  };

  const handleTouchMove = (e) => {
    if (e.touches.length > 0) {
      handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchStart = (e) => {
    if (e.touches.length > 0) {
      handleMouseEnter(e.touches[0]);
    }
  };

  const handleTouchEnd = () => {
    handleMouseLeave();
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={'relative select-none pointer-events-auto cursor-crosshair group ' + className}
    >
      {/* 1. Underlying Monochrome Base Studio Portrait */}
      <img
        ref={baseImgRef}
        src="/assets/founder-patient-hero.png"
        alt="Dushyant Singh Chauhan with international patient"
        className={imageClassName || "w-auto h-[82vh] xl:h-[86vh] max-h-[800px] xl:max-h-[850px] object-contain object-bottom filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.85)] select-none block pointer-events-none transition-all duration-300"}
      />

      {/* 2. Overlaid Smoky Color Reveal Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none object-contain object-bottom filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.85)] select-none"
      />
    </div>
  );
}
