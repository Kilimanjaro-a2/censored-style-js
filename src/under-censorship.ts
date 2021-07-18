import { generateStyle, replaceText } from "./string-util"
import { censorshipType } from "./types"

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
       * Shadow DOM Manipulation
       */
      shadow.appendChild(wrapper)

      /*
       * Styling
       */
      const colorAttribute: string = this.getAttribute("censorship-color") ?? this.#defaultColor
      const styleString = generateStyle(censorshipType, colorAttribute)

      const assignedElements = slot.assignedElements()
      assignedElements.forEach(element => {
        if (element.tagName.toUpperCase() === censorshipElement.toUpperCase()) {
          element.setAttribute("style", styleString)
        }

        const nestedElements = element.getElementsByTagName(censorshipElement)
        for (const nestedElement of nestedElements) {
          nestedElement.setAttribute("style", styleString)
        }
      })

      /*
       *  Functions of Replace
       */
      const replaceTextAttribute: string = this.getAttribute("replace-text") ?? ""
      if (replaceTextAttribute !== "") {
        const replaceRepeatAttribute: string = this.getAttribute("replace-repeat") ?? ""
        const replaceRepeat: boolean = replaceRepeatAttribute === "true" || replaceRepeatAttribute === "True"

        // TODO: DRY same forEachs
        // htmlCollections.forEach(col => {
        //   for (const item of col) {
        //     item.innerHTML = replaceText(item.innerHTML, replaceTextAttribute, replaceRepeat)
        //   }
        // })
      }
    }
}
customElements.define("under-censorship", UnderCensorship)
