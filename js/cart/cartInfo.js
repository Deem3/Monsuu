class CartInfo extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }
    #Render(){
        const article = document.createElement('article');
        article.innerHTML = `
        <div class="cart-info">
        `
        this.shadowRoot.querySelector('cart-info').appendChild(article);
    }
    connectedCallback() {
        this.#Render()
    }

    disconnectedCallback() {
        //implementation
    }

    attributeChangedCallback(name, oldVal, newVal) {
        //implementation
    }

    adoptedCallback() {
        //implementation
    }

}

window.customElements.define('cart-info', CartInfo);