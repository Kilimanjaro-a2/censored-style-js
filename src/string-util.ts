import validateColor from "validate-color"
import { censorshipType } from "./types"

// TODO: Fix hover
export function generateStyle (
  censorshipType: censorshipType,
  censorshipColor: string = "black",
  disableOnHover: boolean = true,
  transitionSetting: string = "transition: all 0.5s 0s ease"
): string {
  let baseStyle = ""
  // let hoverStyle = ""
  switch (censorshipType) {
    case "paint":
      {
        const color = validateColor(censorshipColor) ? censorshipColor : "black"
        baseStyle = `color: ${color}; background-color: ${color};`
        // hoverStyle = ` :hover, :active { color: initial; background-color: initial; ${transitionSetting}; }`
      }
      break
    case "blur":
      baseStyle = "filter: blur(2px);"
      // hoverStyle = ` :hover, :active { filter: none; ${transitionSetting}; }`
      break
    case "visible":
      /* FALLTHROUGH */
    default:
      break
  }
  // if (disableOnHover) {
  //   return baseStyle + hoverStyle
  // }
  return baseStyle
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
