const sphere = document.querySelector("#sphere");
const stage = document.querySelector(".stage");

const state = {
  rotX: -10,
  rotY: 20,
  velocityX: 0,
  velocityY: 0,
  isDragging: false,
  lastX: 0,
  lastY: 0,
  positions: [],
  items: [],
  radius: 360,
  dragDistance: 0,
  downItem: null,
  data: [],
  initialData: [],
  collections: {},
  currentKey: "main",
};

const DATA_URL = "data.json";
const DEFAULT_COLLECTION = "main";
const deg = 180 / Math.PI;
const friction = 0.94;
const dragSpeed = 0.35;
const maxTilt = 65;

function getRadius() {
  return window.innerWidth < 720 ? 220 : 360;
}

function buildItems(data) {
  sphere.innerHTML = "";
  state.items = [];
  state.positions = [];
  state.radius = getRadius();

  const count = data.length;
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  data.forEach((entry, index) => {
    const hasSwitch = Boolean(entry.switchTo);
    const hasImage = Boolean(entry.url);
    const hasLink = Boolean(entry.link);
    const y = 1 - (index + 0.5) * (2 / count);
    const radius = Math.sqrt(1 - y * y);
    const theta = goldenAngle * index;
    const x = Math.cos(theta) * radius;
    const z = Math.sin(theta) * radius;

    state.positions.push({ x, y, z });

    const item = document.createElement("a");
    item.className = "orb-item";
    if (hasSwitch) {
      item.dataset.switchTo = entry.switchTo;
    }
    if (!hasSwitch && hasLink) {
      item.href = entry.link || "#";
      item.target = "_blank";
      item.rel = "noopener";
    } else {
      item.href = "#";
    }
    item.setAttribute("role", "listitem");
    item.setAttribute("aria-label", entry.title);

    const face = document.createElement("div");
    face.className = "orb-face";

    if (!hasImage) {
      face.classList.add("orb-face--action");
      const actionLabel = document.createElement("div");
      actionLabel.className = "orb-action";
      actionLabel.textContent = entry.title;
      face.appendChild(actionLabel);
    } else {
      const img = document.createElement("img");
      img.src = entry.url;
      img.alt = entry.title;
      img.loading = "lazy";

      img.addEventListener("error", () => {
        item.classList.add("is-broken");
        face.innerHTML = "Image";
      });

      const label = document.createElement("div");
      label.className = "orb-label";
      label.textContent = entry.title;

      face.appendChild(img);
      face.appendChild(label);
    }
    item.appendChild(face);

    const px = x * state.radius;
    const py = y * state.radius;
    const pz = z * state.radius;
    item.style.transform = `translate3d(${px}px, ${py}px, ${pz}px)`;

    sphere.appendChild(item);
    state.items.push(item);
  });
}

