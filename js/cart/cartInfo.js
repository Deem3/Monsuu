// importing cartList component from same directory
import {CartList} from './cartList.js'

{/* this is cartInfo component that will show total price and total quantity of products in cart and
also it uses method of cartList component to get total price */}
class CartInfo extends HTMLElement {
  constructor() {
    super();
    // shadowDOM
    this.attachShadow({ mode: "open" });

    // creating section and adding it to shadowDOM
    this.section = document.createElement("section");
    this.shadowRoot.appendChild(this.section);

    // this is style section
    this.attrStyle = ``;
  }

    // this is render function

  #Render(quantity) {
    this.shadowRoot.innerHTML = `
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
