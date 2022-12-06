let allProducts = document.querySelector("#all_products")
let productsDiv = document.querySelector(".products")
let select = document.querySelector("#select")
let searchInput = document.querySelector("#search_input")
let URL = 'https://dummyjson.com/products?limit=100'


;(async() => {
    let response = await fetch('https://dummyjson.com/products/categories')
    let data = await response.json();
    select.innerHTML += `<option value="">Выберите категорию</option>`
        for(let i = 0; i < data.length; i++){
            select.innerHTML += `<option value="${data[i]}">${data[i]}</option>`
        }
})();

drawCategories()

async function drawCategories(category){
    let response = await fetch(URL)
    let data = await response.json();
    allProducts.innerHTML = ""
    for(let products of data.products){
        if(category){
            if(category == products.category){
                allProducts.innerHTML += `
                <div class="products">
                    <div class ="image" style="background-image: url(${products.images[0]});"></div>
                    <br><br>
                    <span class="title">${products.title}</span><hr>
                    <span class="price">${products.price}$</span><br><br>
                    <span class="title">Category: </span>${products.category}<br><br>
                    <button id="btn" onClick="sendId(${products.id})">Add to cart</button><br><br>
                </div>`
            }
        }else{
            allProducts.innerHTML += `
                <div class="products">
                    <div class ="image" style="background-image: url(${products.images[0]});"></div>
                    <br><br>
                    <span class="title">${products.title}</span><hr>
                    <span class="price">${products.price}$</span><br><br>
                    <span class="title">Category: </span>${products.category}<br><br>
                    <button id="btn" onClick="sendId(${products.id}, '${products.category}')">Add to cart</button><br><br>
                </div>`
        }
    }
}

function sendId(productId, category){
    let cartProductIds = JSON.parse(localStorage.getItem("cartProductIds")) || [];
    let cartCategories = JSON.parse(localStorage.getItem("cartCategories")) || [];
    cartProductIds.push(
        {
            productId: productId,
            ownerEmail: localStorage.getItem("currentUserEmail")
        }
        );
    cartCategories.push({
        category: category
    })
    localStorage.setItem("cartProductIds", JSON.stringify(cartProductIds));
    localStorage.setItem("cartCategories", JSON.stringify(cartCategories));
}

select.addEventListener("change", () => {
    drawCategories(select.value)    
})

searchInput.addEventListener("input", async () => {
    let response = await fetch(URL)
    let data = await response.json();

    allProducts.innerHTML = "";

    let filteredData = data.products 
    let filteredProducts = filteredData.filter(item => item.title.toLowerCase().includes(searchInput.value.toLowerCase()) || item.price.toString().includes(searchInput.value));
    drawCategories(filteredProducts);
    console.log(filteredProducts)
})