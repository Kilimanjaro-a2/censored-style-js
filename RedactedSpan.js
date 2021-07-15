class RedactedSpan extends HTMLElement {
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
            ::slotted(redacted) {
                display: inline-block;
                color: red;
                background-color: red;
            }
        `
        shadow.appendChild(style)
        shadow.appendChild(wrapper)

        // const redactedElements = slot.assignedElements()
        //     .map(elm => elm.getElementsByTagName("redacted"))
        //     .filter(col => col.length > 0)
        
        // // redactedElements[0].setAttribute("class", "redacted")
        // console.log(redactedElements)
    }
}
customElements.define("redacted-span", RedactedSpan)