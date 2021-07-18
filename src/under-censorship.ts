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
       * Styling
       */
      const colorAttribute: string = this.getAttribute("censorship-color") ?? this.#defaultColor
      const style: HTMLStyleElement = document.createElement("style")
      style.textContent = generateStyle(censorshipType, censorshipElement, colorAttribute)

      /*
       * Shadow DOM Manipulation
       */
      shadow.appendChild(style)
      shadow.appendChild(wrapper)

      /*
       *  Functions of Replace
       */
      const replaceTextAttribute: string = this.getAttribute("replace-text") ?? ""
      if (replaceTextAttribute !== "") {
        const replaceRepeatAttribute: string = this.getAttribute("replace-repeat") ?? ""
        const replaceRepeat: boolean = replaceRepeatAttribute === "true" || replaceRepeatAttribute === "True"

        // It won't work unless you add child elements to the Shadow DOM first.
        const htmlCollections: HTMLCollectionOf<Element>[] = slot.assignedElements()
          .map(elm => elm.getElementsByTagName(censorshipElement))
          .filter(col => col.length > 0)

        htmlCollections.forEach(col => {
          for (const item of col) {
            item.innerHTML = replaceText(item.innerHTML, replaceTextAttribute, replaceRepeat)
          }
        })
      }

      /*
       * Adding child nodes to the Shadow DOM for encapsulation
       */
      shadow.append(...this.childNodes)
    }
}
customElements.define("under-censorship", UnderCensorship)
