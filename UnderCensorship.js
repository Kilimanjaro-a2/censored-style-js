class UnderCensorship extends HTMLElement {
    _defaultElement = "censored"
    _defaultType = "paint"
    _defaultColor = "black"
    _defaultReplaceText = "*"
    _defaultReplaceRepeat = true

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
        const typeSet = new Set(["paint", "blur", "replace"])
        const censorshipType = typeSet.has(typeAttribute) ? typeAttribute : this._defaultType

        // style
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
    
        // Add to Shadow DOM
        shadow.appendChild(style)
        shadow.appendChild(wrapper)

        // type: replace
        if (censorshipType === "replace") {
            const replaceTextAttribute = this.getAttribute('replace-text')
            const replaceRepeatAttribute = this.getAttribute('replace-repeat')
            const replaceText = replaceTextAttribute != null && replaceTextAttribute != ""
                ? replaceTextAttribute
                : this._defaultReplaceText
            const replaceRepeat = replaceRepeatAttribute == "true" || replaceRepeatAttribute == "True" 
                ? this._defaultReplaceRepeat
                : false

            const htmlCollections = slot.assignedElements()
                .map(elm => elm.getElementsByTagName(censorshipElement))
                .filter(col => col.length > 0)

            htmlCollections.forEach(col => {
                for (let item of col) {
                    item.innerHTML = this._replace(item.innerHTML, replaceText, replaceRepeat)
                }
            })
        }

        // Move child nodes to the Shadow DOM
        shadow.append(...this.childNodes)
    }

    _generateStyle(censorshipType, censorshipElement, censorshipColor = this.defaultCensorshipColor) {
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
            case "replace":
                /* FALLTHROUGH */
            default:
                return `${censorshipElement} {
                }`

        }
    }

    _replace(str, replacedText, willRepeat) {
        if (str == null || str == "" || replacedText == null || replacedText == "") {
            return ""
        }
        
        let result = replacedText
        if (willRepeat) {
            while(str.length > result.length) {
                result += replacedText
            }
            result = result.substr(0, str.length)
        }
        return result
    }
}
customElements.define("under-censorship", UnderCensorship)