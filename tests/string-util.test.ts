import { generateStyle, replaceText } from "../src/string-util"

/*
 * generateStyle
 */

test("Type: paint", () => {
  expect(generateStyle("paint", "p", "black", false)).toBe("p { color: black; background-color: black; }")
})

test("Type: blur", () => {
  expect(generateStyle("blur", "p", "black", false)).toBe("p { filter: blur(2px); }")
})

test("Type: visible", () => {
  expect(generateStyle("visible", "p", "black", false)).toBe("")
})

test("Element: paint with class name", () => {
  expect(generateStyle("paint", ".someClassName", "black", false)).toBe(".someClassName { color: black; background-color: black; }")
})

test("Element: paint with id name", () => {
  expect(generateStyle("paint", "#someIdName", "black", false)).toBe("#someIdName { color: black; background-color: black; }")
})

test("Element: paint with invalid html element name", () => {
  expect(generateStyle("paint", "foo-bar", "black", false)).toBe("foo-bar { color: black; background-color: black; }")
})

test("Element: paint with colored (color string)", () => {
  expect(generateStyle("paint", "p", "blue", false)).toBe("p { color: blue; background-color: blue; }")
})

test("Element: paint with colored (color code)", () => {
  expect(generateStyle("paint", "p", "#FFFFFF", false)).toBe("p { color: #FFFFFF; background-color: #FFFFFF; }")
})

test("Element: paint with colored (rgb)", () => {
  expect(generateStyle("paint", "p", "rgb(255,0,0)", false)).toBe("p { color: rgb(255,0,0); background-color: rgb(255,0,0); }")
})

test("Element: paint with invalid colored", () => {
  expect(generateStyle("paint", "p", "invalid-color", false)).toBe("p { color: black; background-color: black; }")
})

test("Element: blur with colored (color string)", () => {
  expect(generateStyle("blur", "p", "blue", false)).toBe("p { filter: blur(2px); }")
})

test("Element: visible with colored (color string)", () => {
  expect(generateStyle("visible", "p", "blue", false)).toBe("")
})

test("Hover: paint with hover", () => {
  expect(generateStyle("paint", "p", "black", true)).toBe("p { color: black; background-color: black; } p:hover, p:active { color: initial; background-color: initial; transition: all 0.5s 0s ease; }")
})

test("Hover: paint with hover", () => {
  expect(generateStyle("paint", "p", "black", true)).toBe("p { color: black; background-color: black; } p:hover, p:active { color: initial; background-color: initial; transition: all 0.5s 0s ease; }")
})

test("Hover: blur with hover", () => {
  expect(generateStyle("blur", "p", "black", true)).toBe("p { filter: blur(2px); } p:hover, p:active { filter: none; transition: all 0.5s 0s ease; }")
})

test("Hover: visible with hover", () => {
  expect(generateStyle("visible", "p", "black", true)).toBe("")
})

test("Hover: paint with hover", () => {
  expect(generateStyle("paint", "p", "black", true, "transition: all 0.3s 0.6s ease-out")).toBe("p { color: black; background-color: black; } p:hover, p:active { color: initial; background-color: initial; transition: all 0.3s 0.6s ease-out; }")
})

/*
 * replaceText
 */
test("Replace text with another character", () => {
  expect(replaceText("ten chars.", "*", false)).toBe("*")
})

test("Replace text with another character (match the length)", () => {
  expect(replaceText("ten chars.", "*", true)).toBe("**********")
})

test("Replace text with another shorter text", () => {
  expect(replaceText("two apples", "orange", false)).toBe("orange")
})

test("Replace text with another shorter text (match the length)", () => {
  expect(replaceText("two apples", "orange", true)).toBe("orangeoran")
})

test("Replace text with another longer text", () => {
  expect(replaceText("apple", "orange", false)).toBe("orange")
})

test("Replace text with another longer text (match the length)", () => {
  expect(replaceText("apple", "orange", true)).toBe("orang")
})
