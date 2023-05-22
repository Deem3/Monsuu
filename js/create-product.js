class CreateProduct extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    #Render(){
        this.shadowRoot.innerHTML = `
            <form>
                <div>
                    <label>Product id</label>
                    <input></input>
                </div>
                <div>
                    <label>Product name</label>
                    <input></input>
                </div>
                <div>
                    <label>Product weight</label>
                    <input></input>
                </div>
                <div>
                    <label>Product img</label>
                    <input></input>
                </div>
                <div>
                    <label>Product price</label>
                    <input></input>
                </div>
                <div>
                    <label>Product package</label>
                    <input></input>
                </div>
                <div>
                    <label>Product calorie</label>
                    <input></input>
                </div>
                <div>
                    <label>Product keep date</label>
                    <input></input>
                </div>
                <div>
                    <label>Product keep condition</label>
                    <input></input>
                </div>
                <div>
                    <label>Product advantage</label>
                    <input></input>
                </div>
                <div>
                    <label>Product pros</label>
                    <input></input>
                </div>
                <button id="submitButton">Submit</button>
            </form>
        `
        const btn = this.shadowRoot.getElementById('submitButton');
        btn.addEventListener('click', async (e)=>{
            e.preventDefault()
            const _id = this.shadowRoot.querySelectorAll('input')[0].value;
            const name = this.shadowRoot.querySelectorAll('input')[1].value;
            const weight = this.shadowRoot.querySelectorAll('input')[2].value;
            const img = this.shadowRoot.querySelectorAll('input')[3].value;
            const price = this.shadowRoot.querySelectorAll('input')[4].value;
            const pkg = this.shadowRoot.querySelectorAll('input')[5].value;
            const calorie = this.shadowRoot.querySelectorAll('input')[6].value;
            const keep_date = this.shadowRoot.querySelectorAll('input')[7].value;
            const keep_condition = this.shadowRoot.querySelectorAll('input')[8].value;
            const product_advantage = this.shadowRoot.querySelectorAll('input')[9].value;
            const pros = this.shadowRoot.querySelectorAll('input')[10].value;

            const data = {_id, name, weight, img, price, pkg, calorie, keep_date, keep_condition, product_advantage, pros};

            const token = document.cookie.split('=')[1]

            const result = await fetch('http://localhost:4000/api/', {
                method: "POST",
                body: JSON.stringify(data),
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            })
            if(result.ok)
                alert('Product created successfully')
            else
                alert('Product creation failed')
        })
    }

    connectedCallback() {
        this.#Render()
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

window.customElements.define('create-product', CreateProduct);