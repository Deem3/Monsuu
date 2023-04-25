import { PaymentPopup } from "./paymentPopup.js";

export class PopupPay extends HTMLElement {
  constructor() {
    super();
    // adding shadowDom
    this.attachShadow({ mode: "open" });
    // style template
    this.attrStyle = `
            @import url('/styles/root.css');
            section{
                background-color: rgba(0,0,0,0.5);
                position: fixed;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                font-family: var(--inter-font);
            }
            form{
                position: relative;
                background-color: white;
                opacity: 100%;
                width: 50%;
                height: 70%;
                border-radius: 9px;
                overflow: hidden;
                display: grid;
                grid-template-rows: repeat(6, 1fr);
                justify-items: center;
            }
            form>div{
                position: relative;
            }
            form>div>input,form>div>select , form>.next_btn{
                width: 22rem;
                height: 3.5rem;
                padding: 0;
                border: 1px solid black;
                border-radius: 12px;
            }
            form>div>input{
                box-sizing: border-box;
                outline: none;
                padding: 10px;
                font-size: 1em;
                font-family: var(--inter-font);

            }
            form>div>span{
                position: absolute;
                left: 0.675rem;
                top: 18px;
                pointer-events: none;
                font-size: 1em;
                transition: all 0.2s ease-in-out;
            }
            form>div>input:valid~span, form>div>input:focus~span{
                transform: translateY(-1.5rem);
                color: green;
                font-size: 0.8em;
            }

            .exit_btn{
                position: absolute;
                top: 2rem;
                right: 2rem;
                border: none;
                background-color: transparent;
                font-size: 2rem;
                cursor: pointer;
            }
            .next_btn{
              cursor: pointer;
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
                        <select name="district" id="district">
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
                        <select name="khoroo" id="khoroo">
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
                        <input></input>
                        <span>Байр, тоот</span>
                    </div>
                    <div>
                        <input placeholder="Газраар оруулна уу"></input>
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
        nextBtn.addEventListener('pointerdown', ()=>{
            const payment = new PaymentPopup()
            payment.showPaymentPopup();
            this.remove();
        })
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
