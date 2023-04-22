// this is cartList component that will show all products in cart and it exports itself to cartInfo component

export class CartList extends HTMLElement {
  constructor() {
    super();
    
    // creating shadowDOM

    this.attachShadow({ mode: "open" });

    // creating div element and named it as section and adding it to shadowDOM
    this.section = document.createElement("div");
    this.shadowRoot.appendChild(this.section);

    // this is style template
    this.attrStyle = `
            @import url('/styles/root.css');
            .cart-item {
                display:grid;
                grid-template-columns: 1fr 1fr 2fr;
                border: 1px solid #dfdfdf;
                border-radius: 9px;
                width: 36rem;
                height: 9.5rem;
                align-items: center;
                justify-items: center;
                margin-bottom: 15px;
                margin-top: 15px;
            }
            .cart-img{
                width: 150px;
                height: 150px;
                padding-left: 1rem;
            }
            .cart-item-info{
                font-family: var(--inter-font);
            }
            .cart-item-info>h2{
                font-size: 24px;
                font-weight: 100;
            }
            .cart-item-info>p{
                font-size: 20px;
            }
            .cart-btn{
                display: grid;
                grid-template-rows: 1fr 1fr;
                justify-items: center;
                align-items: center;
                width: 100%;
                height: 100%;
            }
            .delete-btn{
                background-color: white;
                border: 3px solid black;
                border-radius: 3px;
                width: 1.875rem;
                height: 1.875rem;
                font-weight: bold;
            }
            .counter-btn{
                display:inline-flex;
                grid-template-columns: 1fr 1fr 1fr;
                width: 126px;
                height: 40px;
                border: 3px solid black;
                border-radius: 6px;
                overflow: hidden;
            }
            .counter-btn>*{
                width: 42px;
                height: 100%;
                padding: 0;
                border: none;
                text-align: center;
                background-color:white;
                font-size: 20px;
                font-weight: bold;
            }
            .counter-btn>button{
                cursor: pointer;
            }
            .disp-num{
                border-left: 2px solid black;
                border-right: 2px solid black;
            }
            .disp-num:focus{
                outline: none;
            }
        `;
        // initializing quantity to 0 in local storage
    localStorage.setItem("quantity", 0);
  }
  #Render(product) {
    const article = document.createElement("article");
    article.className = "cart-item";
    article.innerHTML = `
                            <img src="${product.img}" class="cart-img" alt="product image">
                            <div class="cart-item-info">
                                <h2>${product.name}</h2>
                                <p>${product.price}</p>
                            </div>
                            <div class="cart-btn">
                                <button class="delete-btn">X</button>
                                    <div class="counter-btn">
                                    <button class="minus-btn" id="minus">-</button>
                                    <input type="number" id="num" class="disp-num" readonly value="${localStorage.getItem(product._id)}"></input>
                                    <button class="plus-btn" id="plus">+</button>
                                </div>
                            </div>
                        `;
    this.shadowRoot.querySelector("div").appendChild(article);
    const plusBtn = article.querySelector(".plus-btn");
    const minusBtn = article.querySelector(".minus-btn");
    const input = article.querySelector(".disp-num");
    const deleteBtn = article.querySelector(".delete-btn");

    plusBtn.addEventListener("click", () => {
      const currentValue = parseInt(input.value);
      input.value = currentValue + 1;
      localStorage.setItem(product._id, input.value);
      // set quantity in local storage
      let quantity = parseInt(localStorage.getItem('quantity'))  + 1;
            localStorage.setItem('quantity', quantity);
      const event = new CustomEvent("cart-changed", {
        detail: {
          quantity: 'plust btn clicked',
        }
      });
      this.dispatchEvent(event);
    });

    minusBtn.addEventListener("click", () => {
      const currentValue = parseInt(input.value);
      if (currentValue > 1) {
        input.value = currentValue - 1;
        localStorage.setItem(product._id, input.value);
        let quantity = parseInt(localStorage.getItem('quantity'))  - 1;
        localStorage.setItem('quantity', quantity);
        const event = new CustomEvent("cart-changed", {
          detail: {
            quantity: parseInt(localStorage.getItem('quantity')),
          }
        });
        this.dispatchEvent(event);
      }
    });
    deleteBtn.addEventListener("click", () => {
      let quantity = parseInt(localStorage.getItem('quantity'))  - parseInt(localStorage.getItem(product._id));
      article.remove();
        localStorage.removeItem(product._id);
        localStorage.setItem('quantity', quantity);
        const event = new CustomEvent("cart-changed", {
          detail: {
            quantity: parseInt(localStorage.getItem('quantity')),
          }
        });
        this.dispatchEvent(event);
    });
  }

  // this is add price function which is used to calculate the total price of the products in the cart
  addPrice = () => {
    
    // created a promise to fetch data from jsonbin and then calculate the total price

    return new Promise((resolve, reject) => {
      let total = 0;
      fetch("https://api.jsonbin.io/v3/b/643eae58c0e7653a05a6e439")
        .then((res) => res.json())
        .then((data) => {
          const products = data.record.products;
          products.forEach((product) => {
            // calculating the total price by multiplying the price of the product with the quantity of the product
            if (localStorage.getItem(product._id) != null) {
              total += parseInt(product.price) * parseInt(localStorage.getItem(product._id));
            }
          });
          // return the total price
          resolve(total);
        })
        // if there is an error then reject the promise
        .catch((error) => {
          reject(error);
        });
    });
  }


  // this function will be used when component is connected to the dom

  connectedCallback() {

    // applying css to shadow dom
    const style = document.createElement("style");
    style.innerHTML = this.attrStyle;
    this.shadowRoot.appendChild(style);

    // fetching data from jsonbin and rendering it
    fetch("https://api.jsonbin.io/v3/b/643eae58c0e7653a05a6e439")
      .then((res) => res.json())
      .then((data) => {
        // getting the products from the jsonbin
        const products = data.record.products;
        // looping through the products
        products.forEach((product) => {

          // checking if the product is in the local storage or not
          if (localStorage.getItem(product._id) != null) {
            // if the product is in the local storage then render it
            this.#Render(product);
            // find the total price of the products in the cart and store it in the local storage
            let quantity = parseInt(localStorage.getItem('quantity'))  + parseInt(localStorage.getItem(product._id));
            localStorage.setItem('quantity', quantity);
          }
        });
      });
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

window.customElements.define("cart-list", CartList);
