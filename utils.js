import { isLight } from "./theme.js";

export function displayExtension(exten, container) {
  container.innerHTML = "";
  exten.forEach(({ logo, name, description, isActive }) => {
    const extensionEL = `
     <article class="extension-card">
      <header class="extension-header flex">
      <img class="extension-img" src="${logo}" alt="${name} logo" />
      <div>
        <h2 class="extension-name txt-2 txt-primary">${name}</h2>
        <p class="extension-description txt-5 txt-secondary">${description}</p>
      </div>
    </header>
    <footer class="extension-actions flex items-center justify-between">
      <button type="button" class="btn remove txt-5 txt-secondary">Remove</button>
      <button type="button" class="btn toggle ${
        isActive ? "active" : ""
      } txt-5"></button>
    </footer>
    </article>
    `;
    container.insertAdjacentHTML("beforeend", extensionEL);
  });
}

export function setActiveButton(activeBtn, filters) {
  const currentActive = document.querySelector(".filter.active");
  currentActive?.classList.remove("active");
  if (isLight) currentActive?.classList.add("filter-shadow");

  activeBtn.classList.add("active");
  activeBtn.classList.remove("filter-shadow");
}

export const containsActive = (el) => el.classList.contains("active");
export const activeExtensions = (ext) => ext.filter((ext) => ext.isActive);
export const inActiveExtensions = (ext) => ext.filter((ext) => !ext.isActive);
