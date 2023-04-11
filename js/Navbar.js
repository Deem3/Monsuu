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