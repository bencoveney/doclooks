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
  code.innerHTML = formatTags(removeIndentation(html));

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
  button.classList.add("demo--button", "button");
  button.appendChild(
    document.createTextNode("Show Demo")
  );

  button.addEventListener(
    "click",
    () => window.open().document.write(
      demoContent(content)
    )
  );

  return button;
}

const replaceMultiple = (
  input,
  regexp,
  process
) => {
  // Build a list of all matches in the input string.
  // We want a reversed list so that we can replace parts
  // of the input string without breaking match indices.
  const allMatches = []
  let match;
  while (match = regexp.exec(input)) {
    allMatches.unshift(match);
  }

  let result = input;
  allMatches.forEach((match) => {
    const location = match.index;
    const parts = match.slice(1);
    const length = parts.join("").length;
    const beforeMatch = result.substring(0, location);
    const afterMatch = result.substring(location + length);
    result = beforeMatch + process(parts).join("") + afterMatch;
  });

  return result;
};

const color = (input, color) => `<span class="is-syntax-${color}">${input}</span>`;

const formatTags = (text) => {
  return replaceMultiple(
    text,
    /(<)(\/?)(\w*)(\s[^>]*)?(>)/g,
    (
      [
        openingBracket,
        slash,
        tagName,
        tagAttributes,
        closingBracket
      ]
    ) => [
      color("&lt;", "light"),
      slash ? color(slash, "light") : "",
      color(tagName, "azure"),
      replaceMultiple(
        tagAttributes,
        /(\w*)(=)(\")([^"]*)(\")/g,
        (
          [
            attributeName,
            equals,
            openingQuote,
            attributeValue,
            closingQuote
          ]
        ) => [
          color(attributeName, "aqua"),
          color(equals, "light"),
          color(openingQuote, "orange"),
          color(attributeValue, "orange"),
          color(closingQuote, "orange")
        ]
      ),
      color("&gt;", "light")
    ]
  );
}

attachPreview = () => selectDomArray(".section > .demo").forEach(
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
