class ProductDetails extends HTMLElement {
    constructor() {
        super();
        this.id = localStorage.getItem('id')
        this.counter = 0;
        this.plus_btn = this.plus_btn.bind(this);
        this.minus_btn = this.minus_btn.bind(this);
        this.order = this.order.bind(this);
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
              <img src="/images/condition/products.png"></img>
              <h3>САВЛАГАА</h3>
              <p>${products.package} </p>
            </article>
            <article>
              <img src="/images/condition/bottle.png"></img>
              <h3>ХЭМЖЭЭ</h3>
              <p>${products.weight}</p>
            </article>
            <article>
              <img src="/images/condition/calories.png"></img>
              <h3>ИЛЧЛЭГ</h3>
              <p>${products.calore} Ккал</p>
            </article>
            <article>
              <img src="/images/condition/keep.png"></img>
              <h3>ХАДГАЛАХ ХУГАЦАА</h3>
              <p>${products.keep_day} хоног</p>
            </article>
            <article>
              <img src="/images/condition/celsius.png"></img>
              <h3>ХАДГАЛАХ НӨХЦӨЛ</h3>
              <p>${products.keep_cond}</p>
            </article>
          </section>
          <section class="product-description">
            <h2>БҮТЭЭГДЭХҮҮНИЙ ОНЦЛОГ:</h2>
            <p>${products.prod_adventage}</p>
          </section>
          <section class="product-upside">
            <h2>ДАВУУ ТАЛУУД:</h2>
            <p>${products.pros}</p>
          </section>
        </section>
        `
        document.getElementById('plus_btn').addEventListener('click', this.plus_btn);
        document.getElementById('minus_btn').addEventListener('click', this.minus_btn);
        document.getElementById('order').addEventListener('click', this.order);
    }

    // button functions
    plus_btn = () => {
      this.counter++;
      document.getElementById('num').innerHTML = this.counter;
      console.log(this.counter)
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


    connectedCallback() {
        fetch('https://api.jsonbin.io/v3/b/643eae58c0e7653a05a6e439')
            .then(res => res.json())
            .then(data => {
                const products = data.record.products[this.id-1];
                this.#Render(products);
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

window.customElements.define('product-details', ProductDetails);