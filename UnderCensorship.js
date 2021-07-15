class UnderCensorship extends HTMLElement {
    _defaultElement = "censored"
    _defaultType = "Paint"
    _defaultColor = "black"

    constructor() {
        // initialize
        super()
        const shadow = this.attachShadow({ mode: "open" })
        const wrapper = document.createElement("span")
        const slot = document.createElement("slot")
        wrapper.setAttribute("class", "container")
        wrapper.appendChild(slot)

        // tag
        const elementAttribute = this.getAttribute('tag')
        const censorshipElement = elementAttribute != null && elementAttribute != ""
                ? elementAttribute 
                : this._defaultElement

        // type
        const typeAttribute = this.getAttribute('type')
        const typeSet = new Set(["Paint", "Blur"])
        const censorshipType = typeSet.has(typeAttribute) ? typeAttribute : this._defaultType

        // color
        const colorAttribute = this.getAttribute('color')
        const isColorCode = new RegExp("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$").test(colorAttribute)
        const censorshipColor = isColorCode ? colorAttribute : this._defaultColor;
        const style = document.createElement("style")
        style.textContent = `
            .container {
                padding: 0;
                margin: 0; 
            }
            ${this._generateStyle(censorshipType, censorshipElement, censorshipColor)}
        `
        
        shadow.appendChild(style)
        shadow.appendChild(wrapper)
        shadow.append(...this.childNodes)
    }

    _generateStyle(censorshipType, censorshipElement, censorshipColor = this.defaultCensorshipColor) {
        switch(censorshipType){
            case "Blur":
                return `${censorshipElement} {
                    filter: blur(2px);
                }`
            case "Paint":
                /* FALLTHROUGH */
            default:
                return `${censorshipElement} {
                    color: ${censorshipColor};
                    background-color: ${censorshipColor};
                }`
        }
    }
}
customElements.define("under-censorship", UnderCensorship)