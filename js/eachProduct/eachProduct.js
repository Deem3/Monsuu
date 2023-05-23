'use strict'


// class ProductDetails extends HTMLElement {
//     constructor() {
//       super();

//       // Get the product id from localStorage
//       const id = localStorage.getItem('id');
  
//       // Fetch the product data
//       fetch('/json/products.json')
//         .then((response) => response.json())
//         .then(data => {
//           const products = data.products[id - 1];
//           this.render(products);
//         })
//         .catch(error => console.log(error));

//     }
  
//     render(products) {
//       this.innerHTML = `
//         <section class="main">
//           <section class="product">
//             <img src="${products.img}" alt="${products.name}" class="product-img">
//             <h2>${products.name}</h2>
//             <h4>${products.price}₮</h4>
//             <div class="counter_btn">
//               <button class="minus_btn" id="minus_btn">-</button>
//               <p class="num" id="num">1</p>
//               <button class="plus_btn" id="plus_btn">+</button>
//             </div>
//             <button class="order_btn" id="order">Захиалах</button>
//           </section>
//           <section class="product-info">
//             <article>
//               <img src="/images/condition/products.png"></img>
//               <h3>САВЛАГАА</h3>
//               <p>${products.package} </p>
//             </article>
//             <article>
//               <img src="/images/condition/bottle.png"></img>
//               <h3>ХЭМЖЭЭ</h3>
//               <p>${products.weight}</p>
//             </article>
//             <article>
//               <img src="/images/condition/calories.png"></img>
//               <h3>ИЛЧЛЭГ</h3>
//               <p>${products.calore} Ккал</p>
//             </article>
//             <article>
//               <img src="/images/condition/keep.png"></img>
//               <h3>ХАДГАЛАХ ХУГАЦАА</h3>
//               <p>${products.keep_day} хоног</p>
//             </article>
//             <article>
//               <img src="/images/condition/celsius.png"></img>
//               <h3>ХАДГАЛАХ НӨХЦӨЛ</h3>
//               <p>${products.keep_cond}</p>
//             </article>
//           </section>
//           <section class="product-description">
//             <h2>БҮТЭЭГДЭХҮҮНИЙ ОНЦЛОГ:</h2>
//             <p>${products.prod_adventage}</p>
//           </section>
//           <section class="product-upside">
//             <h2>ДАВУУ ТАЛУУД:</h2>
//             <p>${products.pros}</p>
//           </section>
//         </section>
//       `;
//     }
    
//   }
  
//   // Define the custom element
//   customElements.define('product-details', ProductDetails);



class ProductDetails {
  constructor() {
    this.product = {};
    this.id = localStorage.getItem('id');

    this.render();
  }

  render() {

    fetch('/json/products.json')
      .then((response) => response.json())
      .then(data => {
        this.products = data.products.find(product => product._id == this.id);

        const container = document.getElementById('productClass');
        container.innerHTML = `
                <section class="main">
                  <section class="product">
                    <img src="${this.products.img}" alt="${this.products.name}" class="product-img">
                    <h2>${this.products.name}</h2>
                    <h4>${this.products.price}₮</h4>
                    <div class="counter_btn">
                      <button class="minus_btn" id="minus_btn">-</button>
                      <p class="num" id="num">1</p>
                      <button class="plus_btn" id="plus_btn">+</button>
                    </div>
                    <button class="order_btn" id="order">Захиалах</button>
                  </section>
                  <section class="product-info">
                    <article>
                      <img src="/images/condition/products.png"></img>
                      <h3>САВЛАГАА</h3>
                      <p>${this.products.package} </p>
                    </article>
                    <article>
                      <img src="/images/condition/bottle.png"></img>
                      <h3>ХЭМЖЭЭ</h3>
                      <p>${this.products.weight}</p>
                    </article>
                    <article>
                      <img src="/images/condition/calories.png"></img>
                      <h3>ИЛЧЛЭГ</h3>
                      <p>${this.products.calore} Ккал</p>
                    </article>
                    <article>
                      <img src="/images/condition/keep.png"></img>
                      <h3>ХАДГАЛАХ ХУГАЦАА</h3>
                      <p>${this.products.keep_day} хоног</p>
                    </article>
                    <article>
                      <img src="/images/condition/celsius.png"></img>
                      <h3>ХАДГАЛАХ НӨХЦӨЛ</h3>
                      <p>${this.products.keep_cond}</p>
                    </article>
                  </section>
                  <section class="product-description">
                    <h2>БҮТЭЭГДЭХҮҮНИЙ ОНЦЛОГ:</h2>
                    <p>${this.products.prod_adventage}</p>
                  </section>
                  <section class="product-upside">
                    <h2>ДАВУУ ТАЛУУД:</h2>
                    <p>${this.products.pros}</p>
                  </section>
                </section>
        `;
      })
      .catch(error => console.log(error));
  }
}

const productDetails = new ProductDetails();