// ==== DATA DE LAS BUILDS ====

const builds = [
  {
    id: 1,
    nombre: "PC Estudio / Oficina Esencial",
    tipo: "estudio",
    uso: "Tareas, clases online, ofimática y navegación.",
    presupuesto: "≈ 400 - 500 USD",
    nivel: "Principiante",
    destacados: [
      "CPU básico con gráficos integrados",
      "8 GB RAM (ampliable a 16 GB)",
      "SSD 240-480 GB para rapidez"
    ],
    detalles:
      "Ideal si tu prioridad es estudiar y trabajar con documentos. Lo importante aquí es un SSD y suficiente RAM. No necesitas GPU dedicada, lo que te permite ahorrar para un monitor cómodo y un buen teclado."
  },
  {
    id: 2,
    nombre: "PC Gamer Inicial (1080p)",
    tipo: "gaming",
    uso: "Juegos competitivos tipo Valorant, LoL, CS2 en 1080p.",
    presupuesto: "≈ 700 - 900 USD",
    nivel: "Intermedio",
    destacados: [
      "CPU con 6 núcleos",
      "16 GB RAM",
      "GPU gama media (4-8 GB VRAM)"
    ],
    detalles:
      "Pensada para jugadores que quieren buenos FPS en 1080p sin gastar de más. Aquí la GPU y la RAM son clave. Con una buena fuente y placa, podrás mejorar la gráfica más adelante."
  },
  {
    id: 3,
    nombre: "PC para Edición de Video Básica",
    tipo: "edicion",
    uso: "Edición de video en 1080p, manejo de proyectos ligeros.",
    presupuesto: "≈ 900 - 1200 USD",
    nivel: "Intermedio",
    destacados: [
      "CPU con buen rendimiento en multi-hilo",
      "16 GB RAM (ideal 32 GB a futuro)",
      "SSD NVMe + HDD para almacenamiento"
    ],
    detalles:
      "Si editas video, el procesador, la RAM y el almacenamiento son más importantes que una GPU ultra potente. Conviene tener un SSD rápido para el sistema y proyectos, y un HDD barato para archivos terminados."
  },
  {
    id: 4,
    nombre: "PC Streaming + Gaming",
    tipo: "streaming",
    uso: "Jugar y hacer directos a la vez en 1080p.",
    presupuesto: "≈ 1100 - 1500 USD",
    nivel: "Avanzado",
    destacados: [
      "CPU con muchos núcleos / hilos",
      "16-32 GB RAM",
      "GPU sólida + buena fuente"
    ],
    detalles:
      "La clave está en balancear CPU y GPU. Un buen procesador permite jugar y codificar el stream sin caídas fuertes. No olvides la fuente de poder de calidad y una buena ventilación para controlar temperaturas."
  },
  {
    id: 5,
    nombre: "PC Estudio + Gaming Ligero",
    tipo: "estudio",
    uso: "Estudiar, ofimática y juegos ligeros/indies.",
    presupuesto: "≈ 550 - 700 USD",
    nivel: "Principiante",
    destacados: [
      "CPU con gráficos integrados decentes",
      "16 GB RAM",
      "SSD 480 GB"
    ],
    detalles:
      "Perfecta si pasas el día en clases, pero también quieres jugar títulos poco exigentes sin invertir en una GPU dedicada. La RAM y un buen SSD marcan la diferencia en la fluidez general."
  },
  {
    id: 6,
    nombre: "PC Creativo Multimedia",
    tipo: "edicion",
    uso: "Diseño gráfico, edición de fotos y algo de video.",
    presupuesto: "≈ 800 - 1100 USD",
    nivel: "Intermedio",
    destacados: [
      "Pantalla/monitor con buen color (sugerencia)",
      "16 GB RAM",
      "SSD rápido, CPU equilibrado"
    ],
    detalles:
      "Pensada para creadores que trabajan con Photoshop, Illustrator y algo de Premiere. Aquí también cuenta mucho un buen monitor calibrado y espacio suficiente en disco para tus recursos."
  }
];

