'use strict'
var count = 0;

const handleAdd = (id) => {
    count++

    localStorage.setItem(id, count);
    // console.log(id)
}

const handleProd = (id) => {
    const _id = localStorage.getItem('id')
    if(_id !== null){
        localStorage.removeItem('id')
        localStorage.setItem('id', id)
    }
    else{
        localStorage.setItem('id', id)
    }
    // setTimeout(()=>{
        window.location.href = 'eachProduct.html'
    // }, 500)
}