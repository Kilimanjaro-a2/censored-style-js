import validateColor from "validate-color"
import { censorshipType, rotationSet, defaultRotationSet } from "./types"

export function generateCss (
  censorshipType: censorshipType,
  censorshipColor: string = "black",
  willHover: boolean = true
): string {
  let result = ""
  switch (censorshipType) {
    case "marker":
      result = generateMarkerStyle(
        validateColor(censorshipColor) ? censorshipColor : "black",
        willHover,
        80,
        -7,
        getRandomSkewSet(-1.7, 1.7)
      )
      break
    case "strikethrough":
      result = generateMarkerStyle(validateColor(censorshipColor) ? censorshipColor : "black", willHover, 2, 0, defaultRotationSet)
      break
    case "blur":
      result = generateBlurStyle(willHover)
      break
    case "square":
      result = generateSquareStyle(validateColor(censorshipColor) ? censorshipColor : "black", willHover)
      break
    case "caligraphy":
      result = generateCaligraphyStyle(willHover)
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
  skew: number,
  rotation: rotationSet = defaultRotationSet
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
      --line-skew: ${skew}deg;
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
    .container:nth-child(1) .paint-span {
      --line-rotation: ${rotation.child1}deg;
    }
    .container:nth-child(3) .paint-span {
      --line-rotation: ${rotation.child3}deg;
    }
    .container:nth-child(7n) .paint-span {
      --line-rotation: ${rotation.child5n}deg;
    }
    .container:nth-child(5n) .paint-span {
      --line-rotation: ${rotation.child7n}deg;
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

function generateCaligraphyStyle (willHover: boolean = true): string {
  const commonProperties = `
      --line-top: calc((100% - var(--line-height))/2);
      position: absolute;
      width: 100%;
      height: var(--line-height);
      top: calc(var(--line-top) - var(--line-top-offset));
      left: 0;
      
      background-color: var(--color);
      box-shadow: 0px 0px 2px 1px var(--color);
      border-radius: 3px;
      padding: 0 0.7em;
      border-radius: var(--border-radius);

      transform: scaleY(1) rotate(0deg) skew(-20deg);
      transform-origin: bottom;
      transition: transform 300ms; 
  `

  const base: string = `
  .container {
    position: relative;
  }
  .paint-span {
    --color: black;
    --line-top-offset: 0px;
    --line-height: 80%;
    --line-skew-deg: -8deg;
    --border-radius: 116px 284px 309px 145px / 102px 118px 58px 77px;
    ${commonProperties}
  }
  
  .paint-span-sub1 {
    --color: black;
    --line-top-offset: 4px;
    --line-height: 60%;
    --line-skew-deg: -8deg;
    --border-radius: 112px 132px 68px 180px / 60px 85px 77px 90px;
    ${commonProperties}
  }
  
  .container:first-child .paint-span-sub1 {
    --color: black;
    --line-top-offset: 1px;
    --line-height: 95%;
    --line-skew-deg: -8deg;
    --border-radius: 116px 378px 299px 145px / 102px 148px 45px 77px;
    ${commonProperties}
  }
  
  .container:first-child .paint-span-sub2 {
    --color: rgba(0, 0, 0, 0.43);
    --line-top-offset: -3px;
    --line-height: 80%;
    --line-skew-deg: -8deg;
    --border-radius: 112px 132px 68px 180px / 60px 85px 77px 90px;
    ${commonProperties}
  }
  
  .container:nth-child(2) .paint-span-sub1 {
    --color: rgba(0, 0, 0, 0.3);
    --line-top-offset: -2px;
    --line-height: 80%;
    --line-skew-deg: -8deg;
    --border-radius: 112px 132px 68px 180px / 60px 85px 77px 90px;
    ${commonProperties}
  }
  
  .container:nth-child(3n) .paint-span-sub1 {
    --color: rgba(0, 0, 0, 0.73);
    --line-top-offset: 4px;
    --line-height: 80%;
    --line-skew-deg: -8deg;
    --border-radius: 112px 132px 68px 180px / 60px 85px 77px 90px;
    ${commonProperties}
  }
  
  .container:nth-child(5n) .paint-span-sub1 {
    --color: rgba(0, 0, 0, 1);
    --line-top-offset: -10px;
    --line-height: 3%;
    --line-skew-deg: -8deg;
    --border-radius: 112px 132px 68px 180px / 60px 85px 77px 90px;
    ${commonProperties}
  }
  
  .container:nth-child(4n) .paint-span-sub1 {
    --color: rgba(0, 0, 0, 0.73);
    --line-top-offset: 0px;
    --line-height: 100%;
    --line-skew-deg: -8deg;
    --border-radius: 50px 161px 334px 50px / 25px 66px 145px 25px;
    ${commonProperties}
  }
  
  .container:nth-child(4n) .paint-span-sub2 {
    --color: rgba(0, 0, 0, 0.43);
    --line-top-offset: 1px;
    --line-height: 100%;
    --line-skew-deg: -8deg;
    --border-radius: 50px 374px 299px 50px / 25px 142px 45px 25px;
    ${commonProperties}
  }
  `
  const hover: string = willHover
    ? `
    .wrapper:hover .paint-span,
    .wrapper:hover .paint-span-sub1,
    .wrapper:hover .paint-span-sub2 {
      transform: scaleY(0) rotate(0deg) skew(0deg);
    }`
    : ""

  return base + hover
}

function getRandomSkewSet (minNumber: number, maxNumber: number): rotationSet {
  const random = (min: number, max: number) => Math.random() * (max - min) + min
  return {
    child1: random(minNumber, maxNumber),
    child3: random(minNumber, maxNumber),
    child5n: random(minNumber, maxNumber),
    child7n: random(minNumber, maxNumber)
  }
}
