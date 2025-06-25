import { extensions as orignalExtensions } from "./data.js";
import {
  displayExtension,
  activeExtensions,
  inActiveExtensions,
  containsActive,
  setActiveButton,
} from "./utils.js";
import { setThemeLight, setThemeDark, isLight } from "./theme.js";

const extensionContainer = document.querySelector(".extensions-grid");
const btnTheme = document.querySelector(".btn.theme");
const btnAll = document.querySelector("#btn-all");
const btnActive = document.querySelector("#btn-active");
const btnInactive = document.querySelector("#btn-inactive");

const filters = document.querySelectorAll("li .filter");

let extensions = [...orignalExtensions];
displayExtension(extensions, extensionContainer);
//* aplicar tema guardado
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") setThemeLight(filters);

btnTheme.addEventListener("click", () => {
  isLight ? setThemeDark(filters) : setThemeLight(filters);
  localStorage.setItem("theme", isLight ? "light" : "dark");
});

extensionContainer.addEventListener("click", (e) => {
  const card = e.target.closest(".extension-card");
  if (!card) return;
  const extensionName = card.querySelector(".extension-name").textContent;

  console.log(e.target);
  if (e.target.classList.contains("toggle")) {
    e.target.classList.toggle("active");

    extensions = extensions.map((ext) =>
      ext.name === extensionName ? { ...ext, isActive: !ext.isActive } : ext
    );
    if (!containsActive(btnActive) && !containsActive(btnInactive)) return;
  } else if (e.target.classList.contains("remove"))
    extensions = extensions.filter((ext) => ext.name !== extensionName);

  if (containsActive(btnActive))
    displayExtension(activeExtensions(extensions), extensionContainer);
  else if (containsActive(btnInactive))
    displayExtension(inActiveExtensions(extensions), extensionContainer);
  else displayExtension(extensions, extensionContainer);
});

btnAll.addEventListener("click", () => {
  setActiveButton(btnAll, filters);
  displayExtension(extensions, extensionContainer);
});

btnActive.addEventListener("click", () => {
  setActiveButton(btnActive, filters);
  displayExtension(activeExtensions(extensions), extensionContainer);
});
btnInactive.addEventListener("click", () => {
  setActiveButton(btnInactive, filters);
  displayExtension(inActiveExtensions(extensions), extensionContainer);
});
