# doclooks

CSS framework for documentation using SMACSS.

- `base/`
  - General rules for all elements of that type
  - Defaults
  - No classes
  - Usually elements but also attributes, children and siblings
  - Examples:
    - `body`
    - `p`
    - `input[type=text]`
    - `a:hover`
- `layout/`
  - Divides the page into major sections
  - Holds modules together
    - Use IDs
    - Examples
      - `#header`
      - `#main`
      - `#footer`
      - `#sidebar`
  - Utility classes for layout
  - Classes with `l-` prefix
  - Examples
    - `.l-pull-right`
    - `.l-inline`
- `modules/`
  - Re-usable modular parts of the design
  - Avoid IDs, elements
  - Examples:
    - `.navigation`
    - `.card`
    - `.column`
  - Include sub-sections
    - `.card`
    - `.card--label`
    - `.card--meta`
    - `.card--header`
    - `.card--copy`
    - `.card--tags`
    - `.tags`
    - `.tags--tag`
    - `.nav`
    - `.nav--item`
    - `.nav--search`
- `state/`
  - What an element looks like when it is in a certain state
  - Could use `!important`
  - Examples:
    - `.is-selected`
    - `.is-hidden`
    - `.is-expanded`
- `theme/`
  - Overwrite rules for a specific theme

## Reset

CSS Reset using the [meyerweb reset](https://meyerweb.com/eric/tools/css/reset/)

## Fonts

System fonts from GitHub.

Font sizes from [Type Scale](http://type-scale.com/).

## Links

- [Beautiful Docs](https://github.com/PharkMillups/beautiful-docs)
- [BEM Quick Start](https://en.bem.info/methodology/quick-start/)
- [Colors](https://color.adobe.com/Midori-and-Madoka-color-theme-2044087/)
- [Responsive Page Layout](https://superdevresources.com/fixed-width-sidebar/)
