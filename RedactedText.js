class RedactedText extends HTMLElement {
    constructor() {
        super()

        const shadow = this.attachShadow({ mode: "open" })

        const wrapper = document.createElement("span")
        wrapper.setAttribute("class", "redacted")

        const slot = document.createElement("slot")
        wrapper.appendChild(slot)

        const style = document.createElement("style")

        style.textContent = `
            .redacted {
                display: inline-block;
                background-color: black;
                padding: 0;
                margin: 0; 
            }
        `
        shadow.appendChild(style)
        shadow.appendChild(wrapper)
    }
}

customElements.define("r-t", RedactedText)