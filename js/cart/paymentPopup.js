import {PopupPay} from './popupPay.js'

export class PaymentPopup extends HTMLElement {
    constructor() {
        super();

        // creating shadowDom
        this.attachShadow({mode: 'open'})

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
        section>div{
            position: relative;
                background-color: white;
                opacity: 100%;
                width: 50%;
                height: 70%;
                border-radius: 9px;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
        }
        
        .container{
            height: 80%;
            width: 50%;
            display: grid;
            grid-template-rows: repeat(3, 1fr);
            grid-template-columns: repeat(2, 1fr);
            align-items: center;
            justify-items: center;
            justify-content: center;
            padding: 0;
            margin: 0;  
            border-radius: 9px;
            border: 1px solid #272F89;
        }

        .container>a{
            display: flex;
            flex-direction: column;
            align-items: center;
            text-decoration: none;
            color: black;
            font-family: var(--inter-font);
            font-weight: 600;
            cursor: pointer;
        }

        .container>a>img{
            width: 5rem;
            height: 5rem;
            border-radius: 9px;
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
        .back_btn{
            position: absolute;
                top: 2rem;
                left: 2rem;
                border: none;
                background-color: transparent;
                font-size: 2rem;
                cursor: pointer;
        }
        `;
    }

    // this is render function
    #Render(){
        this.shadowRoot.innerHTML = `
            <style>${this.attrStyle}</style>
            <section>
                <div>
                    <div class="container">
                    <a href="#">
                        <img src="images/payment/khanbank.png" alt="khanbank">
                        <label>Хаан банк</label>
                    </a>
                    <a href="#">
                        <img src="images/payment/golomt.png" alt="golomt">
                        <label>Голомт банк</label>
                    </a>
                    <a href="#">
                        <img src="images/payment/mbank.png" alt="mbank">
                        <label>М банк</label>
                    </a>
                    <a href="#">
                        <img src="images/payment/capitron.png" alt="capitron">
                        <label>Капитрон банк</label>
                    </a>
                    <a href="#">
                        <img src="images/payment/qpay.png" alt="qpay">
                        <label>Qpay</label>
                    </a>
                    <a href="#">
                        <img src="images/payment/tdb.png" alt="tdb">
                        <label>ТДБ банк</label>
                    </a>
                    <div>
                    <button id="exit" class="exit_btn">X</button>
                    <button id="back" class="back_btn"><</button>
                </div>
            </section>
        `
        this.shadowRoot.querySelector('#exit').addEventListener('pointerdown', () => {
            this.remove()
        })
        this.shadowRoot.querySelector('#back').addEventListener('pointerdown', () => {
            const popup = new PopupPay()
            popup.showPopup();
            this.remove()
        })
    }

    // if this function called in another component, it'll render this component
    showPaymentPopup(){
        this.#Render()
    document.body.appendChild(this)
    }

    connectedCallback() {

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

window.customElements.define('payment-popup', PaymentPopup);