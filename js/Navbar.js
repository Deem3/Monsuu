"use strict";

// const login_text = `
//   <form class="login">
//     <input id="login_user" type="text" placeholder="Нэвтрэх нэр" />
//     <input id="login_pass" type="password" placeholder="Нууц үг" />
//     <button id="login_btn" >Нэвтрэх</button>
//     <button id="logout_btn" >Гарах</button>
//   </form>
// `;

// const dropdown_styled = `
//     display: block;
//     position: absolute;
//     top: 2.8125rem;
//     background-color: #dddddd;
//     width: 10rem;
//     height: 10rem;
//     border-radius: 6px;
//     transition-duration: 600ms;
//     transition: ease-in-out;
//     border: 1px #272f89 solid
// `;

// const login_dropdown_styled = `
//   overflow: hidden;
//   display: block;
//   position: absolute;
//   background-color: #dddddd;
//   border: 1px #272f89 solid;
//   border-radius: 6px;
//   width: 8rem;
//   height: 8rem;
//   right: 6px;
// `;

// const template = document.createElement("nav");
// template.innerHTML = `
// <section class="nav__menu" id="section__menu">
//             <img src="images/Navbar.svg" alt="menu" />
//           <ul class="menu__dropdown" id="menu">
//             <li><a href="product.html">Бүтээгдэхүүн</a></li>
//             <li><a href="createProduct.html">Бидний тухай</a></li>
//             <li><a href="#">Ажлын байр</a></li>
//             <li><a href="address.html">Хаяг байршил</a></li>
//             <li><a href="#">Тусламж</a></li>
//           </ul>
//         </section>

//         <ul class="for__customer">
//           <li><a href="product.html">Бяцхан үрсдээ</a></li>
//           <li><a href="product.html">Өрх гэрт</a></li>
//           <li><a href="product.html">Урамшуулал</a></li>
//         </ul>
//         <a href="index.html">
//           <img
//           src="images/header/Logo.png"
//           class="nav__logo"
//           alt="монсүү monsuu"
//         />
//         </a>
//         <div class="nav__user">
//           <a href="cart.html"><img src="images/header/icons8-shopping-cart-48.png" alt="монсүү сагс" /></a>
//           <a href="#"><img id="user_login" src="images/header/users.svg" alt="монсүү хэрэглэгч" /></a>
//           ${login_text}
//         </div>
// `;
// document.getElementById("Header").appendChild(template);

// // navbar extends
// const menu = document.getElementById("menu");
// const navbar = document.getElementById("section__menu");
// var check = false;

// navbar.onclick = () => {
//   if (check != false) {
//     check = false;
//     menu.style = "display: none";
//   } else {
//     check = true;
//     menu.style = dropdown_styled;
//     setTimeout(() => {
//       check=false;
//       menu.style = "display: none";
//     }, 7000)
//   }
// };

// // login extends
// const login = document.querySelector(".login");
// const user = document.getElementById("user_login");
// var login_check = false;

// // if(test==1){
// //   login.style = login_dropdown_styled;
// // }

// user.addEventListener("pointerdown", ()=>{
//   if (login_check != false) {
//     login_check = false;
//     login.style = "display: none";
//   } else {
//     login_check = true;
//     login.style = login_dropdown_styled;
//   }
// })

// const login_btn = document.getElementById("login_btn");

// login_btn.addEventListener('pointerdown', (e)=>{
//   e.preventDefault()
//   const login_user = document.getElementById("login_user").value;
//   const login_pass = document.getElementById("login_pass").value;
//   const date = new Date()
//   date.setTime(date.getTime() + (1200000));
//   fetch('http://localhost:4000/user/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({username: login_user, password: login_pass})
//     })
//       .then(res=>res.json())
//       .then(data=>{
//         // console.log('signed in successfuly')
//         document.cookie = `token=${data.token}; expires=${date.toUTCString()}`
//       })
//       .catch(err=>console.log(err))
//   })

// const logout_btn = document.getElementById("logout_btn");

// logout_btn.addEventListener('pointerdown', (e)=>{
//   e.preventDefault()
//   const date = new Date()
//   date.setTime(date.getTime() - (0));
//   document.cookie = `token=; expires=${date.toUTCString()}`
//   console.log('logged out')
// })

