class UnderCensorship extends HTMLElement {
    constructor() {
        super()        
        const shadow = this.attachShadow({ mode: "open" })

        const wrapper = document.createElement("span")
        wrapper.setAttribute("class", "container")

        const slot = document.createElement("slot")
        wrapper.appendChild(slot)

        const style = document.createElement("style")
        style.textContent = `
            .container {
                display: inline-block;
                color: black;
                padding: 0;
                margin: 0; 
            }
            c,
            censored {
                display: inline-block;
                color: black;
                background-color: black;
            }
        `
        
        shadow.appendChild(style)
        shadow.appendChild(wrapper)
        shadow.append(...this.childNodes)
    }
}
customElements.define("under-censorship", UnderCensorship)