const defaultOptions = {
  imgPath: "/favicon.svg",
  textColor: "white",
  badgeColor: "red",
};

async function createBadgeFavicon(label, options) {
  const opts = Object.assign({}, defaultOptions, options);

  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;

  const ctx = canvas.getContext("2d");

  // Draw base icon
  const icon = new Image();
  icon.src = opts.imgPath;
  await icon.decode();

  ctx.drawImage(icon, 0, 0, 64, 64);

  const fontSize = 28;

  // Measure text
  ctx.font = `${fontSize}px Arial, sans-serif`;
  ctx.textAlign = "right";
  ctx.textBaseline = "top";
  const textMetrics = ctx.measureText(label);

  // Draw badge
  const paddingX = 7;
  const paddingY = 4;
  const cornerRadius = 8;

  const width = textMetrics.width + paddingX * 2;
  const height = fontSize + paddingY * 2;
  const x = canvas.width - width;
  const y = canvas.height - height - 1;

  ctx.fillStyle = opts.badgeColor;
  ctx.roundRect(x, y, width, height, cornerRadius);
  ctx.fill();

  // Draw badge text
  const textPaddingX = 7;
  const textPaddingY = 3;

  ctx.fillStyle = opts.textColor;
  ctx.fillText(
    label,
    canvas.width - textPaddingX,
    canvas.height - fontSize - textPaddingY
  );

  return canvas.toDataURL("image/png");
}

module.exports = { createBadgeFavicon };
