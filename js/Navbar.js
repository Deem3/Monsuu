"use strict";

const login_text = `
  <form class="login">
    <input id="login_user" type="text" placeholder="Нэвтрэх нэр" />
    <input id="login_pass" type="password" placeholder="Нууц үг" />
    <button type="button">Нэвтрэх</button>
  </form>
`;


const dropdown_styled = `
    display: block;
    position: absolute;
    top: 2.8125rem;
    background-color: #dddddd;
    width: 10rem;    
    height: 10rem;
    border-radius: 6px;
    transition-duration: 600ms;
    transition: ease-in-out;
    border: 1px #272f89 solid
`;

const login_dropdown_styled = `
  overflow: hidden;
  display: block;
  position: absolute;
  background-color: #dddddd;
  border: 1px #272f89 solid;
  border-radius: 6px;
  width: 8rem;
  height: 8rem;
  right: 6px;
`;

const template = document.createElement("nav");
template.innerHTML = `
<section class="nav__menu" id="section__menu">
            <img src="images/Navbar.svg" alt="menu" />
          <ul class="menu__dropdown" id="menu">
            <li><a href="product.html">Бүтээгдэхүүн</a></li>
            <li><a href="#">Бидний тухай</a></li>
            <li><a href="#">Ажлын байр</a></li>
            <li><a href="address.html">Хаяг байршил</a></li>
            <li><a href="#">Тусламж</a></li>
          </ul>
        </section>

        <ul class="for__customer">
          <li><a href="product.html">Бяцхан үрсдээ</a></li>
          <li><a href="product.html">Өрх гэрт</a></li>
          <li><a href="product.html">Урамшуулал</a></li>
        </ul>
        <a href="index.html">
          <img
          src="images/header/Logo.png"
          class="nav__logo"
          alt="монсүү monsuu"
        />
        </a>
        <div class="nav__user">
          <a href="cart.html"><img src="images/header/icons8-shopping-cart-48.png" alt="монсүү сагс" /></a>
          <a href="#"><img id="user_login" src="images/header/users.svg" alt="монсүү хэрэглэгч" /></a>
          ${login_text}
        </div>
`;
document.getElementById("Header").appendChild(template);


// navbar extends
const menu = document.getElementById("menu");
const navbar = document.getElementById("section__menu");
var check = false;

navbar.onclick = () => {
  if (check != false) {
    check = false;
    menu.style = "display: none";
  } else {
    check = true;
    menu.style = dropdown_styled;
    setTimeout(() => {
      check=false;
      menu.style = "display: none";
    }, 7000)
  }
};



// login extends
const login = document.querySelector(".login");
const user = document.getElementById("user_login");
var login_check = false;

// if(test==1){
//   login.style = login_dropdown_styled;
// }

user.addEventListener("pointerdown", ()=>{
  if (login_check != false) {
    login_check = false;
    login.style = "display: none";
  } else {
    login_check = true;
    login.style = login_dropdown_styled;
  }
})


