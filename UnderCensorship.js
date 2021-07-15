class UnderCensorship extends HTMLElement {
    constructor() {
        super()        
        const shadow = this.attachShadow({ mode: "open" })

        const wrapper = document.createElement("span")
        wrapper.setAttribute("class", "container")

        const slot = document.createElement("slot")
        wrapper.appendChild(slot)


        // const type = this.getAttribute('type')
        // switch(type) {
        //     case "red":
        //         wrapper.setAttribute("class", "red")
        //         break;
        //     case "normal":
        //     default:
        //         wrapper.setAttribute("class", "normal")
        //         break;
        // }

        const color = this.getAttribute('color')
        const regEx = new RegExp("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$")
        const isColorCode = regEx.test(color)

        let censorshipColor = isColorCode ? color : "black";

        const style = document.createElement("style")
        style.textContent = `
            .container {
                padding: 0;
                margin: 0; 
            }
            c,
            censored {
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