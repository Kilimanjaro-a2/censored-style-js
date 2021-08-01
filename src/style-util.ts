import validateColor from "validate-color"
import { censorshipType, skewSet, defaultSkewSet } from "./types"

export function generateCss (
  censorshipType: censorshipType,
  censorshipColor: string = "black",
  willHover: boolean = true
): string {
  let result = ""
  console.log(censorshipType)
  switch (censorshipType) {
    case "marker":
      result = generateMarkerStyle(
        validateColor(censorshipColor) ? censorshipColor : "black",
        willHover,
        80,
        getRandomSkewSet(-15, 15)
      )
      break
    case "strikethrough":
      result = generateMarkerStyle(validateColor(censorshipColor) ? censorshipColor : "black", willHover, 2, defaultSkewSet)
      break
    case "blur":
      result = generateBlurStyle(willHover)
      break
    case "square":
      result = generateSquareStyle(validateColor(censorshipColor) ? censorshipColor : "black", willHover)
      break
    case "visible":
      /* FALLTHROUGH */
    default:
      break
  }
  return result
}

function generateMarkerStyle (
  color: string,
  willHover: boolean = true,
  lineHeightPercentage: number = 80,
  skew: skewSet = defaultSkewSet
): string {
  const base: string = `
    .container {
      position: relative;
      padding: 0;
      margin: 0;
    }
    .container .paint-span {
      --line-height: ${lineHeightPercentage}%;
      --line-top: calc((100% - var(--line-height))/2);
      --line-rotation: 0deg;
      --line-skew: 0deg;
      --color: ${color};
      --padding-x: 0.1em;
      --padding-y: 0.1em;
      position: absolute;
      display: inline-block;
      width: 100%;
      height: var(--line-height);
      top: calc(var(--line-top) - var(--padding-y));
      left: calc(-1 * var(--padding-x));
      padding: var(--padding-y) var(--padding-x);
      
      background-color: var(--color);
      box-shadow: 0px 0px 2px 1px var(--color);
      border-radius: 3px;

      transform: scaleY(1) rotate(var(--line-rotation)) skew(var(--line-skew));
      transform-origin: bottom;
      transition: transform 300ms;      
    }
    .container:nth-child(3) .paint-span {
      --line-rotation: ${skew.skew3}deg;
      --line-skew: 10deg;
    }
    .container:nth-child(7n) .paint-span {
      --line-rotation: ${skew.skew5n}deg;
      --line-skew: 10deg;
    }
    .container:nth-child(5n) .paint-span {
      --line-rotation: ${skew.skew7n}deg;
      --line-skew: -10deg;
    }

  `
  const hover: string = willHover
    ? `
    .wrapper:hover .paint-span {
      transform: scaleY(0) rotate(0deg) skew(0deg);
    }`
    : ""

  return base + hover
}

function generateBlurStyle (willHover: boolean = true) {
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
  return base + hover
}

function generateSquareStyle (color: string, willHover: boolean = true) {
  const base: string = `
    .container {
      position: relative;
      padding: 0;
      margin: 0;
    }
    .wrapper .paint-span {
      --color: ${color};
      position: absolute;
      display: inline-block;
      width: 100%;
      height: 100%;
      top: 0px;
      left: 0px;
      padding: 0 1px;

      background-color: var(--color);

      transform: scaleY(1) rotate(0deg) skew(0deg);
      transform-origin: bottom;
      transition: transform 300ms; 
    }
  `
  const hover: string = willHover
    ? `
    .wrapper:hover .paint-span {
      transform: scaleY(0) rotate(0deg) skew(0deg);
    }`
    : ""

  return base + hover
}

function getRandomSkewSet (min: number, max: number): skewSet {
  return {
    skew3: Math.random() * (max - min) + min,
    skew5n: Math.random() * (max - min) + min,
    skew7n: Math.random() * (max - min) + min
  }
}
