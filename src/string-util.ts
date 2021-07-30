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

export function isTrueAsBoolean (text: string): boolean {
  const regex = /true/i
  return regex.test(text)
}

export function toWordArray (text: string): string[] {
  const array = text.split(" ").map(word => word + " ")
  array[array.length - 1] = array[array.length - 1].slice(0, -1)
  return array
}

export function sanitize (text: string): string {
  const element = document.createElement("div")
  element.innerText = text
  return element.innerHTML
}
