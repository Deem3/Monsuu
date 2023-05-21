// 'use strict'


// // observing dom changes
// const targetNode = document.querySelector('product-details')
// console.log(targetNode)

// var loaded = false;

// const config = { attributes: true, childList: true, subtree: true };

// const observeDomChanges = (callback) => {
//   const observer = new MutationObserver((mutationsList) => {
//     for (let mutation of mutationsList) {
//       if (mutation.type === 'childList' || mutation.type === 'attributes') {
//         callback();
//         return;
//       }
//     }
//   });
  
//   observer.observe(targetNode, config);

//   setInterval(()=>{
//     if(loaded == true)
//     clearInterval()
//     observer.disconnect()
//   }, 100)
// };


// observeDomChanges(() => {
//   loaded = true;
//   console.log('DOM changed!');
// });



// // if dom changed then execute this code
// const checkLoaded = setInterval(()=>{
//   if(loaded){
//     console.log('stop')
//     clearInterval(checkLoaded)
//     const num = document.getElementById("num");
//     console.log(num)
  
//     const globalState = (() => {
//       let counter = 1;
      
//       const incrementCounter = () => {
//         counter++;
//         num.textContent = counter;
//       };
      
//       const decrementCounter = () => {
//         if (counter > 1) {
//           counter--;
//           num.textContent = counter;
//         }
//       };
      
//       const order = () => {
//         const myProd = {
//           "id": localStorage.getItem('id'),
//           "stock": counter
//         };
//         const jsonOrder = JSON.stringify(myProd);
//         localStorage.setItem(localStorage.getItem('id'), jsonOrder);
//       };
      
//       return {
//         getCounter: () => counter,
//         incrementCounter,
//         decrementCounter,
//         order
//       };
//     })();
  
//     document.getElementById('plus_btn').addEventListener('click', () => {
//       globalState.incrementCounter();
//     });
  
//     document.getElementById('minus_btn').addEventListener('click', () => {
//       globalState.decrementCounter();
//     });
  
//     document.getElementById('order').addEventListener('click', () => {
//       globalState.order();
//     });
//   }
// }, 100)