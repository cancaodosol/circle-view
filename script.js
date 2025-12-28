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
};

const DATA = [
  {
    title: '４つのヨーガ実践セミナー',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2025/11/628a2422-7e28-4758-bed5-2f90dd141c1d-192x108.jpg',
    link: 'https://online.uniwa-juku.com/live/175192',
  },
  {
    title: '書籍『十種神宝』実践セミナー',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2025/10/3db723a1-d0bb-435c-9292-02cbcf4f94c2-192x108.jpg',
    link: 'https://online.uniwa-juku.com/live/172243',
  },
  {
    title: 'トークイベント・新時代をどう生きるか？未来を創るゆにわの生き方',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2025/08/むすび大学リアルセミナーサムネ-9-768x432-1-192x108.jpg',
    link: 'https://online.uniwa-juku.com/live/168597',
  },
  {
    title: '覚醒の日 ― 直感と知性が導く、新時代の生き方 ―',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2025/07/単発セミナーのサムネ-768x432-1-192x108.png',
    link: 'https://online.uniwa-juku.com/live/167024',
  },
  {
    title: '狂言に学ぶ「丹田と姿勢」実践講座～心身の軸を整える秘訣～',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2025/05/アートボード-3-のコピー-167-192x108.jpg',
    link: 'https://online.uniwa-juku.com/live/160991',
  },
  {
    title: '【第0回】神話創生プロジェクトセミナー',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2025/03/神社参拝講座2024-神話創生Project-192x108.png',
    link: 'https://online.uniwa-juku.com/live/156518',
  },
  {
    title: '及川幸久さん『マネー・スイッチ』出版記念ワークショップBE INDEPENDENT',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2025/03/アートボード-3-のコピー-156-1-192x108.jpg',
    link: 'https://online.uniwa-juku.com/live/155705',
  },
  {
    title: '最高のスタートを切るための〝立春特別セミナー〟',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2025/02/赤\u3000オレンジ\u3000ビジネス\u3000セミナー\u3000Youtubeサムネイル-1-192x108.png',
    link: 'https://online.uniwa-juku.com/live/154055',
  },
  {
    title: '年越しライブ(2024-2025)',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2024/12/467460713_1613596613365519_6004739124106922564_n-1-192x108.jpg',
    link: 'https://online.uniwa-juku.com/live/150244',
  },
  {
    title: '日本人が知りたいお金の授業',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2024/11/完成-4-192x108.png',
    link: 'https://online.uniwa-juku.com/live/142377',
  },
  {
    title: '人生を豊かにする「強運の育て方」',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2024/11/462576069_519927220954312_3640626662779094255_n-192x108.png',
    link: 'https://online.uniwa-juku.com/live/140391',
  },
  {
    title: '真の「健康」とは何か？〜気血健康法の神髄〜',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2024/10/458218906_805139718197548_2947600754233562244_n-192x108.png',
    link: 'https://online.uniwa-juku.com/live/130862',
  },
  {
    title: '戦国時代に学ぶ崩壊寸前の日本を生き抜く知恵',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2024/09/535b9db9-1ceb-4e2e-9a36-8c22134b5d5b-192x108.jpg',
    link: 'https://online.uniwa-juku.com/live/125393',
  },
  {
    title: '運命の出会いを果たす～ご縁むすびの法則～',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2024/08/452585411_860975379278427_7984033056302195836_n-192x108.png',
    link: 'https://online.uniwa-juku.com/live/120680',
  },
  {
    title: 'ゆにわの歴史と北極老人の教えとは？',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2024/07/448614291_366379672784968_4370174134725000421_n-192x108.jpg',
    link: 'https://online.uniwa-juku.com/live/109181',
  },
  {
    title: '今さら聞けない5次元の話',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2024/06/436707775_857255496433547_7470135764818269385_n-192x108.png',
    link: 'https://online.uniwa-juku.com/live/98557',
  },
  {
    title: 'セミナーでは語れない裏話～エゴを乗り越える関係性～',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2024/06/441606402_2261328970879619_3865799661331568730_n-192x108.jpg',
    link: 'https://online.uniwa-juku.com/live/98620',
  },
  {
    title: '今まで語れなかった 北極老人の話（ゆにわ塾 ダイジェスト版）',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2024/04/439184981_447037824368164_5627791047912961699_n-192x108.jpg',
    link: 'https://online.uniwa-juku.com/live/87670',
  },
  {
    title: 'YouTubeでは絶対に言えない話「あなたから世界を変える」',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2024/03/431178760_430858919449711_3595770109686856469_n-のコピー-2-192x108.jpg',
    link: 'https://online.uniwa-juku.com/live/76663',
  },
  {
    title: '【十種の神宝】第0回セミナー',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2024/03/432886694_318104987613425_1417420919867324368_n-192x108.png',
    link: 'https://online.uniwa-juku.com/live/78541',
  },
  {
    title: '2024年護符に隠された  霊的進化の秘密',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2024/03/430173812_1483684795693649_7970760704639607583_n-192x108.jpg',
    link: 'https://online.uniwa-juku.com/live/71893',
  },
  {
    title: '年越しLIVE（2023-2024）',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2024/01/412637333_929743028487144_1781805619354310957_n-1-192x108.jpg',
    link: 'https://online.uniwa-juku.com/live/58723',
  },
  {
    title: '龍の神様の力を解き放つ、ヤマト建国の秘密',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2023/11/387645579_836157638061014_7653310517491497894_n-192x108.jpg',
    link: 'https://online.uniwa-juku.com/live/56262',
  },
  {
    title: '開運！手相占い',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2023/09/373053044_1869953803400426_8955132347781522944_n-192x108.png',
    link: 'https://online.uniwa-juku.com/live/54104',
  },
  {
    title: 'インナーチャイルドを乗り越える',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2023/08/364216251_974086813831780_1963850479190994898_n-192x108.jpg',
    link: 'https://online.uniwa-juku.com/live/52295',
  },
  {
    title: '守護霊様に応援される秘訣',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2023/06/351451025_769302238080643_4666807355968775639_n-192x108.jpg',
    link: 'https://online.uniwa-juku.com/live/49784',
  },
  {
    title: '神様・仏様に愛される日本人の生き方',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2023/05/343561174_1949511225389521_7354257868584570698_n-192x108.jpg',
    link: 'https://online.uniwa-juku.com/live/48519',
  },
  {
    title: '神様に愛される生き方～家が神社になる住まいの整え方Ⅱ～',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2023/04/339134577_3440344762920153_4196140107104336115_n-192x108.jpg',
    link: 'https://online.uniwa-juku.com/live/46341',
  },
  {
    title: '「みたましずめ」第0回セミナー',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2023/03/みたましずめ（第０回バナー230319）-のコピー-2-1-192x108.jpg',
    link: 'https://online.uniwa-juku.com/live/45617',
  },
  {
    title: '神様に愛される生き方～家が神社になる住まいの整え方～',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2023/02/339648704_252940817129504_7412608898901404083_n-192x108.jpg',
    link: 'https://online.uniwa-juku.com/live/45014',
  },
  {
    title: '神様に愛される生き方～2023年の開運エネルギーを呼びこもう～',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2023/04/grandseminar-22-192x108.png',
    link: 'https://online.uniwa-juku.com/live/43996',
  },
  {
    title: '神様に愛される生き方～直観力が目覚める浄化習慣～',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2023/04/grandseminar-24-192x108.png',
    link: 'https://online.uniwa-juku.com/live/42462',
  },
  {
    title: '神様に愛される生き方～願いが叶う神社参拝～',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2023/04/grandseminar-18-192x108.png',
    link: 'https://online.uniwa-juku.com/live/42025',
  },
  {
    title: '神様に愛される生き方～美容と健康のウソ・ホント～',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2023/04/grandseminar-21-192x108.png',
    link: 'https://online.uniwa-juku.com/live/40351',
  },
  {
    title: '神様に愛される生き方～神体づくり～',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2023/04/grandseminar-15-192x108.png',
    link: 'https://online.uniwa-juku.com/live/39601',
  },
  {
    title: '神様に愛される生き方～お金の授業～',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2023/04/grandseminar-16-192x108.png',
    link: 'https://online.uniwa-juku.com/live/39089',
  },
  {
    title: '神様に愛される生き方～開運！六龍法占い～',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2023/04/grandseminar-19-192x108.png',
    link: 'https://online.uniwa-juku.com/live/37779',
  },
  {
    title: '神様に愛される生き方～しあわせ開運ごはん～',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2023/04/grandseminar-20-192x108.png',
    link: 'https://online.uniwa-juku.com/live/37180',
  },
  {
    title: '神様に愛される生き方～しあわせな人生ストーリーの作り方～',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2023/04/grandseminar-17-192x108.png',
    link: 'https://online.uniwa-juku.com/live/38557',
  },
  {
    title: '【半年講座セミナー】第0回「最澄と空海の秘法」【編集版】',
    url: 'https://online.uniwa-juku.com/wp/wp-content/uploads/2022/04/sk22-after-1-3-192x108.jpg',
    link: 'https://online.uniwa-juku.com/live/36227',
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
    const y2 = y1;

    const depth = (z2 + 1) / 2;
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
  stage.setPointerCapture(event.pointerId);
}

function onPointerMove(event) {
  if (!state.isDragging) return;
  const deltaX = event.clientX - state.lastX;
  const deltaY = event.clientY - state.lastY;

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
}

async function init() {
  buildItems(DATA);
  applyDepth();

  animate();
}

stage.addEventListener("pointerdown", onPointerDown);
stage.addEventListener("pointermove", onPointerMove);
stage.addEventListener("pointerup", onPointerUp);
stage.addEventListener("pointerleave", onPointerUp);

window.addEventListener("resize", () => {
  state.radius = getRadius();
  if (DATA.length) {
    buildItems(DATA);
  }
});

init();
