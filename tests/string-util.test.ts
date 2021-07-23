import { replaceText, isTrueAsBoolean } from "../src/string-util"

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

/*
 * isBoolean
 */
test("Is true: true", () => {
  expect(isTrueAsBoolean("True")).toBe(true)
  expect(isTrueAsBoolean("true")).toBe(true)
  expect(isTrueAsBoolean("TRUE")).toBe(true)
  expect(isTrueAsBoolean("trUe")).toBe(true)
})

test("Is true: false", () => {
  expect(isTrueAsBoolean("False")).toBe(false)
  expect(isTrueAsBoolean("false")).toBe(false)
  expect(isTrueAsBoolean("FALSE")).toBe(false)
  expect(isTrueAsBoolean("faLse")).toBe(false)

  expect(isTrueAsBoolean("This is absolutely not a boolean value")).toBe(false)
  expect(isTrueAsBoolean("32432423423")).toBe(false)
})
