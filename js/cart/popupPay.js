import { PaymentPopup } from "./paymentPopup.js";

export class PopupPay extends HTMLElement {
  constructor(price) {
    super();
    // adding shadowDom
    this.attachShadow({ mode: "open" });
    this.sum = {}
    this._price = price;
    // style template
    this.attrStyle = `
            @import url('/styles/root.css');
            section{
              width: 100%;
              position: fixed;
              height: 100%;
              top: 0;
              left: 0;
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              background-color: rgba(0,0,0,0.5);
              font-family: var(--inter-font);
            }
            form{
                position: relative;
                background-color: white;
                width: 50%;
                height: 70%;
                border-radius: 9px;
                display: grid;
                grid-template-rows: repeat(6, 1fr);
                justify-items: center;
                opacity: 100%;
                overflow: hidden;
            }
            form>div{
                position: relative;
            }
            form>div>input,form>div>select{
                width: 24rem;
                height: 3.5rem;
                padding: 0;
                border: 1px solid black;
                border-radius: 12px;
            }
            form>div>input{
              padding: 10px;
              box-sizing: border-box;
              outline: none;
              font-size: 1em;
              font-family: var(--inter-font);
            }
            .apartment{
              position: absolute;
              left: 0.675rem;
              top: 20px;
              pointer-events: none;
              color: #7E7E7E;
            }
            form>div>input:valid~.apartment, form>div>input:focus~.apartment{
              font-size: 0.8em;
              color: #7E7E7E;
              transform: translateY(-1.7rem);
              background-color: white;
              transition: all 0.3s linear;
              duration: 0.3s;
            }

            .phone{
              position: absolute;
              left: 0.675rem;
              top: 20px;
              pointer-events: none;
              color: #7E7E7E;
            }
            form>div>input:valid~.phone, form>div>input:focus~.phone{
              font-size: 0.8em;
              color: #7E7E7E;
              transform: translateY(-1.7rem);
              background-color: white;
              transition: all 0.3s linear;
              duration: 0.3s;
          }


            .exit_btn{
              width: fit-content;
              position: absolute;
              top: 1rem;
              right: 2rem;
              border: none;
              background-color: transparent;
              font-size: 2rem;
              cursor: pointer;
            }
            .next_btn{
              font-size: 1.2rem;
              width: 20rem;
              height: 3.5rem;
              padding: 0;
              border: 1px solid black;
              border-radius: 12px;
              background-color: var(--primary-color);
              color: white;
              cursor: pointer;
            }

            .district, .khoroo{
              background-color: white;
              cursor: pointer;
              color: #7E7E7E
            }
        `;
  }

    //   render function
  #Render() {
    this.shadowRoot.innerHTML =`
            <style>
                ${this.attrStyle}
            </style>
            <section>
                <form>
                    <div>

                    </div>
                    <div>
                        <select name="district" id="district" class="district">
                        <option value="Багануур">Багануур дүүрэг</option>
                        <option value="Багахангай">Багахангай дүүрэг</option>
                        <option value="Баянгол">Баянгол дүүрэг</option>
                        <option value="Баянзүрх">Баянзүрх дүүрэг</option>
                        <option value="Налайх">Налайх дүүрэг</option>
                        <option value="Сонгинохайрхан">Сонгинохайрхан дүүрэг</option>
                        <option value="Сүхбаатар">Сүхбаатар дүүрэг</option>
                        <option value="Хан-уул">Хан-уул дүүрэг</option>
                        <option value="Чингэлтэй">Чингэлтэй дүүрэг</option>
                        </select>
                    </div>
                    <div>
                        <select name="khoroo" id="khoroo" class="khoroo">
                        <option value="1">1-р хороо</option>
                        <option value="2">2-р хороо</option>
                        <option value="3">3-р хороо</option>
                        <option value="4">4-р хороо</option>
                        <option value="5">5-р хороо</option>
                        <option value="6">6-р хороо</option>
                        <option value="7">7-р хороо</option>
                        <option value="8">8-р хороо</option>
                        <option value="9">9-р хороо</option>
                        <option value="10">10-р хороо</option>
                        </select>
                    </div>
                    <div>
                        <input type="text" required></input>
                        <span class="apartment">Байр, тоот</span>
                    </div>
                    <div>
                        <input type="number" required></input>
                        <span class="phone">Утасны дугаар</span>
                    </div>
                    <button id="next_btn" class="next_btn" type="button">Захиалах</button>
                    <button id="exit_btn" class="exit_btn" type="button">X</button>
                </form>
            </section>
        `;
  }

    // if this function called in another function, it'll fire this code
  showPopup(){
    this.#Render()
    document.body.appendChild(this)
  }

    // this is a callback function that when component added to dom it'll fire in it's code
  connectedCallback() {
    
    const exitBtn = this.shadowRoot.querySelector("#exit_btn");
    if(exitBtn){
        exitBtn.addEventListener("pointerdown", () => {
            this.remove()
        })
    }
    const nextBtn = this.shadowRoot.querySelector('#next_btn');
    if(nextBtn){
        nextBtn.addEventListener('pointerdown', async ()=>{
          // get values from inputs
              const district = this.shadowRoot.querySelector('#district').value;
              const khoroo = this.shadowRoot.querySelector('#khoroo').value;
              const apartment = this.shadowRoot.querySelector('input[type="text"]').value;
              const phone = this.shadowRoot.querySelector('input[type="number"]').value;
              const price = this._price


              // check if the inputs aren't empty
            if(apartment !== '' || phone !== ''){
            const payment = new PaymentPopup()
            payment.showPaymentPopup();
            this.remove();
            try {
              const response = await fetch('http://localhost:4000/api/');
              const products = await response.json();
              products.forEach(product => {
                if (localStorage.getItem(product._id) != null) {
                  const p = product._id;
                  const q = parseInt(localStorage.getItem(product._id));
                  this.sum[p] = q;
                }
              });
              // Send the order to the server
              
              const data = {district, khoroo, apartment, phone, ["products"]: this.sum, price}

              const token = document.cookie.split('=')[1]
              const result = await fetch('http://localhost:4000/order/', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': token
                }
              })
              if(result.ok){
                alert('Order created successfully')
              }else{
                alert('Order creation failed')
              }
              ;
            } catch (error) {
              console.log(error);
            }
    }})
    }
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

window.customElements.define("popup-pay", PopupPay);
