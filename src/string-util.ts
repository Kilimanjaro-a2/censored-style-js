import validateColor from "validate-color"
import { censorshipType } from "./types"

export function generateBaseStyle (
  censorshipType: censorshipType,
  censorshipColor: string = "black"
): string {
  let baseStyle = ""
  switch (censorshipType) {
    case "paint":
      {
        const color = validateColor(censorshipColor) ? censorshipColor : "black"
        baseStyle = `color: ${color}; background-color: ${color};`
      }
      break
    case "blur":
      baseStyle = `filter: blur(2px);`
      break
    case "visible":
      /* FALLTHROUGH */
    default:
      break
  }
  return baseStyle
}

export function generateHoverStyle (
  censorshipType: censorshipType,
  transitionSetting: string = "transition: all 0.5s 0s ease"
): string {
  let result = ""
  switch (censorshipType) {
    case "paint":
      result = `color: unset; background-color: unset; ${transitionSetting};`
      break
    case "blur":
      result = `filter: none; ${transitionSetting};`
      break
    case "visible":
      /* FALLTHROUGH */
    default:
      break
  }
  return result
}

export function replaceText (
  searchText: string,
  newText: string,
  willRepeat: boolean
): string {
  if (searchText == null || searchText === "" || newText == null || newText === "") {
    return ""
  }

  let result: string = newText
  if (willRepeat) {
    while (searchText.length > result.length) {
      result += newText
    }
    result = result.substr(0, searchText.length)
  }
  return result
}

export function generateCss (
  censorshipType: censorshipType,
  censorshipColor: string = "black"
): string {
  let result = ""
  switch (censorshipType) {
    case "paint":
      {
        const color = validateColor(censorshipColor) ? censorshipColor : "black"
        result = `
          .container {
            position: relative;
            padding: 0;
            margin: 0;
          }
          .paint-span {
            --line-height: 80%;
            --line-top: calc((100% - var(--line-height))/2);
            --line-skew-deg: -8deg;
            --color: ${color};
            position: absolute;
            display: inline-block;
            width: 100%;
            height: var(--line-height);
            top: var(--line-top);
            left: 0;
            
            background-color: var(--color);
            box-shadow: 0px 0px 2px 1px var(--color);
            border-radius: 3px;
          }
          .paint-span:hover {
            display: none;
            width: 0%;
          }
      `
      }
      break
    case "blur":
      result = `filter: blur(2px);`
      break
    case "visible":
      /* FALLTHROUGH */
    default:
      break
  }
  return result
}