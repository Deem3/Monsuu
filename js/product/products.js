fetch("/json/products.json")
  .then((response) => response.json())
  .then((data) => {
    const products = data.products;
    products.map((product) => {
      const eachProduct = document.createElement("article");
      eachProduct.innerHTML = `
                    <img src="${product.img}" alt="${product.name}" class="product-img">
                    <img src="images/product/shopping_cart.svg" class="product-cart" onclick="handleAdd(${product._id})">
                    <div class="product-info">
                    <p>${product.weight} гр</p>
                    <h3 onclick="handleProd(${product._id})">${product.name}</h3>
                    </div>
            `;
      document.getElementById("container").appendChild(eachProduct);
    });
  })
  .catch((error) => console.log(error));
