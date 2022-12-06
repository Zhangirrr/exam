let cartDiv = document.querySelector("#all_products");
let cartSelect = document.querySelector("#select");
let totalPrice = document.querySelector("#total_price");
let cartBuy = document.querySelector("#cart_buy");



drawSelect();

async function drawSelect() {
    let cart = JSON.parse(localStorage.getItem("cartCategories")) || [];
    let filteredCategories = [];

        for(let item of cart){
            filteredCategories.push(item.category);
        }
    let unique = [... new Set(filteredCategories)]

            cartSelect.innerHTML += `<option value="">Выберите категорию:</option>`
            for(let i = 0; i < unique.length; i++){
                cartSelect.innerHTML += `<option value="${unique[i]}">${unique[i]}</option>`
            }
        console.log(filteredCategories)   
};

drawCartCategories();

async function drawCartCategories(category){
    let cart = JSON.parse(localStorage.getItem("cartProductIds")) || [];
    let response = await fetch("https://dummyjson.com/products?limit=100");
    let data = await response.json();
    // console.log(data.products);

    let totalSum = 0;
    let cartArray = [];
    
        for(let item of cart){
            cartArray.push(data.products.filter(product => product.id == item.productId)[0]);   
        }   

        for(let products of cartArray){
            if(category){
                if(category == products.category){
                    cartDiv.innerHTML += `
                    <div class="products">
                    <div class ="image" style="background-image: url(${products.images[0]});"></div>
                    <span class="title">${products.title}</span><hr>
                    <span class="price">${products.price}$</span><br><br>
                    <span class="title">Category: </span>${products.category}
                </div>
                    `
                }
            }
            totalSum += products.price
        }
    

};


const sendEmail = (email, subject, message, price) => {
    const templateParams = {
        message: message,
        subject: subject,
        to_email: email,
        price: price,
    };
    
    emailjs.send('service_aozbob6', 'template_42ducdk', templateParams)
    .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
        console.log('FAILED...', error);
    });
}

cartSelect.addEventListener("change", () => {
    drawCartCategories(cartSelect.value)    
    cartDiv.innerHTML = "";
})


cartBuy.addEventListener("click", async () => { 
    let cart = JSON.parse(localStorage.getItem("cartProductIds")) || [];
    let response = await fetch("https://dummyjson.com/products?limit=100");
    let data = await response.json();

    let cartArray = [];
    let title = []
    let totalSum = 0;
    
    for(let item of cart){
        cartArray.push(data.products.filter(product => product.id == item.productId)[0]);   

    }
    for(let item of cartArray){
        title.push(item.title)
        totalSum += item.price
    }

    console.log(title)

    let currentUserEmail = localStorage.getItem("currentUserEmail");

    console.log(totalSum)

    
    sendEmail(currentUserEmail,"Поздравляем с покупкой",`Ваши покупки: ${title}
    Общая сумма: ${totalSum}$`)
})
