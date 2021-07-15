class RedactedText extends HTMLElement {
    constructor() {
        super()

        const shadow = this.attachShadow({ mode: "open" })

        const wrapper = document.createElement("span")

        const slot = document.createElement("slot")
        wrapper.appendChild(slot)

        const style = document.createElement("style")

        const type = this.getAttribute('type')
        switch(type) {
            case "red":
                wrapper.setAttribute("class", "red")
                break;
            case "normal":
            default:
                wrapper.setAttribute("class", "normal")
                break;
        }

        const color = this.getAttribute('color')
        const regEx = new RegExp("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$")
        const isColorCode = regEx.test(color)

        style.textContent = `
            .normal {
                display: inline-block;
                background-color: black;
                color:black
                padding: 0;
                margin: 0; 
            }
            .red {
                display: inline-block;
                background-color: red;
                color: red;
                padding: 0;
                margin: 0; 
            }
        `
        shadow.appendChild(style)
        shadow.appendChild(wrapper)
    }
}

customElements.define("r-t", RedactedText)