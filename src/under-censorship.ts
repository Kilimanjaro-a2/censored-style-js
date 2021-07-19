import { generateBaseStyle, generateHoverStyle, replaceText } from "./string-util"
import { censorshipType } from "./types"

document.addEventListener("DOMContentLoaded", () => customElements.define("under-censorship", UnderCensorship))
class UnderCensorship extends HTMLElement {
    #defaultElement: string = "censored"
    #defaultType: censorshipType = "paint"
    #defaultColor: string = "black"

    constructor () {
      /*
       * Initialize
       */
      super()
      const shadow: ShadowRoot = this.attachShadow({ mode: "open" })
      const wrapper: HTMLElement = document.createElement("span")
      const slot: HTMLSlotElement = document.createElement("slot")
      wrapper.setAttribute("class", "container")
      wrapper.setAttribute("ontouchstart", "")
      wrapper.appendChild(slot)

      /*
       * Tag option
       */
      const censorshipElement: string = this.getAttribute("censorship-tag") ?? this.#defaultElement

      /*
       * Type option
       */
      const attrType: string = this.getAttribute("censorship-type") ?? this.#defaultType
      const typeSet: Set<string> = new Set(["paint", "blur", "visible"]) // TODO: Use TypeScript's type
      const censorshipType: censorshipType = typeSet.has(attrType) ? attrType as censorshipType : this.#defaultType

      /*
       *  Replace option
       */
      const replaceTextAttribute: string = this.getAttribute("replace-text") ?? ""
      const replaceRepeatAttribute: string = this.getAttribute("replace-repeat") ?? ""
      const replaceRepeat: boolean = replaceRepeatAttribute === "true" || replaceRepeatAttribute === "True"

      /*
       * Shadow DOM Manipulation
       */
      shadow.appendChild(wrapper)

      /*
       * Styling
       */
      const colorAttribute: string = this.getAttribute("censorship-color") ?? this.#defaultColor
      const invokesHoverEvent = true // TODO: implement as attribute

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

      const baseStyleString = generateBaseStyle(censorshipType, colorAttribute)
      const hoverStyleString = invokesHoverEvent ? generateHoverStyle(censorshipType) : ""
      foundElements.forEach(element => {
        element.setAttribute("style", baseStyleString)

        if (invokesHoverEvent) {
          element.addEventListener("mouseover", _ => element.setAttribute("style", hoverStyleString), false)
          element.addEventListener("mouseout", _ => element.setAttribute("style", baseStyleString), false)
        }

        if (replaceTextAttribute !== "") {
          element.innerHTML = replaceText(element.innerHTML, replaceTextAttribute, replaceRepeat)
        }
      })
    }
}
