class CartList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.section = document.createElement("div");
    this.shadowRoot.appendChild(this.section);
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

    });

    minusBtn.addEventListener("click", () => {
      const currentValue = parseInt(input.value);
      if (currentValue > 1) {
        input.value = currentValue - 1;
        localStorage.setItem(product._id, input.value);
      }
    });
    deleteBtn.addEventListener("click", () => {
        article.remove();
        localStorage.removeItem(product._id);
    });
  }
  // counter functions

  connectedCallback() {
    const style = document.createElement("style");
    style.innerHTML = this.attrStyle;
    this.shadowRoot.appendChild(style);
    fetch("https://api.jsonbin.io/v3/b/643eae58c0e7653a05a6e439")
      .then((res) => res.json())
      .then((data) => {
        const products = data.record.products;
        products.forEach((product) => {
          if (localStorage.getItem(product._id) != null) {
            this.#Render(product);
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
