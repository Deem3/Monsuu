'use strict'

const elemId = document.getElementById('third')
const mainElem = document.querySelector('main')

var toggleStyle = false;

const style =  `
    display: flex;
    width: 75%;
    height: 75%;
    position: absolute;
    background-color: white;
    border-radius: 9px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
    top: 15%;
    right: 12%;
`

const handlePayment = () => {
    toggleStyle != false ? toggleStyle = false : toggleStyle = true;
    console.log(toggleStyle)
    if(toggleStyle==true){
        elemId.style = style;
        mainElem.style = "background: rgba(85, 77, 77, 0.8);"
    }
    else{
        elemId.style = "display: none; transition: all 0.8s ease-in-out;"
        mainElem.style = "background-color: white;"
    }
}

elemId.innerHTML =`

    <form>
        <select>
            <option>Багануур дүүрэг</option>
            <option>Багахангай дүүрэг</option>
            <option>Баянгол дүүрэг</option>
            <option>Баянзүрх дүүрэг</option>
            <option>Чингэлтэй дүүрэг</option>
            <option>Хан уул дүүрэг</option>
            <option>Налайх дүүрэг</option>
            <option>Сонгино хайрхан дүүрэг</option>
            <option>Сүхбаатар дүүрэг</option>
        </select>
        <select>
            <option>1-р хороо</option>
            <option>2-р хороо</option>
            <option>3-р хороо</option>
            <option>4-р хороо</option>
            <option>5-р хороо</option>
            <option>6-р хороо</option>
            <option>7-р хороо</option>
            <option>8-р хороо</option>
            <option>9-р хороо</option>
            <option>10-р хороо</option>
        </select>
        <input type="text" placeholder="Байр, тоот">
        <input type="tel" placeholder="Утасны дугаар">
    </form>
    <button onclick="handleDel()">X</button>
    <button>Захиалах</button
`

const handleDel = () => {
    toggleStyle != false ? toggleStyle = false : toggleStyle = true;
    console.log(toggleStyle)
    if(toggleStyle==true){
        elemId.style = style;
        mainElem.style = "background: rgba(85, 77, 77, 0.8);"
    }
    else{
        elemId.style = "display: none; transition: all 0.8s ease-in-out;"
        mainElem.style = "background-color: white;"
    }
}