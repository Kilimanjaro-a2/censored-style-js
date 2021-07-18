import { generateBaseStyle, generateHoverStyle, replaceText } from "../src/string-util"

/*
 * generateStyle
 */
test("Generates styles with various Type arguments", () => {
  expect(generateBaseStyle("paint", "black")).toBe("color: black; background-color: black;")
  expect(generateBaseStyle("blur", "black")).toBe("filter: blur(2px);")
  expect(generateBaseStyle("visible", "black")).toBe("")
})

test("Generates styles with various Color arguments", () => {
  expect(generateBaseStyle("paint", "blue")).toBe("color: blue; background-color: blue;")
  expect(generateBaseStyle("paint", "#FFFFFF")).toBe("color: #FFFFFF; background-color: #FFFFFF;")
  expect(generateBaseStyle("paint", "rgb(255,0,0)")).toBe("color: rgb(255,0,0); background-color: rgb(255,0,0);")
  expect(generateBaseStyle("paint", "invalid-color")).toBe("color: black; background-color: black;")
  // with other Type arguments
  expect(generateBaseStyle("blur", "blue")).toBe("filter: blur(2px);")
  expect(generateBaseStyle("visible", "blue")).toBe("")
})

test("Generates styles with various Hover arguments", () => {
  expect(generateHoverStyle("paint")).toBe("color: unset; background-color: unset; transition: all 0.5s 0s ease;")
  expect(generateHoverStyle("blur")).toBe("filter: none; transition: all 0.5s 0s ease;")
  expect(generateHoverStyle("visible")).toBe("")

  // with Transition argument
  expect(generateHoverStyle("paint", "transition: all 0.3s 0.6s ease-out")).toBe("color: unset; background-color: unset; transition: all 0.3s 0.6s ease-out;")
})

/*
 * replaceText
 */
test("Replace text with another character", () => {
  expect(replaceText("ten chars.", "*", false)).toBe("*")
  expect(replaceText("ten chars.", "*", true)).toBe("**********")
})

test("Replace text with another shorter text", () => {
  expect(replaceText("two apples", "orange", false)).toBe("orange")
  expect(replaceText("two apples", "orange", true)).toBe("orangeoran")
})

test("Replace text with another longer text", () => {
  expect(replaceText("apple", "orange", false)).toBe("orange")
  expect(replaceText("apple", "orange", true)).toBe("orang")
})