// ==== RENDER DE BUILDS ====

const buildsList = document.getElementById("builds-list");

function createBuildCard(build) {
  const card = document.createElement("article");
  card.className = "card";
  card.dataset.tipo = build.tipo;

  card.innerHTML = `
    <div class="card-header">
      <div>
        <h4 class="card-title">${build.nombre}</h4>
        <p class="card-usage">${build.uso}</p>
      </div>
      <span class="badge-type">${etiquetaTipo(build.tipo)}</span>
    </div>

    <div class="card-meta">
      <span>Presupuesto: <strong>${build.presupuesto}</strong></span>
      <span class="card-tag">${build.nivel}</span>
    </div>

    <div class="card-specs">
      <ul>
        ${build.destacados.map(item => `<li>${item}</li>`).join("")}
      </ul>
    </div>

    <div class="card-actions">
      <button class="ghost small toggle-details">Ver detalles</button>
      <span class="muted">Pensada para: <strong>${etiquetaTipo(build.tipo)}</strong></span>
    </div>

    <div class="card-details">
      <p>${build.detalles}</p>
    </div>
  `;

  return card;
}

function etiquetaTipo(tipo) {
  switch (tipo) {
    case "estudio":
      return "Estudio / Oficina";
    case "gaming":
      return "Gaming";
    case "edicion":
      return "Edición / Creativo";
    case "streaming":
      return "Streaming";
    default:
      return "General";
  }
}

function renderBuilds(filter = "all") {
  buildsList.innerHTML = "";
  const filtradas =
    filter === "all" ? builds : builds.filter(b => b.tipo === filter);

  if (filtradas.length === 0) {
    const empty = document.createElement("p");
    empty.className = "muted";
    empty.textContent =
      "No hay builds para este filtro todavía. Prueba con otro tipo de uso.";
    buildsList.appendChild(empty);
    return;
  }

  filtradas.forEach(build => {
    const card = createBuildCard(build);
    buildsList.appendChild(card);
  });
}

// ==== FILTROS CHIP ====

const chips = document.querySelectorAll(".chip");
chips.forEach(chip => {
  chip.addEventListener("click", () => {
    chips.forEach(c => c.classList.remove("active"));
    chip.classList.add("active");

    const type = chip.dataset.type;
    renderBuilds(type === "all" ? "all" : type);
  });
});

// ==== DETALLES DE CADA CARD (EVENT DELEGATION) ====

buildsList.addEventListener("click", e => {
  const btn = e.target.closest(".toggle-details");
  if (!btn) return;

  const card = btn.closest(".card");
  const details = card.querySelector(".card-details");
  const isVisible = details.classList.contains("visible");

  details.classList.toggle("visible");
  btn.textContent = isVisible ? "Ver detalles" : "Ocultar detalles";
});

// ==== SCROLL SUAVE NAVEGACIÓN ====

const scrollButtons = document.querySelectorAll("[data-scroll]");

scrollButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const targetId = btn.dataset.scroll;
    const target =
      targetId === "builds" || targetId === "tips" || targetId === "wizard"
        ? document.getElementById(targetId)
        : null;

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

// ==== WIZARD ====

const budgetInput = document.getElementById("budget");
const budgetValue = document.getElementById("budget-value");
const wizardBtn = document.getElementById("wizard-btn");
const wizardResult = document.getElementById("wizard-result");
const usageSelect = document.getElementById("usage");

if (budgetInput && budgetValue) {
  budgetValue.textContent = budgetInput.value;
  budgetInput.addEventListener("input", () => {
    budgetValue.textContent = budgetInput.value;
  });
}

