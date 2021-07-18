import validateColor from "validate-color"
type censorshipType = "paint" | "blur" | "visible"

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
      const attrType: string = this.getAttribute("censorship-type") ?? "paint"
      const typeSet: Set<string> = new Set(["paint", "blur", "visible"]) // TODO: Use TypeScript's type
      const censorshipType: censorshipType = typeSet.has(attrType) ? attrType as censorshipType : this.#defaultType

      /*
       * Styling
       */
      const colorAttribute: string = this.getAttribute("censorship-color") ?? "#000000"
      const censorshipColor: string = validateColor(colorAttribute) ? colorAttribute : this.#defaultColor
      const style: HTMLStyleElement = document.createElement("style")
      style.textContent = this.#generateStyle(censorshipType, censorshipElement, censorshipColor)

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
            item.innerHTML = this.#replaceText(item.innerHTML, replaceTextAttribute, replaceRepeat)
          }
        })
      }

      /*
       * Adding child nodes to the Shadow DOM for encapsulation
       */
      shadow.append(...this.childNodes)
    }

    #generateStyle (
      censorshipType: string,
      censorshipElement: string,
      censorshipColor: string = this.#defaultColor,
      willReleaseCensorshipOnMouseover: boolean = true,
      transitionSetting: string = "transition: all 0.5s 0s ease;"
    ): string {
      let baseStyle = ""
      let hoverStyle = ""
      switch (censorshipType) {
        case "paint":
          baseStyle = `${censorshipElement} { color: ${censorshipColor}; background-color: ${censorshipColor}; }`
          hoverStyle = `${censorshipElement}:hover, ${censorshipElement}:active
{ color: initial; background-color: initial; ${transitionSetting}; }`
          break
        case "blur":
          baseStyle = `${censorshipElement} { filter: blur(2px); }`
          hoverStyle = `${censorshipElement}:hover, ${censorshipElement}:active { filter: none; ${transitionSetting}; }`
          break
        case "visible":
          /* FALLTHROUGH */
        default:
          break
      }
      if (willReleaseCensorshipOnMouseover) {
        return baseStyle + hoverStyle
      }
      return baseStyle
    }

    #replaceText (
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
}
customElements.define("under-censorship", UnderCensorship)
