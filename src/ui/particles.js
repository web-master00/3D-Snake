const fxLayer = document.getElementById("fxLayer");

export function spawnEatParticles(gridX, gridY, cellSize, isDark) {
  if (!fxLayer) return;

  const px = (gridX + 0.5) * cellSize;
  const py = (gridY + 0.5) * cellSize;

  const darkColors = [
    "#ff6a3a",
    "#ff9060",
    "#ffc090",
    "#4ade80",
    "#a8f0a0",
    "#86efac",
  ];
  const lightColors = [
    "#cc3010",
    "#e84020",
    "#ff5a30",
    "#1a9a15",
    "#48c840",
    "#8adc50",
  ];
  const colors = isDark ? darkColors : lightColors;

  for (let i = 0; i < 10; i++) {
    const p = document.createElement("div");
    const sz = 4 + Math.random() * 7;

    p.style.cssText = [
      "position:absolute",
      `width:${sz}px`,
      `height:${sz}px`,
      `left:${px}px`,
      `top:${py}px`,
      `background:${colors[Math.floor(Math.random() * colors.length)]}`,
      "border-radius:50%",
      "pointer-events:none",
    ].join(";");

    fxLayer.appendChild(p);

    const angle = Math.random() * Math.PI * 2;
    const dist = 20 + Math.random() * 45;
    const tx = Math.cos(angle) * dist;
    const ty = Math.sin(angle) * dist;

    const anim = p.animate(
      [
        { transform: "translate(-50%,-50%) scale(1)", opacity: 1 },
        {
          transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0)`,
          opacity: 0,
        },
      ],
      {
        duration: 420 + Math.random() * 280,
        easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
    );

    anim.onfinish = () => p.remove();
  }
}

export function spawnDeathParticles(isDark) {
  if (!fxLayer) return;

  const darkColor = "#4ade80";
  const lightColor = "#1a9a15";
  const color = isDark ? darkColor : lightColor;

  for (let i = 0; i < 22; i++) {
    setTimeout(() => {
      const p = document.createElement("div");
      const sz = 5 + Math.random() * 11;
      const rx = Math.random() > 0.5;

      p.style.cssText = [
        "position:absolute",
        `width:${sz}px`,
        `height:${sz}px`,
        `left:${Math.random() * 100}%`,
        `top:${Math.random() * 100}%`,
        `background:${color}`,
        `border-radius:${rx ? "50%" : "3px"}`,
        "pointer-events:none",
      ].join(";");

      fxLayer.appendChild(p);

      const drift = (Math.random() - 0.5) * 90;
      const rise = -(30 + Math.random() * 70);

      const anim = p.animate(
        [
          { transform: "scale(1) translate(0,0)", opacity: 0.85 },
          {
            transform: `scale(0) translate(${drift}px, ${rise}px)`,
            opacity: 0,
          },
        ],
        {
          duration: 700 + Math.random() * 700,
          easing: "ease-out",
        },
      );

      anim.onfinish = () => p.remove();
    }, i * 35);
  }
}
