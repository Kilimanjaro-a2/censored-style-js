class UnderCensorship extends HTMLElement {
    #defaultElement = "censored"
    #defaultType = "paint"
    #defaultColor = "black"

    constructor() {
        /*
         * Initialize
         */
        super()
        const shadow = this.attachShadow({ mode: "open" })
        const wrapper = document.createElement("span")
        const slot = document.createElement("slot")
        wrapper.setAttribute("class", "container")
        wrapper.appendChild(slot)

        /*
         * Tag option
         */
        const elementAttribute = this.getAttribute('tag')
        const censorshipElement = elementAttribute != null && elementAttribute != ""
                ? elementAttribute 
                : this.#defaultElement

        /*
         * Type option
         */
        const typeAttribute = this.getAttribute('type')
        const typeSet = new Set(["paint", "blur", "visible"])
        const censorshipType = typeSet.has(typeAttribute) ? typeAttribute : this.#defaultType

        /*
         * Style
         */
        const colorAttribute = this.getAttribute('color')
        const isColorCode = new RegExp("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$").test(colorAttribute)
        const censorshipColor = isColorCode ? colorAttribute : this.#defaultColor;
        const style = document.createElement("style")
        style.textContent = `
            .container {
                padding: 0;
                margin: 0; 
            }
            ${this.#generateStyle(censorshipType, censorshipElement, censorshipColor)}
        `
    
        /*
         * Shadow DOM Manipulation
         */
        shadow.appendChild(style)
        shadow.appendChild(wrapper)

        /*
         * Replace
         */
        const replaceTextAttribute = this.getAttribute('replace-text')
        if (replaceTextAttribute != null && replaceTextAttribute != "") {
            const replaceRepeatAttribute = this.getAttribute('replace-repeat')
            const replaceRepeat = replaceRepeatAttribute == "true" || replaceRepeatAttribute == "True" 

            // It won't work unless you add child elements to the Shadow DOM first.
            const htmlCollections = slot.assignedElements()
                .map(elm => elm.getElementsByTagName(censorshipElement))
                .filter(col => col.length > 0)

            htmlCollections.forEach(col => {
                for (let item of col) {
                    item.innerHTML = this.#replaceText(item.innerHTML, replaceTextAttribute, replaceRepeat)
                }
            })
        }

        /*
         * Move child nodes to the Shadow DOM
         */
        shadow.append(...this.childNodes)
    }

    #generateStyle(censorshipType: string, censorshipElement: string, censorshipColor = this.#defaultColor) {
        switch(censorshipType){
            case "paint":
                return `${censorshipElement} {
                    color: ${censorshipColor};
                    background-color: ${censorshipColor};
                }`
            case "blur":
                return `${censorshipElement} {
                    filter: blur(2px);
                }`
            case "visible":
                /* FALLTHROUGH */
            default:
                return ""
        }
    }

    #replaceText(searchText: string, newText: string, willRepeat: boolean) {
        if (searchText == null || searchText == "" || newText == null || newText == "") {
            return ""
        }

        let result = newText
        if (willRepeat) {
            while(searchText.length > result.length) {
                result += newText
            }
            result = result.substr(0, searchText.length)
        }
        return result
    }
}
customElements.define("under-censorship", UnderCensorship)