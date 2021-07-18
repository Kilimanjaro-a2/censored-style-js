import { replaceText } from "../src/string-util"

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
