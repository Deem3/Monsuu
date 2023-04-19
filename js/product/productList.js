class ProductList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.articleStyle = `
        section{
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            justify-items: center;
            justify-content: center;
            align-items: center;
            height: 80rem;
        }
        article{
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
        }
        
        .product-img{
            width: 12rem;
            height: 12rem;;
        }
        
        .product-cart{
            position: absolute;
            bottom: 25%;
            right: 0;
            width: 3.125rem;
            height: 3.125rem;
        }
        
        .product-info{
            display: grid;   
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: 1fr;
            align-items: center;
            justify-items: center;
            border-top: 1px solid gray;
            margin-top: 1.25rem;
            width: 25rem;
        }
        
        .product-info>p{
            font-size: 1rem;
            color: gray;
        }
        .product-info>h3{
            font-weight: 100;
            font-size: 1.5rem;
        }`
        this.section = document.createElement('section')
        this.shadowRoot.appendChild(this.section)
    }
    #Render(product){
        const article = document.createElement('article');
        article.innerHTML = `
        <img src="${product.img}" alt="${product.name}" class="product-img">
            <img src="images/product/shopping_cart.svg" class="product-cart" onclick="handleAdd(${product._id})">
            <div class="product-info">
            <p>${product.weight} гр</p>
            <h3 onclick="handleProd(${product._id})">${product.name}</h3>
            </div>
        `
        this.shadowRoot.querySelector('section').appendChild(article);
    }
    connectedCallback() {
        const style = document.createElement('style');
        style.innerHTML = this.articleStyle;
        this.shadowRoot.appendChild(style);
        fetch("https://api.jsonbin.io/v3/b/643eae58c0e7653a05a6e439")
            .then(res => res.json())
            .then(data => {
                const products =data.record.products;
                products.map(product => {
                    this.#Render(product);
                })
            })
            .catch(err => console.log(err));
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

window.customElements.define('product-list', ProductList);