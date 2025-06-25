export let isLight = document.body.classList.contains("light-theme");
const mainHeader = document.querySelector(".main-header");

export function setThemeLight(filters) {
  document.body.classList.add("light-theme");
  mainHeader.classList.add("box-shadow");
  document.querySelector(".sunIcon").classList.add("hidden");
  document.querySelector(".moonIcon").classList.remove("hidden");
  filters.forEach((f) => {
    if (!f.classList.contains("active")) f.classList.add("filter-shadow");
  });
  isLight = true;
}

export function setThemeDark(filters) {
  document.body.classList.remove("light-theme");
  mainHeader.classList.remove("box-shadow");
  document.querySelector(".sunIcon").classList.remove("hidden");
  document.querySelector(".moonIcon").classList.add("hidden");
  filters.forEach((f) => f.classList.remove("filter-shadow"));
  isLight = false;
}