class Navbar extends HTMLElement {
  constructor() {
    super();
    this.check = false;
    this.login_check = false;
    this.login_text = `
  <form class="login">
    <input id="login_user" type="text" placeholder="Нэвтрэх нэр" />
    <input id="login_pass" type="password" placeholder="Нууц үг" />
    <button id="login_btn" >Нэвтрэх</button>
    <button id="logout_btn" >Гарах</button>
  </form>
  `;
    this.dropdown_styled = `
    display: block;
    position: absolute;
    top: 2.8125rem;
    width: 10rem;    
    height: 10rem;
    border-radius: 6px;
    border: 1px #272f89 solid
    background-color: #dddddd;
    transition-duration: 600ms;
    transition: ease-in-out;
  `;
    this.login_dropdown_styled = `
    display: block;
    position: absolute;
    right: 6px;
    width: 8rem;
    height: 8rem;
    border: 1px #272f89 solid;
    border-radius: 6px;
    background-color: #dddddd;
    overflow: hidden;
  `;
    this.innerHTML = `
    <nav>
      <section class="nav__menu" id="section__menu">
        <img src="images/Navbar.svg" alt="menu" />
        <ul class="menu__dropdown" id="menu">
          <li><a aria-label="Menu sections product" href="product.html">Бүтээгдэхүүн</a></li>
          <li><a aria-label="Menu sections about us" href="createProduct.html">Бидний тухай</a></li>
          <li><a aria-label="Menu sections work" href="#">Ажлын байр</a></li>
          <li><a aria-label="Menu sections address" href="address.html">Хаяг байршил</a></li>
          <li><a aria-label="Menu sections support" href="#">Тусламж</a></li>
        </ul>
      </section>

      <ul class="for__customer">
        <li><a aria-label="navbar sorting for kids" href="product.html">Бяцхан үрсдээ</a></li>
        <li><a aria-label="navbar sorting for family" href="product.html">Өрх гэрт</a></li>
        <li><a aria-label="navbar sorting add" href="product.html">Урамшуулал</a></li>
      </ul>
      <a href="index.html" aria-label="main logo of monsuu">
        <img
        src="images/header/Logo.webp"
        class="nav__logo"
        alt="монсүү monsuu"
      </a>
      <div class="nav__user">
        <a href="cart.html" aria-label="cart button" ><img src="images/header/icons8-shopping-cart-48.webp" alt="монсүү сагс" /></a>
        <a href="#" aria-label="auth section"><img id="user_login" src="images/header/users.svg" alt="монсүү хэрэглэгч" /></a>
        ${this.login_text}
      </div>
    </nav>
  `;
    const menu = document.getElementById("menu");
    const navbar = document.getElementById("section__menu");

    // navbar extends
    navbar.onclick = () => {
      if (this.check != false) {
        this.check = false;
        menu.style = "display: none";
      } else {
        this.check = true;
        menu.style = this.dropdown_styled;
        setTimeout(() => {
          this.check = false;
          menu.style = "display: none";
        }, 7000);
      }
    };
    const login = document.querySelector(".login");
    const user = document.getElementById("user_login");

    // login extends
    user.addEventListener("pointerdown", ()=>{
      if (this.login_check != false) {
        this.login_check = false;
        login.style = "display: none";
      } else {
        this.login_check = true;
        login.style = this.login_dropdown_styled;
      }
    })
    const login_btn = document.getElementById("login_btn");

    // login process
    login_btn.addEventListener('pointerdown', (e)=>{
      e.preventDefault()
      const login_user = document.getElementById("login_user").value;
      const login_pass = document.getElementById("login_pass").value;
      const date = new Date()
      date.setTime(date.getTime() + (1200000));
      fetch('http://localhost:4000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username: login_user, password: login_pass})
        })
          .then(res=>res.json())
          .then(data=>{
            // console.log('signed in successfuly')
            document.cookie = `token=${data.token}; expires=${date.toUTCString()}`
          })
          .catch(err=>console.log(err))
      })

      const logout_btn = document.getElementById("logout_btn");

      logout_btn.addEventListener('pointerdown', (e)=>{
        e.preventDefault()
        const date = new Date()
        date.setTime(date.getTime() - (0));
        document.cookie = `token=; expires=${date.toUTCString()}`
        console.log('logged out')
      })
  }
}

window.customElements.define("nav-bar", Navbar);
