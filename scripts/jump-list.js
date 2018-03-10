const findHeaders = () => {
  const content = document.getElementById("content");
  const headings = Array.from(
    content.querySelectorAll(
      "section > h2, section > h3, section > h4, section > h5, section > h6"
    )
  );
  const getLevel = (headingNumber, list) => {
    const levelContent = list.reduce(
      (groups, next) => {
        if (parseInt(next.tagName[1]) == headingNumber) {
          return groups.concat({
            element: next,
            content: []
          })
        } else {
          groups[groups.length - 1].content.push(next);
          return groups;
        }
      },
      []
    );
    return levelContent.map(level => {
      if (level.content.length > 0) {
        level.content = getLevel(headingNumber + 1, level.content);
      }
      return level;
    })
  };
  return getLevel(2, headings);
}

const createList = (header, prefix) => {
  const currentSafeName = `${prefix}${getSafeName(header.element.textContent)}`;

  header.element.id = currentSafeName;

  let nested = "";
  if (header.content.length > 0) {
    nested = `
<ul>
  ${header.content.map((header) => createList(header, `${currentSafeName}-`)).join("")}
</ul>`;
  }

  return `
<li>
  <a href="#${currentSafeName}">
    ${header.element.innerHTML}
  </a>
  ${nested}
</li>`;
};

const getSafeName = (text) => text.replace(/\W+/g, "-").toLowerCase();

const createJumpList = (tree) => {
  list = document.querySelector("#sidebar.jump-list > ul");
  list.innerHTML = tree.map((header) => createList(header, "")).join("");
};

window.addEventListener(
  "load",
  () => {
    const headers = findHeaders();
    createJumpList(headers);
  }
);
