function rainbowArc(canvasElement, msToWait) {
  const W = 400;
  const H = 200;
  const S = 5;
  const COLORS = ['#ff0000', '#ff8000', '#ffff00', '#00ff00', '#0000ff', '#8000ff', '#ff8080'];
  const ANIMATION_SECONDS = 1.5;

  canvasElement.width = W;
  canvasElement.height = H;

  msToWait = msToWait || 0;

  const ctx = canvasElement.getContext('2d');
  ctx.clearRect(0, 0, W, H);
  ctx.lineWidth = S;

  let percent = 0;
  let startTimestamp;

  let radii = [0.5, 0.6, 0.7, 0.8, 0.8, 0.6, 0.5];

  requestAnimationFrame(extendRainbowArcAnimation);

  function extendRainbowArcAnimation(currentTimestamp) {
    if (startTimestamp === undefined) {
      startTimestamp = currentTimestamp;
    }

    ctx.clearRect(0, 0, W, H);

    const elapsed = Math.max(0, currentTimestamp - (startTimestamp + msToWait));

    percent = Math.min(1, elapsed / 1000 / ANIMATION_SECONDS);
    const angle = Math.PI * (1 + percent);

    for (let i = 0; i < COLORS.length; i++) {
      ctx.strokeStyle = COLORS[i];
      ctx.beginPath();
      ctx.arc(W / 2, H, H - (i + 1) * S, 0, angle);
      ctx.stroke();
    }

    if (percent >= 1) {
      return;
    }

    for (let i = 0; i < radii.length; i++) {
      const endPosX = Math.cos(angle+.02) + 1;
      const endPosY = Math.sin(angle+.02) + 1;
      ctx.beginPath();
      radii[i] = Math.min(1, Math.max(0, radii[i] + (Math.random() - 0.5) / 20));
      ctx.fillStyle = `rgba(255,255,255,0.8)`;
      const offset = (i + 1) * S;
      ctx.arc(endPosX * (W / 2 - offset) + offset, endPosY * (H - offset) + offset, 10 * radii[i], Math.PI * 2, false);
      ctx.fill();
      ctx.closePath();
    }

    requestAnimationFrame(extendRainbowArcAnimation);
  }
}