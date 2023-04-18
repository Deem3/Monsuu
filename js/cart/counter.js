'use strict'
const targetNode = document.querySelector('#first');

console.log(targetNode)

var loaded = false;

const config = { attributes: true, childList: true, subtree: true };

const observeDomChanges = (callback) => {
  const observer = new MutationObserver((mutationsList) => {
    for (let mutation of mutationsList) {
      if (mutation.type === 'childList' || mutation.type === 'attributes') {
        callback();
        return;
      }
    }
  });
  
  observer.observe(targetNode, config);

  setInterval(()=>{
    if(loaded == true)
    clearInterval()
    observer.disconnect()
  }, 100)
}

observeDomChanges(() => {
  loaded = true;
  console.log('DOM changed!');
})

function handleMinus(id){
  console.log('id', id);
  let num = localStorage.getItem(id);
  num--;
  if(num <= 0){
    localStorage.removeItem(id);
    console.log('removed')
  }
  document.getElementById('display_counter').innerHTML = num;
  localStorage.setItem(id, num);
}

function handlePlus(id){
  let num = localStorage.getItem(id);
  num++;
  document.getElementById('display_counter').innerHTML = num;
  localStorage.setItem(id, num);
}

function handleDelete(id){
  localStorage.removeItem(id);
  console.log('item deleted');
}

// const checkLoaded = setInterval(()=>{
//   if(loaded){
//     const minus = document.getElementById('minus_btn')
    
//     clearInterval(checkLoaded)
// }}, 100)