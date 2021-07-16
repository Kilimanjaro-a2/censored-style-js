type censorshipType = 'paint' | 'blur' | 'visible'

class UnderCensorship extends HTMLElement {
    #defaultElement: string = 'censored'
    #defaultType: censorshipType = 'paint'
    #defaultColor: string = 'black'

    constructor () {
      /*
         * Initialize
         */
      super()
      const shadow: ShadowRoot = this.attachShadow({ mode: 'open' })
      const wrapper: HTMLElement = document.createElement('span')
      const slot: HTMLSlotElement = document.createElement('slot')
      wrapper.setAttribute('class', 'container')
      wrapper.appendChild(slot)

      /*
         * Tag option
         */
      const censorshipElement: string = this.getAttribute('tag') ?? this.#defaultElement

      /*
         * Type option
         */
      const attrType: string = this.getAttribute('type') ?? 'paint'
      const typeSet: Set<string> = new Set(['paint', 'blur', 'visible']) // TODO: Use TypeScript's type
      const censorshipType: censorshipType = typeSet.has(attrType) ? attrType as censorshipType : this.#defaultType

      /*
         * Style
         */
      const colorAttribute: string = this.getAttribute('color') ?? '#000000'
      const isColorCode: boolean = new RegExp('^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$').test(colorAttribute)
      const censorshipColor: string = isColorCode ? colorAttribute : this.#defaultColor
      const style: HTMLStyleElement = document.createElement('style')
      style.textContent = this.#generateStyle(censorshipType, censorshipElement, censorshipColor)

      /*
         * Shadow DOM Manipulation
         */
      shadow.appendChild(style)
      shadow.appendChild(wrapper)

      /*
         * Replace
         */
      const replaceTextAttribute: string = this.getAttribute('replace-text') ?? ''
      if (replaceTextAttribute !== '') {
        const replaceRepeatAttribute: string = this.getAttribute('replace-repeat') ?? ''
        const replaceRepeat: boolean = replaceRepeatAttribute == 'true' || replaceRepeatAttribute == 'True'

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
         * Move child nodes to the Shadow DOM
         */
      shadow.append(...this.childNodes)
    }

    #generateStyle (
      censorshipType: string,
      censorshipElement: string,
      censorshipColor: string = this.#defaultColor
    ): string {
      switch (censorshipType) {
        case 'paint':
          return `${censorshipElement} { color: ${censorshipColor}; background-color: ${censorshipColor}; }`
        case 'blur':
          return `${censorshipElement} { filter: blur(2px); }`
        case 'visible':
          /* FALLTHROUGH */
        default:
          return ''
      }
    }

    #replaceText (
      searchText: string,
      newText: string,
      willRepeat: boolean
    ): string {
      if (searchText == null || searchText === '' || newText == null || newText === '') {
        return ''
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
customElements.define('under-censorship', UnderCensorship)
