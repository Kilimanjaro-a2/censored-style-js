import { censorshipType } from "./types"

export function generateStyle (
  censorshipType: censorshipType,
  censorshipElement: string,
  censorshipColor: string = "black",
  disableOnHover: boolean = true,
  transitionSetting: string = "transition: all 0.5s 0s ease;"
): string {
  let baseStyle = ""
  let hoverStyle = ""
  switch (censorshipType) {
    case "paint":
      baseStyle = `${censorshipElement} { color: ${censorshipColor}; background-color: ${censorshipColor}; }`
      hoverStyle = `${censorshipElement}:hover, ${censorshipElement}:active
{ color: initial; background-color: initial; ${transitionSetting}; }`
      break
    case "blur":
      baseStyle = `${censorshipElement} { filter: blur(2px); }`
      hoverStyle = `${censorshipElement}:hover, ${censorshipElement}:active { filter: none; ${transitionSetting}; }`
      break
    case "visible":
      /* FALLTHROUGH */
    default:
      break
  }
  if (disableOnHover) {
    return baseStyle + hoverStyle
  }
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
