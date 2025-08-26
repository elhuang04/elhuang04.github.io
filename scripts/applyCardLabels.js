const categoryColors = {
    school: "#FFDEDE",
    work: "#E1F1FF",
    personal: "#D9FFE5",
    design: "#FFF5CA",
    software: "#F8E6FF",
    hardware: "#FFE5CE",
    pm: "#EDFFCB"
};

// Convert pastel hex to saturated RGB, then mix with black
function getRichTextColor(hex, blackRatio = 0.15) {
  const rgb = hex.replace("#", "").match(/.{2}/g).map(x => parseInt(x, 16));
  const [r, g, b] = rgb;

  // Convert to HSL
  const rNorm = r / 255, gNorm = g / 255, bNorm = b / 255;
  const max = Math.max(rNorm, gNorm, bNorm), min = Math.min(rNorm, gNorm, bNorm);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rNorm: h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0); break;
      case gNorm: h = (bNorm - rNorm) / d + 2; break;
      case bNorm: h = (rNorm - gNorm) / d + 4; break;
    }
    h /= 6;
  }

  // Generate saturated color with same hue
  const saturatedHex = hslToHex(h * 360, 100, 40);

  // Mix with black
  return mixWithBlack(saturatedHex, blackRatio);
}

// Convert HSL to Hex
function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  let r, g, b;

  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];

  const toHex = val => Math.round((val + m) * 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// Mix hex color with black
function mixWithBlack(hex, ratio) {
  const rgb = hex.replace("#", "").match(/.{2}/g).map(x => parseInt(x, 16));
  const mixed = rgb.map(val => Math.round(val * (1 - ratio)));
  return `rgb(${mixed.join(",")})`;
}

// Apply labels to cards
function applyCardLabels() {
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    const categories = Object.keys(categoryColors).filter(cat => card.classList.contains(cat));
    const labelContainer = card.querySelector('.flex.flex-wrap');

    if (labelContainer) {
      categories.forEach(cat => {
        if (!labelContainer.querySelector(`span.${cat}`)) {
          const span = document.createElement('span');

          // Conditional label override for "pm"
          const labelText = cat === "pm" ? "Product Management" : cat.charAt(0).toUpperCase() + cat.slice(1);

          span.textContent = labelText;
          span.className = `px-2 py-1 text-xs rounded-full ${cat}`;
          span.style.backgroundColor = categoryColors[cat];
          span.style.color = getRichTextColor(categoryColors[cat], 0.15); // 15% black blend
          labelContainer.appendChild(span);
        }
      });
    }
  });
}

document.addEventListener('DOMContentLoaded', applyCardLabels);