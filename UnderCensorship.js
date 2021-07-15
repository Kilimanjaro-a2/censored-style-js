class UnderCensorship extends HTMLElement {
    defaultCensorshipElement = "censored"
    defaultCensorshipColor = "black"

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
                ?  censorshipTagAttribute 
                : this.defaultCensorshipElement

        // color
        const colorAttribute = this.getAttribute('color')
        const isColorCode = new RegExp("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$").test(colorAttribute)
        let censorshipColor = isColorCode ? colorAttribute : this.defaultCensorshipColor;
        const style = document.createElement("style")
        style.textContent = `
            .container {
                padding: 0;
                margin: 0; 
            }
            ${censorshipElement} {
                display: inline-block;
                color: ${censorshipColor};
                background-color: ${censorshipColor};
            }
        `
        
        shadow.appendChild(style)
        shadow.appendChild(wrapper)
        shadow.append(...this.childNodes)
    }
}
customElements.define("under-censorship", UnderCensorship)