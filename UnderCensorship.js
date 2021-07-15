class UnderCensorship extends HTMLElement {
    defaultCensorShipTag = "censored"

    constructor() {
        super()        
        const shadow = this.attachShadow({ mode: "open" })

        const wrapper = document.createElement("span")
        wrapper.setAttribute("class", "container")

        const slot = document.createElement("slot")
        wrapper.appendChild(slot)

        const censorshipTagAttribute = this.getAttribute('tag')
        const censorshipTag = censorshipTagAttribute != null && censorshipTagAttribute != ""
                ?  censorshipTagAttribute 
                : this.defaultCensorShipTag

        console.log(censorshipTag)

        const colorAttribute = this.getAttribute('color')
        const isColorCode = new RegExp("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$").test(colorAttribute)

        let censorshipColor = isColorCode ? colorAttribute : "black";

        const style = document.createElement("style")
        style.textContent = `
            .container {
                padding: 0;
                margin: 0; 
            }
            ${censorshipTag} {
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