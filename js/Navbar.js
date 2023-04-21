'use strict';

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
`




const template = document.createElement('nav')
template.innerHTML = `
<section class="nav__menu" id="section__menu">
            <img src="images/Navbar.svg" alt="menu" />
          <ul class="menu__dropdown" id="menu">
            <li><a href="./product.html">Бүтээгдэхүүн</a></li>
            <li><a href="#">Бидний тухай</a></li>
            <li><a href="#">Ажлын байр</a></li>
            <li><a href="#">Хаяг байршил</a></li>
            <li><a href="#">Тусламж</a></li>
          </ul>
        </section>

        <ul class="for__customer">
          <li><a href="./product.html">Бяцхан үрсдээ</a></li>
          <li><a href="./product.html">Өрх гэрт</a></li>
          <li><a href="./product.html">Урамшуулал</a></li>
        </ul>
        <a href="index.html">
          <img
          src="images/Logo.png"
          class="nav__logo"
          alt="монсүү monsuu"
        />
        </a>
        <div class="nav__user">
          <a href="cart.html"><img src="images/Cart.svg" alt="монсүү сагс" /></a>
          <img src="images/Users.svg" alt="монсүү хэрэглэгч" />
        </div>
`
document.getElementById("Header").appendChild(template)

const menu = document.getElementById('menu');
const navbar = document.getElementById('section__menu');
var check = false;

navbar.onclick = () => {
    if(check != false){
        check = false;
        menu.style = "display: none"
    }
    else{
        check = true;
        menu.style = dropdown_styled;
    }
}