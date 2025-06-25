let extensions = [
  {
    logo: "./assets/images/logo-devlens.svg",
    name: "DevLens",
    description:
      "Quickly inspect page layouts and visualize element boundaries.",
    isActive: true,
  },
  {
    logo: "./assets/images/logo-style-spy.svg",
    name: "StyleSpy",
    description: "Instantly analyze and copy CSS from any webpage element.",
    isActive: true,
  },
  {
    logo: "./assets/images/logo-speed-boost.svg",
    name: "SpeedBoost",
    description: "Optimizes browser resource usage to accelerate page loading.",
    isActive: false,
  },
  {
    logo: "./assets/images/logo-json-wizard.svg",
    name: "JSONWizard",
    description:
      "Formats, validates, and prettifies JSON responses in-browser.",
    isActive: true,
  },
  {
    logo: "./assets/images/logo-tab-master-pro.svg",
    name: "TabMaster Pro",
    description: "Organizes browser tabs into groups and sessions.",
    isActive: true,
  },
  {
    logo: "./assets/images/logo-viewport-buddy.svg",
    name: "ViewportBuddy",
    description:
      "Simulates various screen resolutions directly within the browser.",
    isActive: false,
  },
  {
    logo: "./assets/images/logo-markup-notes.svg",
    name: "Markup Notes",
    description:
      "Enables annotation and notes directly onto webpages for collaborative debugging.",
    isActive: true,
  },
  {
    logo: "./assets/images/logo-grid-guides.svg",
    name: "GridGuides",
    description:
      "Overlay customizable grids and alignment guides on any webpage.",
    isActive: false,
  },
  {
    logo: "./assets/images/logo-palette-picker.svg",
    name: "Palette Picker",
    description: "Instantly extracts color palettes from any webpage.",
    isActive: true,
  },
  {
    logo: "./assets/images/logo-link-checker.svg",
    name: "LinkChecker",
    description: "Scans and highlights broken links on any page.",
    isActive: true,
  },
  {
    logo: "./assets/images/logo-dom-snapshot.svg",
    name: "DOM Snapshot",
    description: "Capture and export DOM structures quickly.",
    isActive: false,
  },
  {
    logo: "./assets/images/logo-console-plus.svg",
    name: "ConsolePlus",
    description:
      "Enhanced developer console with advanced filtering and logging.",
    isActive: true,
  },
];

const extensionContainer = document.querySelector(".extensions-grid");
const btnTheme = document.querySelector(".btn.theme");
const toggle = document.querySelector(".toggle");
const btnAll = document.querySelector("#btn-all");
const btnActive = document.querySelector("#btn-active");
const btnInactive = document.querySelector("#btn-inactive");
const mainHeader = document.querySelector(".main-header");
const filters = document.querySelectorAll("li .filter");
let isLight = document.body.classList.contains("light-theme");

displayExtension(extensions);
//* aplicar tema guardado
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") setThemeLight();

btnTheme.addEventListener("click", () => {
  isLight ? setThemeDark() : setThemeLight();
  localStorage.setItem("theme", isLight ? "light" : "dark");
});

extensionContainer.addEventListener("click", (e) => {
  const card = e.target.closest(".extension-card");
  if (!card) return;
  const extensionName = card.querySelector(".extension-name").textContent;

  if (e.target.classList.contains("toggle")) {
    e.target.classList.toggle("active");

    extensions = extensions.map((ext) =>
      ext.name === extensionName ? { ...ext, isActive: !ext.isActive } : ext
    );
    if (!containsActive(btnActive) && !containsActive(btnInactive)) return;
  } else if (e.target.classList.contains("remove"))
    extensions = extensions.filter((ext) => ext.name !== extensionName);

  if (containsActive(btnActive)) displayExtension(activeExtensions(extensions));
  else if (containsActive(btnInactive))
    displayExtension(inActiveExtensions(extensions));
  else displayExtension(extensions);
});

btnAll.addEventListener("click", () => {
  setActiveButton(btnAll);
  displayExtension(extensions);
});

btnActive.addEventListener("click", () => {
  setActiveButton(btnActive);
  displayExtension(activeExtensions(extensions));
});
btnInactive.addEventListener("click", () => {
  setActiveButton(btnInactive);
  displayExtension(inActiveExtensions(extensions));
});
const containsActive = (el) => el.classList.contains("active");
const activeExtensions = (ext) => ext.filter((ext) => ext.isActive);
const inActiveExtensions = (ext) => ext.filter((ext) => !ext.isActive);

function setActiveButton(activeBtn) {
  filters.forEach((filter) => {
    filter.classList.remove("active");
    if (isLight) filter.classList.add("filter-shadow");
  });

  activeBtn.classList.add("active");
  activeBtn.classList.remove("filter-shadow");
}

function setThemeLight() {
  document.body.classList.add("light-theme");
  mainHeader.classList.add("box-shadow");
  document.querySelector(".sunIcon").classList.add("hidden");
  document.querySelector(".moonIcon").classList.remove("hidden");
  filters.forEach((filter) => {
    if (!filter.classList.contains("active"))
      filter.classList.add("filter-shadow");
  });
  isLight = true;
}
function setThemeDark() {
  document.body.classList.remove("light-theme");
  mainHeader.classList.remove("box-shadow");
  document.querySelector(".sunIcon").classList.remove("hidden");
  document.querySelector(".moonIcon").classList.add("hidden");
  filters.forEach((filter) => filter.classList.remove("filter-shadow"));
  isLight = false;
}

function displayExtension(exten) {
  extensionContainer.innerHTML = "";
  exten.forEach((ext) => {
    const { logo, name, description, isActive } = ext;
    const extensionEL = `
     <article class="extension-card">
      <header class="extension-header flex">
      <img
        class="extension-img"
        src="${logo}"
        alt="${name} logo"
      />
      <div>
        <h2 class="extension-name txt-2 txt-primary">${name}</h2>
        <p class="extension-description txt-5 txt-secondary">${description}</p>
      </div>
    </header>
    <footer
      class="extension-actions flex items-center justify-between"
    >
      <button type="button" class="btn remove txt-5 txt-secondary">Remove</button>
      <button type="button" class="btn toggle ${
        isActive ? "active" : ""
      } txt-5"></button>
    </footer>
    </article>
  `;

    extensionContainer.insertAdjacentHTML("beforeend", extensionEL);
  });
}
