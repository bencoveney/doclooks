const setTheme = (name) => {
  document
    .querySelector("[rel=stylesheet]")
    .setAttribute("href", `./dist/${name}.css`);
};

const bindThemeButtons = () => {
  const buttons = Array.from(
    document.querySelectorAll("button[data-theme]")
  );
  buttons.forEach(
    button => {
      const name = button.dataset.theme;
      button.addEventListener(
        "click",
        () => setTheme(name)
      );
    }
  );
};

window.addEventListener(
  "load",
  bindThemeButtons
);
