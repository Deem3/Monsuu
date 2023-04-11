'use strict'

const id = localStorage.getItem('id')

    fetch('/json/products.json')
        .then((response) => response.json())
        .then(data=>{
            const products = data.products[id-1];
            const template = document.createElement('section')
            template.className = 'main'
            template.innerHTML = `
            <section class="product">
                <img src="${products.img}" alt="${products.name}" class="product-img">
                <h2>${products.name} гр</h2>
                <h4>${products.price}</h4>
                <div>
                    <button><</button>
                    <p>1</p>
                    <button>></button>
                </div>
                <button>Захиалах</button>
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
                `
            document.getElementById('container').appendChild(template)
        }
        )
        .catch(error=>console.log(error))