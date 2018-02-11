// Helper to select an array of DOM elements.
const selectDomArray = selector => Array.prototype.slice.call(
  document.querySelectorAll(
    selector
  )
);

// Removes empty lines and indentation evenly from a block of text.
const removeIndentation = text => {
  // Split up the lines and remove empties.
  const lines = text
    .split("\n")
    .filter(line => line.trim().length > 0);

  // Find the lowest level of indentation.
  const indentation = lines
    .map(line => line.search(/\S/))
    .reduce((minimum, spaces) => Math.min(minimum, spaces), lines[0].length);

  // Rebuild the string without the indentation.
  return lines
    .map(line => line.substring(indentation))
    .join("\n");
}

// Creates the code container.
const createCodeElement = (html) => {
  // Add the content to an inner code element.
  const code = document.createElement("code");
  code.appendChild(
    document.createTextNode(
      removeIndentation(html)
    )
  );

  // Add an outer pre wrapper.
  const pre = document.createElement("pre");
  pre.classList.add("demo--code", "code-block");
  pre.appendChild(code);

  return pre;
};

// Content template for the new window.
// Copy the current <head> so we get all the styles.
const head = document.querySelector("head").outerHTML;
const demoContent = text => `<html>${head}<body>${text}</body></html>`;

// Creates a button that will show a standalone preview.
const createPreviewButton = content => {
  const button = document.createElement("button");
  button.classList.add("demo--button");
  button.appendChild(
    document.createTextNode("Show Demo")
  );

  button
    .addEventListener(
      "click",
      () => window.open().document.write(
        demoContent(content)
      )
    );

  return button;
}

attachPreview = () => selectDomArray(".demo").forEach(
  demo => {
    content = demo.querySelector(".demo--preview").innerHTML;

    demo.appendChild(
      createCodeElement(content)
    );

    demo.appendChild(
      createPreviewButton(content)
    );
  }
);

window.addEventListener("load", attachPreview);
