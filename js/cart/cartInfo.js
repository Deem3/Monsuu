class CartInfo extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.section = document.createElement("section");
        this.shadowRoot.appendChild(this.section);
        this.attrStyle = ``;
        this.price = 0;
    }
    #Render(quantity, price = 0) {
        // const article = document.createElement('article');
        // article.className = "cart-info"
        this.shadowRoot.innerHTML = `
            <div>
                 <p>Барааны нийт үнэ</p>
                 <p>${price}</p>
            </div>
            <div>
                <p>Барааны тоо</p>
                <p>${quantity}</p>
            </div>
            <div>
                <p>Хүргэлтийн төлбөр</p>
                <p>${quantity == 0 ? 0 : 5000}₮</p>
            </div>
            <div>
                <p>Нийт төлбөр</p>
                <p></p>
            </div>
            <button id="payment_btn">Төлбөр төлөх</button>
        `
        // this.shadowRoot.querySelector('section').appendChild(article);
    }

    connectedCallback() {
        fetch('https://api.jsonbin.io/v3/b/643eae58c0e7653a05a6e439')
            .then(res => res.json())
            .then(data => {
                const products = data.record.products;
                products.forEach(product => {
                    if (localStorage.getItem(product._id) != null) {
                        this.#Render(localStorage.getItem('quantity'));
                        
                    }
                })
            })

            document.querySelector('cart-list').addEventListener('cart-changed', (e) => {
                console.log(e.detail.quantity)
                this.#Render(e.detail.quantity);
            })


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