import validateColor from "validate-color"
import { censorshipType } from "./types"

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
  censorshipColor: string = "black",
  willHover: boolean = true
): string {
  let result = ""
  switch (censorshipType) {
    case "marker":
      {
        const color = validateColor(censorshipColor) ? censorshipColor : "black"
        result = markerTemplate(willHover, color, 80)
      }
      break
    case "strikethrough":
      {
        const color = validateColor(censorshipColor) ? censorshipColor : "black"
        result = markerTemplate(willHover, color, 20, 0)
      }
      break
    case "blur":
      {
        const base = `
          .container {
            position: relative;
            padding: 0;
            margin: 0;
            filter: blur(2px);
            transition: all 0.5s 0s ease;
          }
          `
        const hover = willHover
          ? `.container:hover {
            filter: none;
          }`
          : ""
        result = base + hover
      }
      break
    case "visible":
      /* FALLTHROUGH */
    default:
      break
  }
  return result
}

export function isTrueAsBoolean (text: string): boolean {
  const regex = /true/i
  return regex.test(text)
}

function markerTemplate (willHober: boolean, color: string, lineHeightPercentage: number = 80, deg: number = -5): string {
  const base: string = `
    .container {
      position: relative;
      padding: 0;
      margin: 0;
    }
    .paint-span {
      --line-height: ${lineHeightPercentage}%;
      --line-top: calc((100% - var(--line-height))/2);
      --line-skew-deg: ${deg}deg;
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

      transition: all 0.5s 0s ease;
    }

  `
  const hover: string = willHober
    ? `
    .paint-span:hover {
      color: unset;
      background-color: unset;
      box-shadow: 0px 0px 2px 1px transparent;
    }`
    : ""

  return base + hover
}