function applyDepth() {
  const rotX = (state.rotX * Math.PI) / 180;
  const rotY = (state.rotY * Math.PI) / 180;
  const cosX = Math.cos(rotX);
  const sinX = Math.sin(rotX);
  const cosY = Math.cos(rotY);
  const sinY = Math.sin(rotY);

  state.positions.forEach((pos, index) => {
    const x1 = pos.x;
    const y1 = pos.y * cosX - pos.z * sinX;
    const z1 = pos.y * sinX + pos.z * cosX;

    const x2 = x1 * cosY + z1 * sinY;
    const z2 = -x1 * sinY + z1 * cosY;
    const y2 = clamp(y1, -1, 1);

    const depth = clamp((z2 + 1) / 2, 0, 1);
    const scale = 0.65 + depth * 0.5;
    const opacity = 0.35 + depth * 0.65;

    const item = state.items[index];
    const px = x2 * state.radius;
    const py = y2 * state.radius;
    const pz = z2 * state.radius;
    item.style.transform = `translate3d(${px}px, ${py}px, ${pz}px)`;
    item.style.opacity = opacity.toFixed(3);
    item.style.zIndex = `${Math.round(depth * 1000)}`;
    item.style.pointerEvents = depth > 0.25 ? "auto" : "none";

    const face = item.querySelector(".orb-face");
    if (face) {
      const rotY = Math.atan2(x2, z2) * deg;
      const rotX = -Math.asin(y2) * deg;
      face.style.transform = `rotateY(${rotY}deg) rotateX(${rotX}deg) scale(${scale.toFixed(3)})`;
    }
  });
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function resolveCollection(key) {
  const collection = state.collections[key];
  if (!Array.isArray(collection)) {
    return [];
  }
  return collection;
}

function setActiveCollection(key, options = {}) {
  const data = resolveCollection(key);
  const shouldShuffle = options.shuffle && key === DEFAULT_COLLECTION;
  let nextData = data;

  if (shouldShuffle) {
    state.initialData = shuffle([...data]);
    nextData = state.initialData;
  } else if (key === DEFAULT_COLLECTION && state.initialData.length) {
    nextData = state.initialData;
  } else {
    nextData = [...data];
  }

  state.currentKey = key;
  state.data = nextData;
  buildItems(state.data);
  applyDepth();
}

function animate() {
  if (!state.isDragging) {
    state.rotY += state.velocityX;
    state.rotX += state.velocityY;
    state.velocityX *= friction;
    state.velocityY *= friction;

    if (Math.abs(state.velocityX) + Math.abs(state.velocityY) < 0.02) {
      state.rotY += 0.05;
    }
  }

  state.rotX = clamp(state.rotX, -maxTilt, maxTilt);
  applyDepth();

  requestAnimationFrame(animate);
}

function onPointerDown(event) {
  state.isDragging = true;
  state.lastX = event.clientX;
  state.lastY = event.clientY;
  state.velocityX = 0;
  state.velocityY = 0;
  state.dragDistance = 0;
  state.downItem = event.target.closest(".orb-item");
  stage.setPointerCapture(event.pointerId);
}

function onPointerMove(event) {
  if (!state.isDragging) return;
  const deltaX = event.clientX - state.lastX;
  const deltaY = event.clientY - state.lastY;

  state.dragDistance += Math.hypot(deltaX, deltaY);
  state.rotY += deltaX * dragSpeed;
  state.rotX -= deltaY * dragSpeed;
  state.velocityX = deltaX * 0.08;
  state.velocityY = -deltaY * 0.08;

  state.lastX = event.clientX;
  state.lastY = event.clientY;
}

function onPointerUp(event) {
  state.isDragging = false;
  if (stage.hasPointerCapture(event.pointerId)) {
    stage.releasePointerCapture(event.pointerId);
  }
  if (state.downItem && state.dragDistance < 6) {
    const switchTo = state.downItem.dataset.switchTo;
    const href = state.downItem.getAttribute("href");
    if (switchTo) {
      setActiveCollection(switchTo);
    } else if (href && href !== "#") {
      const newWindow = window.open(href, "_blank", "noopener");
      if (newWindow) {
        newWindow.opener = null;
      }
    }
  }
  state.downItem = null;
}

async function loadCollections() {
  const response = await fetch(DATA_URL);
  if (!response.ok) {
    throw new Error("Failed to load data.json");
  }
  const payload = await response.json();
  if (!payload || typeof payload !== "object") {
    throw new Error("Invalid data.json");
  }
  return payload.collections || {};
}

async function init() {
  try {
    state.collections = await loadCollections();
    setActiveCollection(DEFAULT_COLLECTION, { shuffle: true });
  } catch (error) {
    sphere.innerHTML = "<p>Failed to load data.json</p>";
  }

  animate();
}

stage.addEventListener("pointerdown", onPointerDown);
stage.addEventListener("pointermove", onPointerMove);
stage.addEventListener("pointerup", onPointerUp);
stage.addEventListener("pointerleave", onPointerUp);

window.addEventListener("resize", () => {
  state.radius = getRadius();
  if (state.data.length) {
    buildItems(state.data);
  }
});

init();
