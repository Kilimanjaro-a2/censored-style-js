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
      baseStyle = "filter: blur(2px);"
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
      result = `color: initial; background-color: initial; ${transitionSetting};`
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
