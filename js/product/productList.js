class ProductList extends HTMLElement {
    constructor() {
        super();
        // create shadowDOM
        this.attachShadow({ mode: 'open' });
        // this is style template
        
        this.articleStyle = `
@media only screen and (max-width: 600px) {
    section{
        display: grid;
        width: 100%;
        grid-template-columns: repeat(2, 1fr);
    }
    article{
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
    }
    .product-img{
        width: 6.25rem;
        height: 6.25rem;
    }
    .product-info{
        display: flex;
        flex-direction: column-reverse;
    }
}
@media only screen and (min-width: 1280px) {

        section{
            display: grid;
            width: 100%;
            grid-template-columns: repeat(3, 1fr);
            justify-items: center;
            justify-content: center;
            align-items: center;
        }
        article{
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
        }
        
        .product-img{
            width: 40%
        }
        
        .product-cart{
            position: absolute;
            bottom: 20%;
            right: 25%;
            width: 10%;
            height: 20%;
        }
        
        .product-info{
            display: grid;   
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: 1fr;
            align-items: center;
            justify-items: center;
            border-top: 1px solid gray;
            margin-top: 1.25rem;
            width: 50%;
        }
        
        .product-info>p{
            font-size: 1rem;
            color: gray;
        }
        .product-info>h3{
            font-weight: 100;
            font-size: 1.5rem;
        }}`
        // creating section element and named it as section and adding it to shadowDOM
        this.section = document.createElement('section')
        this.shadowRoot.appendChild(this.section)
    }

    // this is render function which parameter is product

    #Render(product){
        const article = document.createElement('article');
        article.innerHTML = `
        <img src="${product.img}" alt="${product.name}" onclick="handleProd(${product._id})" class="product-img" >
            <img src="images/product/shopping_cart.svg" class="product-cart" onclick="handleAdd(${product._id})">
            <div class="product-info">
            <p>${product.weight} гр</p>
            <h3 onclick="handleProd(${product._id})">${product.name}</h3>
            </div>
        `
        // add this article to section
        // const handleProd = (id) => {
        //     console.log('hello')
        // }
        this.shadowRoot.querySelector('section').appendChild(article);
    }

    // this function will fire this code when this component will be added to DOM

    connectedCallback() {
        // creating style element and applying style template to it after that adding it to shadowDOM
        const style = document.createElement('style');
        style.innerHTML = this.articleStyle;
        this.shadowRoot.appendChild(style);
        
        // fetch data from api
        fetch("http://localhost:4000/api/")
            .then(res => res.json())
            .then(data => {
                const products = data;
                // loop through products and render them
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