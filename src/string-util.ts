import validateColor from "validate-color"
import filterXSS from "xss"
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
        result = markerTemplate(color, willHover, 80, getRandomArbitrary(-1.3, 1.3), getRandomArbitrary(-1, 1))
      }
      break
    case "strikethrough":
      {
        const color = validateColor(censorshipColor) ? censorshipColor : "black"
        result = markerTemplate(color, willHover, 20, 0, 0)
      }
      break
    case "blur":
      {
        const base = `
          .wrapper .container {
            position: relative;
            padding: 0;
            margin: 0;
            filter: blur(2px);
            transition: all 0.5s 0s ease;
          }
          `
        const hover = willHover
          ? `.wrapper:hover .container {
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

function markerTemplate (
  color: string,
  willHober: boolean = true,
  lineHeightPercentage: number = 80,
  rotationDeg: number = 0,
  skewDeg: number = 0
): string {
  const base: string = `
    .container {
      position: relative;
      padding: 0;
      margin: 0;
    }
    .wrapper .paint-span {
      --line-height: ${lineHeightPercentage}%;
      --line-top: calc((100% - var(--line-height))/2);
      --line-rotation: ${rotationDeg}deg;
      --line-skew: ${skewDeg}deg;
      --color: ${color};
      position: absolute;
      display: inline-block;
      width: 100%;
      height: var(--line-height);
      top: var(--line-top);
      left: 0;
      transform: rotate(var(--line-rotation)) skew(var(--line-skew));
      
      background-color: var(--color);
      box-shadow: 0px 0px 2px 1px var(--color);
      border-radius: 1px;

      transform: scaleY(1);
      transform-origin: bottom;
      transition: transform 300ms;
    }

  `
  const hover: string = willHober
    ? `
    .wrapper:hover .paint-span {
      transform: scaleY(0);
    }`
    : ""

  return base + hover
}

function getRandomArbitrary (min: number, max: number) {
  return Math.random() * (max - min) + min
}

export function toWordArray (text: string): string[] {
  text = sanitize(text)
  const array = text.split(" ").map(word => word + " ")
  array[array.length - 1] = array[array.length - 1].slice(0, -1)
  return array
}

export function sanitize (text: string): string {
  return filterXSS(text)
}
