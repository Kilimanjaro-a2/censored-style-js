import { generateStyle, replaceText } from "../src/string-util"

/*
 * generateStyle
 */
test("Generates styles with various Type arguments", () => {
  expect(generateStyle("paint", "p", "black", false)).toBe("p { color: black; background-color: black; }")
  expect(generateStyle("blur", "p", "black", false)).toBe("p { filter: blur(2px); }")
  expect(generateStyle("visible", "p", "black", false)).toBe("")
})

test("Generates styles with various Element arguments", () => {
  expect(generateStyle("paint", ".someClassName", "black", false)).toBe(".someClassName { color: black; background-color: black; }")
  expect(generateStyle("paint", "#someIdName", "black", false)).toBe("#someIdName { color: black; background-color: black; }")
  expect(generateStyle("paint", "foo-bar", "black", false)).toBe("foo-bar { color: black; background-color: black; }")
})

test("Generates styles with various Color arguments", () => {
  expect(generateStyle("paint", "p", "blue", false)).toBe("p { color: blue; background-color: blue; }")
  expect(generateStyle("paint", "p", "#FFFFFF", false)).toBe("p { color: #FFFFFF; background-color: #FFFFFF; }")
  expect(generateStyle("paint", "p", "rgb(255,0,0)", false)).toBe("p { color: rgb(255,0,0); background-color: rgb(255,0,0); }")
  expect(generateStyle("paint", "p", "invalid-color", false)).toBe("p { color: black; background-color: black; }")
  // with other Type arguments
  expect(generateStyle("blur", "p", "blue", false)).toBe("p { filter: blur(2px); }")
  expect(generateStyle("visible", "p", "blue", false)).toBe("")
})

test("Generates styles with various Hover arguments", () => {
  expect(generateStyle("paint", "p", "black", true)).toBe("p { color: black; background-color: black; } p:hover, p:active { color: initial; background-color: initial; transition: all 0.5s 0s ease; }")
  expect(generateStyle("paint", "p", "black", true)).toBe("p { color: black; background-color: black; } p:hover, p:active { color: initial; background-color: initial; transition: all 0.5s 0s ease; }")

  // with other Type arguments
  expect(generateStyle("blur", "p", "black", true)).toBe("p { filter: blur(2px); } p:hover, p:active { filter: none; transition: all 0.5s 0s ease; }")
  expect(generateStyle("visible", "p", "black", true)).toBe("")

  // with Transition argument
  expect(generateStyle("paint", "p", "black", true, "transition: all 0.3s 0.6s ease-out")).toBe("p { color: black; background-color: black; } p:hover, p:active { color: initial; background-color: initial; transition: all 0.3s 0.6s ease-out; }")
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