if (wizardBtn) {
  wizardBtn.addEventListener("click", () => {
    const uso = usageSelect.value;
    const presupuesto = parseInt(budgetInput.value, 10);

    const recomendacion = sugerirBuild(uso, presupuesto);

    wizardResult.innerHTML = `
      <h4>${recomendacion.titulo}</h4>
      <p>${recomendacion.texto}</p>
    `;
    wizardResult.classList.remove("hidden");

    // Scroll suave al resultado dentro de la sección
    wizardResult.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}

function sugerirBuild(uso, presupuesto) {
  let texto = "";
  let titulo = "";

  if (uso === "estudio") {
    if (presupuesto < 450) {
      titulo = "Ve por una PC de estudio básica.";
      texto =
        "Prioriza un procesador con gráficos integrados, 8 GB de RAM (ampliable) y un SSD de al menos 240 GB. Más adelante podrás ampliar la RAM si lo necesitas.";
    } else if (presupuesto < 700) {
      titulo = "PC estudio + algo de gaming ligero.";
      texto =
        "Con este presupuesto puedes optar por 16 GB de RAM, un SSD más grande y, si quieres, una GPU modesta o una APU potente que te permita juegos ligeros.";
    } else {
      titulo = "PC estudio muy cómoda y preparada para el futuro.";
      texto =
        "Puedes invertir en una mejor pantalla, 16 GB de RAM y un SSD NVMe rápido. No necesitas una GPU top, enfócate en comodidad: buen monitor, teclado y silla.";
    }
  }

  if (uso === "gaming") {
    if (presupuesto < 700) {
      titulo = "Empieza con una PC gamer inicial en 1080p.";
      texto =
        "Una GPU de gama media-baja, 16 GB de RAM y un procesador decente te permitirán jugar títulos competitivos si ajustas gráficos. Cuida que la fuente sea de marca.";
    } else if (presupuesto < 1200) {
      titulo = "PC gamer 1080p muy sólida.";
      texto =
        "Puedes aspirar a una GPU de gama media con buen rendimiento, 16 GB de RAM y un CPU de 6-8 núcleos. Ideal para disfrutar casi todo en alto a 1080p.";
    } else {
      titulo = "PC gamer de gama media-alta.";
      texto =
        "Considera una GPU potente y un buen procesador, pensando también en monitores de mayor tasa de refresco. No olvides un case con buena ventilación.";
    }
  }

  if (uso === "edicion") {
    if (presupuesto < 900) {
      titulo = "PC básica para edición de video/fotos.";
      texto =
        "Prioriza un buen CPU, 16 GB de RAM y un SSD rápido. Una GPU sencilla puede bastar si no trabajas con efectos muy pesados.";
    } else if (presupuesto < 1300) {
      titulo = "PC equilibrada para proyectos serios.";
      texto =
        "Piensa en 16-32 GB de RAM, SSD NVMe para proyectos y un HDD para archivo. Un CPU fuerte en multi-hilo agilizará exportaciones.";
    } else {
      titulo = "PC creativa muy capaz.";
      texto =
        "Con este rango puedes ir por 32 GB de RAM, SSD amplios y una GPU competente. También es buen momento para invertir en un monitor con buen color.";
    }
  }

  if (uso === "streaming") {
    if (presupuesto < 1000) {
      titulo = "Empieza con streaming básico.";
      texto =
        "Prioriza un CPU con buen número de hilos y 16 GB de RAM. Es posible que debas ajustar calidad/gráficos, pero podrás hacer directos aceptables.";
    } else if (presupuesto < 1500) {
      titulo = "PC equilibrada para gaming + streaming.";
      texto =
        "Un buen CPU multi-hilo, 16-32 GB de RAM y una GPU gama media-alta te permitirán streamear en 1080p con buena calidad.";
    } else {
      titulo = "Set-up para streaming muy sólido.";
      texto =
        "Con este presupuesto puedes ir por un procesador potente, GPU fuerte, buena capturadora (si usas consola) y un setup que priorice también audio e iluminación.";
    }
  }

  return { titulo, texto };
}

// ==== INICIALIZAR ====
renderBuilds("all");


// ==== TRADUCCIONES ====
const translations = {
  es: {
    "brand.title": "PCs For You",
    "brand.subtitle": "Elige la PC correcta según lo que haces.",

    "nav.builds": "Builds",
    "nav.tips": "Consejos",
    "nav.wizard": "Te ayudo a elegir",

    "hero.title": "Guías simples para elegir tu PC, sin tecnicismos raros.",
    "hero.text": "¿PC para estudiar, jugar, editar o hacer streaming? Aquí tienes builds claras, consejos y pequeños trucos para que no malgastes tu dinero.",
    "hero.cta.builds": "Ver builds recomendadas",
    "hero.cta.wizard": "No sé qué necesito",
    "hero.badge1": "💻 Principiantes bienvenidos",
    "hero.badge2": "🧩 Componentes explicados fácil",
    "hero.badge3": "💡 Consejos para ahorrar",

    "side.title": "Filtrar por tipo de uso",
    "side.text": "Elige para qué usarás la PC y te mostramos las builds más adecuadas.",
    "filter.all": "Todo",
    "filter.study": "Estudio / Oficina",
    "filter.gaming": "Gaming",
    "filter.edit": "Edición de video / diseño",
    "filter.stream": "Streaming",
    "side.summary.title": "Resumen rápido:",
    "side.summary.item1": "RAM: 8 GB mínimo, 16 GB ideal para gaming/edición.",
    "side.summary.item2": "SSD: siempre mejor que solo HDD.",
    "side.summary.item3": "Fuente de poder: no escatimes, protege todo tu equipo.",

    "builds.title": "Builds recomendadas",
    "builds.text": "Cada build incluye propósito, componentes clave y una estimación de presupuesto. Haz clic en “Ver detalles” para entender el porqué de cada pieza.",

    "tips.title": "Consejos esenciales antes de comprar",
    "tips.text": "Antes de gastar, asegúrate de tener claros estos puntos. Te pueden ahorrar mucho dinero.",
    "tips.card1.title": "No pagues por potencia que no usarás",
    "tips.card1.text": "Si solo vas a estudiar, ver clases y navegar, una PC de gama media con SSD te irá mejor que una súper GPU mal acompañada.",
    "tips.card2.title": "La fuente de poder es tu seguro",
    "tips.card2.text": "Una fuente barata y de mala calidad puede dañar todo tu equipo. Asegúrate de que sea de marca confiable y con la potencia suficiente.",
    "tips.card3.title": "Piensa en el futuro",
    "tips.card3.text": "A veces conviene invertir un poco más en placa base y fuente para poder mejorar otros componentes más adelante sin cambiar todo.",
    "tips.card4.title": "No te olvides de la ventilación",
    "tips.card4.text": "Un buen flujo de aire baja temperaturas, reduce ruido y alarga la vida de tus componentes. No es solo estética.",

    "compdet.title": "Tipos y cómo leer los nombres (guía rápida por componente)",
    "compdet.text": "Para cada componente verás: familias/tipos, qué significan las letras/números en los modelos y ejemplos prácticos.",

    "compdet.cpu.title": "CPU (Procesador)",
    "compdet.cpu.subtitle": "Familias, generaciones y letras en los modelos.",
    "compdet.cpu.types.title": "Tipos / Familias",
    "compdet.cpu.types.item1": "AMD Ryzen: Ryzen 3 / 5 / 7 / 9 (de entrada a entusiasta).",
    "compdet.cpu.types.item2": "Intel Core: i3 / i5 / i7 / i9 (similar por gamas).",
    "compdet.cpu.types.item3": "APUs: CPUs con gráficos integrados (útiles si no quieres GPU dedicada).",
    "compdet.cpu.how.title": "Cómo leer un nombre (ejemplo: Ryzen 5 5600X)",
    "compdet.cpu.how.item1": "Ryzen 5 → gama media.",
    "compdet.cpu.how.item2": "5600 → serie/ generación (5xxx → 5ª gen / Zen 3).",
    "compdet.cpu.how.item3": "X → variante con frecuencia/rendimiento mejorado.",
    "compdet.cpu.how.note": "Letras típicas: X (más rápido), G (gráficos integrados), X3D (caché 3D).",

    "compdet.gpu.title": "GPU (Tarjeta gráfica)",
    "compdet.gpu.subtitle": "Series, VRAM y significado de sufijos en modelos.",
    "compdet.gpu.types.title": "Tipos / Familias",
    "compdet.gpu.types.item1": "NVIDIA GeForce: GTX (anterior), RTX (ray-tracing), tarjetas numeradas por generaciones (ex: 20xx, 30xx, 40xx).",
    "compdet.gpu.types.item2": "AMD Radeon: RX 5000, RX 6000, RX 7000, etc.",
    "compdet.gpu.types.item3": "Segmentos: entrada / media / alta / entusiasta (según serie y VRAM).",
    "compdet.gpu.how.title": "Cómo leer un nombre (ejemplo: RTX 3060 Ti)",
    "compdet.gpu.how.item1": "RTX → soporte ray-tracing (NVIDIA).",
    "compdet.gpu.how.item2": "3060 → generación y posición en la gama (30xx = generación); número mayor = más potente.",
    "compdet.gpu.how.item3": "Ti / Super / XT → variantes con velocidades o núcleos extras.",
    "compdet.gpu.how.item4": "VRAM → memoria de video (4GB / 6GB / 8GB / 12GB ... importante para resoluciones altas).",

    "wizard.title": "¿No sabes qué PC necesitas?",
    "wizard.text": "Responde estas preguntas rápidas y te sugiero el tipo de build más adecuada.",
    "wizard.usage.label": "¿Qué harás principalmente con tu PC?",
    "wizard.usage.study": "Estudio / Oficina",
    "wizard.usage.gaming": "Gaming",
    "wizard.usage.edit": "Edición de video / diseño",
    "wizard.usage.stream": "Streaming + Gaming",
    "wizard.budget.label": "Presupuesto aproximado (USD):",
    "wizard.button": "Sugerir tipo de PC",

    "footer.text": "PCs For You — Guías simples para que la tecnología trabaje para ti, no al revés."
  },

  en: {
    "brand.title": "PCs For You",
    "brand.subtitle": "Choose the right PC based on what you do.",

    "nav.builds": "Builds",
    "nav.tips": "Tips",
    "nav.wizard": "Help me choose",

    "hero.title": "Simple guides to choose your PC, without weird jargon.",
    "hero.text": "PC for studying, gaming, editing or streaming? Here you’ll find clear builds, tips and tricks so you don’t waste your money.",
    "hero.cta.builds": "View recommended builds",
    "hero.cta.wizard": "I don’t know what I need",
    "hero.badge1": "💻 Beginners welcome",
    "hero.badge2": "🧩 Components explained simply",
    "hero.badge3": "💡 Tips to save money",

    "side.title": "Filter by use case",
    "side.text": "Choose how you’ll use the PC and we’ll show you the most suitable builds.",
    "filter.all": "All",
    "filter.study": "Study / Office",
    "filter.gaming": "Gaming",
    "filter.edit": "Video editing / design",
    "filter.stream": "Streaming",

    "side.summary.title": "Quick summary:",
    "side.summary.item1": "RAM: 8 GB minimum, 16 GB ideal for gaming/editing.",
    "side.summary.item2": "SSD: always better than only HDD.",
    "side.summary.item3": "Power supply: don’t go cheap, it protects your whole system.",

    "builds.title": "Recommended builds",
    "builds.text": "Each build includes purpose, key components and an estimated budget. Click “View details” to understand why each part was chosen.",

    "tips.title": "Essential tips before buying",
    "tips.text": "Before spending money, make sure you understand these points. They can save you a lot.",
    "tips.card1.title": "Don’t pay for power you won’t use",
    "tips.card1.text": "If you’ll only study, watch classes and browse, a mid-range PC with SSD is better than a huge GPU with weak parts.",
    "tips.card2.title": "The power supply is your insurance",
    "tips.card2.text": "A cheap, low-quality PSU can damage your entire system. Choose a reliable brand with enough wattage.",
    "tips.card3.title": "Think about the future",
    "tips.card3.text": "Sometimes it’s worth spending a bit more on motherboard and PSU so you can upgrade later without changing everything.",
    "tips.card4.title": "Don’t forget airflow",
    "tips.card4.text": "Good airflow lowers temps, reduces noise and extends component life. It’s not just aesthetics.",

    "compdet.title": "Types and how to read names (quick guide by component)",
    "compdet.text": "For each component you'll see: families/types, what letters/numbers mean in model names, and practical examples.",

    "compdet.cpu.title": "CPU (Processor)",
    "compdet.cpu.subtitle": "Families, generations and letters in the models.",
    "compdet.cpu.types.title": "Types / Families",
    "compdet.cpu.types.item1": "AMD Ryzen: Ryzen 3 / 5 / 7 / 9 (from entry to enthusiast).",
    "compdet.cpu.types.item2": "Intel Core: i3 / i5 / i7 / i9 (similar tiers).",
    "compdet.cpu.types.item3": "APUs: CPUs with integrated graphics (good if you don’t want a dedicated GPU).",
    "compdet.cpu.how.title": "How to read a name (example: Ryzen 5 5600X)",
    "compdet.cpu.how.item1": "Ryzen 5 → mid-range.",
    "compdet.cpu.how.item2": "5600 → series / generation (5xxx → 5th gen / Zen 3).",
    "compdet.cpu.how.item3": "X → variant with higher frequency / performance.",
    "compdet.cpu.how.note": "Common letters: X (faster), G (integrated graphics), X3D (3D cache).",

    "compdet.gpu.title": "GPU (Graphics card)",
    "compdet.gpu.subtitle": "Series, VRAM and suffix meanings.",
    "compdet.gpu.types.title": "Types / Families",
    "compdet.gpu.types.item1": "NVIDIA GeForce: GTX (older), RTX (ray tracing), numbered by generation (e.g. 20xx, 30xx, 40xx).",
    "compdet.gpu.types.item2": "AMD Radeon: RX 5000, RX 6000, RX 7000, etc.",
    "compdet.gpu.types.item3": "Segments: entry / mid / high / enthusiast (depends on series and VRAM).",
    "compdet.gpu.how.title": "How to read a name (example: RTX 3060 Ti)",
    "compdet.gpu.how.item1": "RTX → ray tracing support (NVIDIA).",
    "compdet.gpu.how.item2": "3060 → generation and position in the lineup (30xx = generation); higher numbers = more powerful.",
    "compdet.gpu.how.item3": "Ti / Super / XT → variants with more speed or cores.",
    "compdet.gpu.how.item4": "VRAM → video memory (4GB / 6GB / 8GB / 12GB ... matters a lot for high resolutions).",

    "wizard.title": "Not sure which PC you need?",
    "wizard.text": "Answer these quick questions and I’ll suggest the type of build that fits you best.",
    "wizard.usage.label": "What will you mainly do with your PC?",
    "wizard.usage.study": "Study / Office",
    "wizard.usage.gaming": "Gaming",
    "wizard.usage.edit": "Video editing / design",
    "wizard.usage.stream": "Streaming + Gaming",
    "wizard.budget.label": "Approximate budget (USD):",
    "wizard.button": "Suggest PC type",

    "footer.text": "PCs For You — Simple guides so technology works for you, not the other way around."
  }
};

// Cambiar idioma
function setLanguage(lang) {
  const currentLang = translations[lang] ? lang : "es";
  localStorage.setItem("siteLang", currentLang);

  const langBtns = document.querySelectorAll(".lang-btn");
  langBtns.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === currentLang);
  });

  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach(el => {
    const key = el.getAttribute("data-i18n");
    const text = translations[currentLang][key];
    if (text) {
      el.textContent = text;
    }
  });
}

// Luego, en tu DOMContentLoaded actual, al final:
document.addEventListener("DOMContentLoaded", () => {
  // ... TODO TU CÓDIGO EXISTENTE (builds, filtros, wizard, etc.) ...

  const savedLang = localStorage.getItem("siteLang") || "es";
  setLanguage(savedLang);

  const langBtns = document.querySelectorAll(".lang-btn");
  langBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      setLanguage(btn.dataset.lang);
    });
  });
});
