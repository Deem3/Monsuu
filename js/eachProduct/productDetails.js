// this is not using shadow dom

class ProductDetails extends HTMLElement {
    constructor() {
        super();
        // initializing id and counter
        this.counter = 0;
        this.urlSearch = new URLSearchParams(window.location.search);
        this.id = !this.urlSearch.get('id') ? localStorage.getItem('id') : this.urlSearch.get('id');
        this.urlSearch.set('id', this.id)
        window.history.replaceState({}, '', `${location.pathname}?${this.urlSearch}`)
    }
    // Render function
    #Render(products){
        this.innerHTML = `
        <section class="main">
          <section class="product">
            <img src="${products.img}" alt="${products.name}" class="product-img">
            <h2>${products.name}</h2>
            <h4>${products.price}₮</h4>
            <div class="counter_btn">
              <button class="minus_btn" id="minus_btn" >-</button>
              <p class="num" id="num">0</p>
              <button class="plus_btn" id="plus_btn"">+</button>
            </div>
            <button class="order_btn" id="order">Захиалах</button>
          </section>
          <section class="product-info">
            <article>
              <img src="images/condition/products.webp"></img>
              <p>САВЛАГАА</p>
              <h2>${products.package} </h2>
            </article>
            <article>
              <img src="images/condition/bottle.webp"></img>
              <p>ХЭМЖЭЭ</p>
              <h2>${products.weight}</h3>
            </article>
            <article>
              <img src="images/condition/calories.webp"></img>
              <p>ИЛЧЛЭГ</p>
              <h2>${products.calorie} Ккал</h2>
            </article>
            <article>
              <img src="images/condition/keep.webp"></img>
              <p>ХАДГАЛАХ ХУГАЦАА</p>
              <h2>${products.keep_date} хоног</h2>
            </article>
            <article>
              <img src="images/condition/celsius.webp"></img>
              <p>ХАДГАЛАХ НӨХЦӨЛ</p>
              <h2>${products.keep_condition}</h2>
            </article>
          </section>
          <section class="product-description">
            <h2>БҮТЭЭГДЭХҮҮНИЙ ОНЦЛОГ:</h2>
            <p>${products.product_advantage}</p>
          </section>
          <section class="product-upside">
            <h2>ДАВУУ ТАЛУУД:</h2>
            <p>${products.pros}</p>
          </section>
        </section>
        `
        document.getElementById('plus_btn').addEventListener('pointerdown', this.plus_btn);
        document.getElementById('minus_btn').addEventListener('pointerdown', this.minus_btn);
        document.getElementById('order').addEventListener('pointerdown', this.order);
    }

    // these are button functions which are used in increment and decrement, deleting product and adding product to cart
    plus_btn = () => {
      this.counter++;
      document.getElementById('num').innerHTML = this.counter;
    }
    minus_btn = () => {
      if (this.counter >= 1) {
        this.counter--;
        document.getElementById('num').innerHTML = this.counter;
      }
    }
    order = () => {
      if(this.counter > 0)
      localStorage.setItem(localStorage.getItem('id'), this.counter);
    }

    // this function will fire code in itself when the component is connected to the DOM

    connectedCallback() {
        fetch(`http://localhost:4000/api/${this.id}`)
            .then(res => res.json())
            .then(data => {
                const products = data[0];
                this.#Render(products);
            })
            console.log(location.pathname)
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

window.customElements.define('product-details', ProductDetails);