import { replaceText, generateCss, isTrueAsBoolean } from "./string-util"
import { censorshipType } from "./types"

const defaultTagName = "being-cencored"
document.addEventListener("DOMContentLoaded", () => {
  customElements.define("censored-style", CensoredStyle)
  customElements.define(defaultTagName, BeingCensored)
})

class CensoredStyle extends HTMLElement {
    #defaultElement: string = "censored"

    constructor () {
      /*
       * Initialize
       */
      super()
      const shadow: ShadowRoot = this.attachShadow({ mode: "open" })
      const wrapper: HTMLElement = document.createElement("span")
      const slot: HTMLSlotElement = document.createElement("slot")
      wrapper.setAttribute("class", "container")
      wrapper.appendChild(slot)

      /*
       * Tag option
       */
      const censorshipElement: string = this.getAttribute("censorship-tag") ?? this.#defaultElement

      /*
       *  Replace option
       */
      const replaceTextAttribute: string = this.getAttribute("replace-text") ?? ""
      const replaceRepeatAttribute: string = this.getAttribute("replace-repeat") ?? ""
      const replaceRepeat: boolean = isTrueAsBoolean(replaceRepeatAttribute)

      /*
       * Shadow DOM Manipulation
       */
      shadow.appendChild(wrapper)

      const foundElements: Element[] = []
      slot.assignedElements().forEach(element => {
        if (element.tagName.toUpperCase() === censorshipElement.toUpperCase()) {
          foundElements.push(element)
        }

        const nestedElements = element.getElementsByTagName(censorshipElement)
        for (const nestedElement of nestedElements) {
          foundElements.push(nestedElement)
        }
      })
      foundElements.forEach(element => {
        let innerText = element.innerHTML
        if (replaceTextAttribute !== "") {
          innerText = replaceText(element.innerHTML, replaceTextAttribute, replaceRepeat)
        }

        const span = document.createElement(defaultTagName)
        span.setAttribute("censorship-type", this.getAttribute("censorship-type") ?? "")
        span.setAttribute("censorship-color", this.getAttribute("censorship-color") ?? "")
        span.setAttribute("dissapear-on-hover", this.getAttribute("dissapear-on-hover") ?? "")
        span.setAttribute("active-hover", "true")
        span.setAttribute("censorship-text", innerText)

        element.replaceWith(span)
        element.innerHTML = ""
      })
    }
}

class BeingCensored extends HTMLElement {
  #defaultType: censorshipType = "marker"
  #defaultColor: string = "black"
  #defaultHoverDissapearing: string = "true"

  constructor () {
    /*
     * Initialize
     */
    super()
    const shadow: ShadowRoot = this.attachShadow({ mode: "open" })
    const wrapper: HTMLElement = document.createElement("span")
    const paintSpan: HTMLElement = document.createElement("span")

    wrapper.setAttribute("class", "container")
    wrapper.innerText = this.getAttribute("censorship-text") ?? ""
    paintSpan.setAttribute("class", "paint-span")
    wrapper.appendChild(paintSpan)

    /*
     * Type option
     */
    let attrType: string = this.getAttribute("censorship-type") ?? this.#defaultType
    if (attrType === "") {
      attrType = this.#defaultType
    }
    const censorshipType: censorshipType = attrType as censorshipType ?? this.#defaultType

    /*
     * Type option
     */
    let attrHover: string = this.getAttribute("dissapear-on-hover") ?? this.#defaultHoverDissapearing
    if (attrHover === "") {
      attrHover = this.#defaultHoverDissapearing
    }
    const dissapearOnHover: boolean = isTrueAsBoolean(attrHover)

    /*
     * Styling
     */
    const colorAttribute: string = this.getAttribute("censorship-color") ?? this.#defaultColor
    const style: HTMLElement = document.createElement("style")
    style.textContent = generateCss(censorshipType, colorAttribute, dissapearOnHover)

    /*
     * Shadow DOM Manipulation
     */
    shadow.append(style)
    shadow.appendChild(wrapper)
  }
}
