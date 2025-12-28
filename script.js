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
};

const DATA = [
  {
    title: 'UKEHI TALK',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2025/03/アートボード-19-400x225.png',
    link: 'https://online.uniwa-juku.com/course/zinja-ch',
  },
  {
    title: 'むすび大学',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2025/03/アートボード-3-400x225.png',
    link: 'https://online.uniwa-juku.com/course/ura-musubi',
  },
  {
    title: 'ちこの部屋',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2025/03/youtubeサムネ-400x225.png',
    link: 'https://online.uniwa-juku.com/course/tico-room',
  },
  {
    title: 'おうち神社化計画',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2022/12/317594723_852613609207405_3900543237544817121_n-1-400x225.png',
    link: 'https://online.uniwa-juku.com/course/ouchi',
  },
  {
    title: 'めっちゃおもろい日本書紀',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2023/08/367637144_3145989159040927_2516318695754178178_n-400x225.png',
    link: 'https://online.uniwa-juku.com/course/nihonsyoki',
  },
  {
    title: '古事記を読もう！',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2024/01/古事記を読もう-400x225.png',
    link: 'https://online.uniwa-juku.com/course/kojiki-course',
  },
  {
    title: '神社参拝の心得',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2022/10/アートボード-2-400x225.png',
    link: 'https://online.uniwa-juku.com/course/shrine-course',
  },
  {
    title: '全国の神社を語る',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2024/01/全国の神社を語る3-400x225.png',
    link: 'https://online.uniwa-juku.com/course/public-recording',
  },
  {
    title: '学校で教えない歴史の真実',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2023/09/367648265_1138333690690066_3356032573003333309_n-400x225.png',
    link: 'https://online.uniwa-juku.com/course/truehistory',
  },
  {
    title: '心あたたまる日本の古典',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2022/10/アートボード-4-400x225.png',
    link: 'https://online.uniwa-juku.com/course/classic',
  },
  {
    title: '大和魂がめざめる国学',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2024/08/202408新コーナーサムネ-2-400x225.png',
    link: 'https://online.uniwa-juku.com/course/kokugaku',
  },
  {
    title: '論語ラジオゼミ',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2022/10/president-thumb-400x225.jpg',
    link: 'https://online.uniwa-juku.com/course/president-radio',
  },
  {
    title: '心を強くする陽明学',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2022/10/アートボード-6-400x225.png',
    link: 'https://online.uniwa-juku.com/course/yangmingism-course',
  },
  {
    title: 'ちっちゃな一禅',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2022/10/311235330_1273076033449059_5468256491322301189_n-400x225.jpg',
    link: 'https://online.uniwa-juku.com/course/nishino',
  },
  {
    title: '仏教講座',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2022/10/アートボード-5-400x225.png',
    link: 'https://online.uniwa-juku.com/course/buddhism-course',
  },
  {
    title: '祓魔の道',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2024/08/202408新コーナーサムネ-5-400x225.png',
    link: 'https://online.uniwa-juku.com/course/futsuma',
  },
  {
    title: 'LEGENDS 先人の知恵',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2024/09/202408新コーナーサムネ-8-400x225.png',
    link: 'https://online.uniwa-juku.com/course/legends',
  },
  {
    title: '思考力を磨く西洋哲学',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2022/10/アートボード-7-400x225.png',
    link: 'https://online.uniwa-juku.com/course/philosophy',
  },
  {
    title: '世界がわかるキリスト教講座',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2022/10/アートボード-8-400x225.png',
    link: 'https://online.uniwa-juku.com/course/christianity',
  },
  {
    title: 'おうち食養生',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2024/06/d74f8547-a6cc-480b-8804-7597a215697f-400x225.jpg',
    link: 'https://online.uniwa-juku.com/course/shokuyojo',
  },
  {
    title: 'ゆにわのおせちいらっしゃい！',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2024/01/ゆにわのおせち-いらっしゃい-2-400x225.jpg',
    link: 'https://online.uniwa-juku.com/course/osechi',
  },
  {
    title: 'ちこのまかない・いらっしゃい',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2023/03/338405308_1394309364726859_4857769499586531937_n-400x225.png',
    link: 'https://online.uniwa-juku.com/course/makanai',
  },
  {
    title: 'ポラリス診療所ブログ',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2024/03/A5B4B61B-1F97-403B-AD57-8D7BA2D2B3BB-400x225.png',
    link: 'https://online.uniwa-juku.com/course/polaris-blog',
  },
  {
    title: '体壁（タイヘキ）',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2024/01/体壁コーナー-400x225.png',
    link: 'https://online.uniwa-juku.com/course/taiheki-course',
  },
  {
    title: 'ゆるゆる神体法',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2024/03/1-1-400x225.png',
    link: 'https://online.uniwa-juku.com/course/shintaiho',
  },
  {
    title: 'ゆるゆるボディワーク',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2024/01/ゆるゆるボディワーク-400x225.png',
    link: 'https://online.uniwa-juku.com/course/bodywork',
  },
  {
    title: 'ゆにわの子育て',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2022/11/313782112_825012032034153_8215898970362075790_n-400x225.png',
    link: 'https://online.uniwa-juku.com/course/kosodate',
  },
  {
    title: 'ゆにわ流レンアイ談義 セイなるゆにわ',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2023/12/403401984_867602138392361_7729824514339104981_n-400x225.jpg',
    link: 'https://online.uniwa-juku.com/course/holy',
  },
  {
    title: '易経講座',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2022/10/アートボード-10-400x225.png',
    link: 'https://online.uniwa-juku.com/course/yijing-course',
  },
  {
    title: 'フォーチュンサロン',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2024/01/花えり-タロット-400x225.jpg',
    link: 'https://online.uniwa-juku.com/course/fortune',
  },
  {
    title: '六龍法占い',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2024/02/六龍法占い-400x225.png',
    link: 'https://online.uniwa-juku.com/course/rokuryu-course',
  },
  {
    title: 'ドラゴンノートワーク',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2024/01/dragon-note-work-400x225.jpg',
    link: 'https://online.uniwa-juku.com/course/dragonnote-course',
  },
  {
    title: 'ココロが整う魔法のワーク',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2024/01/魔法のワーク-400x225.jpg',
    link: 'https://online.uniwa-juku.com/course/magic',
  },
  {
    title: 'ワールド・オーダー',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2024/08/202408新コーナーサムネ-400x225.png',
    link: 'https://online.uniwa-juku.com/course/world-order',
  },
  {
    title: 'かむながら経営道',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2024/09/202408新コーナーサムネ-7-400x225.png',
    link: 'https://online.uniwa-juku.com/course/keieido',
  },
  {
    title: 'ニュース解説室',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2022/10/311051964_3265473057001962_785976292004761679_n-400x225.jpg',
    link: 'https://online.uniwa-juku.com/course/news',
  },
  {
    title: 'はたを楽にする仕事のコツ',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2022/11/315884665_798665094527155_5973567545201602730_n-400x225.jpg',
    link: 'https://online.uniwa-juku.com/course/work',
  },
  {
    title: '寿社長のわざわい転じて福禄寿',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2022/11/314447726_457610629787144_6077845771387478548_n-400x225.jpg',
    link: 'https://online.uniwa-juku.com/course/kotobuki',
  },
  {
    title: '大人の大逆転勉強法',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2022/11/313879945_5638843819513557_2234417352685242034_n-400x225.jpg',
    link: 'https://online.uniwa-juku.com/course/study',
  },
  {
    title: 'マネーワールド',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2022/10/MoneyWorld-400x225.png',
    link: 'https://online.uniwa-juku.com/course/money-world',
  },
  {
    title: 'メンタルトレーニング',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2022/11/313216794_792964611782267_2922362945766797848_n-400x225.jpg',
    link: 'https://online.uniwa-juku.com/course/mental',
  },
  {
    title: 'エンタメから時代を紐解く',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2022/11/313929349_989509439118348_4259332510741996131_n-400x225.png',
    link: 'https://online.uniwa-juku.com/course/entertainment',
  },
  {
    title: 'ゆにわショッピング',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2025/11/uniwa_shopping-400x225.jpg',
    link: 'https://online.uniwa-juku.com/course/uniwa-shopping',
  },
  {
    title: 'ドキュメンタリー',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2024/01/ドキュメンタリーゆにわ-400x225.jpg',
    link: 'https://online.uniwa-juku.com/course/documentary',
  },
  {
    title: '旬な情報を発信！ゆにわタイムズ',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2022/11/20191116-DSC06030-2-400x225.jpg',
    link: 'https://online.uniwa-juku.com/course/times',
  },
  {
    title: 'イベントレポート',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2024/01/イベントレポート-400x225.png',
    link: 'https://online.uniwa-juku.com/course/event-report',
  },
  {
    title: '北極老人を語る',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2024/03/429633315_1152583675733076_1691291104431993515_n-400x225.png',
    link: 'https://online.uniwa-juku.com/course/rozin',
  },
  {
    title: '御神業を語る会ハイライト',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2024/09/御神業を語る会サムネ-400x225.png',
    link: 'https://online.uniwa-juku.com/course/kataru',
  },
  {
    title: 'ゆにわのIDOBATA☕ティータイム',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2022/10/272884482_817498462769841_3499330525798125348_n-400x225.png',
    link: 'https://online.uniwa-juku.com/course/idobata',
  },
  {
    title: '北極老人随聞記',
    url: 'https://online.uniwa-juku.com/wp/wp-content/themes/uniwajuku2025/img/course/zuimonki-thumb.jpg',
    link: 'https://online.uniwa-juku.com/zuimonki',
  },
  {
    title: '社長ブログ',
    url: 'https://online.uniwa-juku.com/wp/wp-content/themes/uniwajuku2025/img/course/president.jpg?ver=20240114',
    link: 'https://online.uniwa-juku.com/president/?type=blog',
  },
  {
    title: '領域外の世界',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2023/01/ryouikigai-400x225.png',
    link: 'https://online.uniwa-juku.com/course/nitta',
  },
  {
    title: '星と伝説',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2024/01/星と伝説-400x225.jpg',
    link: 'https://online.uniwa-juku.com/course/%e6%98%9f%e3%81%a8%e4%bc%9d%e8%aa%ac',
  },
  {
    title: 'セカンドライフ',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2022/11/second-400x225.png',
    link: 'https://online.uniwa-juku.com/course/second-life',
  },
  {
    title: 'Y氏の対談',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2022/11/Y氏の対談-400x225.jpg',
    link: 'https://online.uniwa-juku.com/course/mr-y',
  },
  {
    title: '神宿る身体づくりの秘訣',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2022/11/taiheki-4-400x225.jpeg',
    link: 'https://online.uniwa-juku.com/course/kamiyadoru',
  },
  {
    title: 'ゆにゾンの声',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2024/09/ゆにゾンの声サムネ-400x225.png',
    link: 'https://online.uniwa-juku.com/course/uniwa-report',
  },
  {
    title: '突撃！記者クラブ',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2024/03/突撃！記者クラブ-1-400x225.png',
    link: 'https://online.uniwa-juku.com/course/press-club',
  },
  {
    title: 'ゆにわ塾の活用法',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2022/10/295853846_818357049588950_8030389015883078295_n-400x225.jpg',
    link: 'https://online.uniwa-juku.com/course/use',
  },
];

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
    const y = 1 - (index + 0.5) * (2 / count);
    const radius = Math.sqrt(1 - y * y);
    const theta = goldenAngle * index;
    const x = Math.cos(theta) * radius;
    const z = Math.sin(theta) * radius;

    state.positions.push({ x, y, z });

    const item = document.createElement("a");
    item.className = "orb-item";
    item.href = entry.link || "#";
    item.target = "_blank";
    item.rel = "noopener";
    item.setAttribute("role", "listitem");
    item.setAttribute("aria-label", entry.title);

    const face = document.createElement("div");
    face.className = "orb-face";

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
    const href = state.downItem.getAttribute("href");
    if (href && href !== "#") {
      const newWindow = window.open(href, "_blank", "noopener");
      if (newWindow) {
        newWindow.opener = null;
      }
    }
  }
  state.downItem = null;
}

async function init() {
  state.data = shuffle([...DATA]);
  buildItems(state.data);
  applyDepth();

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
