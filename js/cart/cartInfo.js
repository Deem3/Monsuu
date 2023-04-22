// importing cartList component from same directory
import {CartList} from './cartList.js'

{/* this is cartInfo component that will show total price and total quantity of products in cart and
also it uses method of cartList component to get total price */}
class CartInfo extends HTMLElement {
  constructor() {
    super();
    // shadowDOM
    this.attachShadow({ mode: "open" });

    // this is style section
    this.attrStyle = `
    @import url('/styles/root.css');
      section{
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 0.5fr 0.5fr 0.5fr 0.5fr 1fr;
        align-items: center;
      }
      section>div{
        display: flex;
        padding: 0;
        margin: 0;
        justify-content: space-between;
        font-family: var(--inter-font);
        font-size: 1.25rem;
        font-weight: 500;
      }
      section>div:nth-child(1){
        border-top: 1px solid #C5C5C5;
      }
      section>div:nth-child(4){
        border-bottom: 1px solid #C5C5C5;
      }
      section>button{
        width: 50%;
        justify-self: center;
        height: 4.125rem;
        border-radius: 0.5625rem;
        background-color: #424242;
        color: white;
        font-size: 18px;
        font-weight: 500;
        font-family: var(--inter-font);
        margin-top: 1.5rem;
        margin-bottom: 1.5rem;
        cursor: pointer;
      }
    `;
  }

    // this is render function

  #Render(quantity) {
    this.shadowRoot.innerHTML = `
      <style>
        ${this.attrStyle}
      </style>

      <section>
            <div>
                 <p>Барааны нийт үнэ</p>
                 <p></p>
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
          </section>
        `;
  }


    // when component is connected to DOM this function will be fired

  connectedCallback() {
    
    // running through all products and checking if there is any product in local storage

    fetch("https://api.jsonbin.io/v3/b/643eae58c0e7653a05a6e439")
      .then((res) => res.json())
      .then((data) => {
        const products = data.record.products;
        products.forEach((product) => {
          if (localStorage.getItem(product._id) != null) {
            this.price =
              this.price +
              parseInt(localStorage.getItem(product._id)) * product.price;
            this.#Render(localStorage.getItem("quantity"));
          }
        });
      });

    //   importing cartList component and using its functions this is initialising total price and price
    const listComp = new CartList();
    listComp.addPrice()
    .then((total)=>{
        this.shadowRoot.querySelector('div:nth-child(1) p:nth-child(2)').innerHTML = total + '₮';
        this.shadowRoot.querySelector('div:nth-child(4) p:nth-child(2)').innerHTML = total + 5000 + '₮';
    })
    .catch(err=>console.log(err))


    // this is event listener for cart-changed event which is fired when user adds or removes product from cart
    document
      .querySelector("cart-list")
      .addEventListener("cart-changed", (e) => {
        // if there is an event then it will render the component again
        this.#Render(localStorage.getItem("quantity"));
        
        // same as above but when user adds or removes product from cart it will update total price
        listComp.addPrice()
        .then((total)=>{
            this.shadowRoot.querySelector('div:nth-child(1) p:nth-child(2)').innerHTML = total + '₮';
        })
        .catch(err=>console.log(err))
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

window.customElements.define("cart-info", CartInfo);
