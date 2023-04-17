"use strict";
const cartId = document.getElementById("first");

fetch("/json/products.json")
  .then((res) => res.json())
  .then((data) => {
    data.products.map((product) => {
      if (null != localStorage.getItem(product._id)) {
        const eachProduct = document.createElement("article");
        eachProduct.className = "each_product";
        eachProduct.innerHTML = `
                    <img class="prod_img" src="${product.img}" alt="${
          product.name
        }">
                    <h2>${product.name}</h2>
                    <button class="delete_btn" onclick="handleDelete(${
                      product._id
                    })">x</button>
                    <div class="counter_btn">
                        <button id="minus_btn" onclick="handleMinus(${
                          product._id
                        })" class="counter_btn_minus">-</button>
                        <p>${localStorage.getItem(product._id)}</p>
                        <button id="plus_btn" onclick="handlePlus(${
                          product._id
                        })" class="counter_btn_plus">+</button>
                    </div>  
                `;
        cartId.appendChild(eachProduct);
      }
    });
  });

// cart info rendering

const cartInfo = document.getElementById("second");
var quantityPrice = 0;
var totalPrice = 0;
var quantity = 0;

fetch("/json/products.json")
  .then((res) => res.json())
  .then((data) => {
    data.products.map((product) => {
      if (null != localStorage.getItem(product._id)) {
        quantityPrice = parseInt(localStorage.getItem(product._id));
        quantity = quantity + parseInt(localStorage.getItem(product._id));
        totalPrice += quantityPrice * product.price;
      }
    });

    const cartInfoElement = document.createElement("article");
    cartInfoElement.className = "cart_info";
    cartInfoElement.innerHTML = `
            <div>
                <h2>Барааны нийт үнэ</h2>
                <h2>${totalPrice}₮</h2>
            </div>
            <div>
                <h2>Барааны тоо</h2>
                <h2>${quantity}
            </div>
            <div>
                <h2>Хүргэлтийн төлбөр
                <h2>5000₮</h2>
            </div>
            <div>
                <h2>Нийт төлбөр</h2>
                <h2>${totalPrice+5000}₮</h2>
            </div>
            <button>Төлбөр төлөх</button>
            `;
    cartInfo.appendChild(cartInfoElement);
  });
