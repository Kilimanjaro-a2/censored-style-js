import { replaceText } from "./string-util"
import { censorshipType } from "./types"

document.addEventListener("DOMContentLoaded", () => {
  customElements.define("censored-style", CensoredStyle)
  customElements.define("censored-span", CensoredSpan)
})

class CensoredStyle extends HTMLElement {
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
        if (replaceTextAttribute !== "") {
          element.innerHTML = replaceText(element.innerHTML, replaceTextAttribute, replaceRepeat)
        }

        const span = document.createElement("censored-span")
        span.setAttribute("censorship-type", censorshipType)
        span.setAttribute("censorship-color", colorAttribute)
        span.setAttribute("replace-text", replaceTextAttribute)
        span.setAttribute("replace-repeat", replaceRepeatAttribute)
        span.setAttribute("active-hover", "true")
        span.setAttribute("censorship-text", element.innerHTML)
        element.replaceWith(span)
        element.innerHTML = ""
      })
    }
}

class CensoredSpan extends HTMLElement {
  #defaultType: censorshipType = "paint"
  #defaultColor: string = "black"

  constructor () {
    /*
     * Initialize
     */
    super()
    const shadow: ShadowRoot = this.attachShadow({ mode: "open" })
    const wrapper: HTMLElement = document.createElement("span")
    const paintSpan: HTMLElement = document.createElement("span")

    wrapper.setAttribute("class", "container")
    wrapper.setAttribute("ontouchstart", "")
    wrapper.innerText = this.getAttribute("censorship-text") ?? ""
    paintSpan.setAttribute("class", "paint-span")
    wrapper.appendChild(paintSpan)

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
     * Styling
     */
    const colorAttribute: string = this.getAttribute("censorship-color") ?? this.#defaultColor
    const invokesHoverEvent = true // TODO: implement as attribute
    if (invokesHoverEvent) {
      wrapper.addEventListener("mouseover", _ => paintSpan.setAttribute("style", "display: none;"), false) // TODO: implement
      wrapper.addEventListener("mouseout", _ => paintSpan.setAttribute("style", "display: inline-block;"), false)
    }

    const style: HTMLElement = document.createElement("style")
    style.textContent = `
      .container {
        position: relative;
      }
      .paint-span {
        --line-height: 80%;
        --line-top: calc((100% - var(--line-height))/2);
        --line-skew-deg: -8deg;
        position: absolute;
        display: inline-block;
        width: 100%;
        height: var(--line-height);
        top: var(--line-top);
        left: 0;
        // transform: skew(-20deg);
        
        background-color: rgba(0,0,0,1);
        box-shadow: 0px 0px 2px 1px;
        border-radius: 3px;
        padding: 0 0.7em;
      }
    `

    /*
     * Shadow DOM Manipulation
     */
    shadow.append(style)
    shadow.appendChild(wrapper)
  }
}
