let products=[
    {
        id:1,
        name:"Активоване вугілля",
        image:"images/1189907e-97d8-4b80-8d84-aef70cd4c70f.webp",
        type:"antiviral",
        price:100
    },
    {
        id:2,
        name:"Новирін",
        image:"images/img_0.webp",
        type:"antiviral",
        price:500
    },
    {
        id:3,
        name:"Парацетамол",
        image:"images/news_163.jpg",
        type:"analgesic",
        price:101
    },
    {
        id:4,
        name:"Золофт",
        image:"images/img_0 (1).webp",
        type:"antidepressant",
        price:660
    },
    {
        id:5,
        name:"Адаптол",
        image:"images/4750258314515.webp",
        type:"antidepressant",
        price:400
    },
    {
        id:6,
        name:"Фітофорте Пробіотик",
        image:"images/shopping.webp",
        type:"antibiotic",
        price:350
    },
    {
        id:7,
        name:"Лірика",
        image:"images/26059_lOIaWLCM_20241126_121650.jpg",
        type:"analgesic",
        price:360
    }
];
let cart=JSON.parse(localStorage.getItem("cart"))||[];
let productsContainer= document.querySelector(".cards-div");
let btnGroup= document.querySelector(".dropdown-menu")

function renderProducts(items) {
    productsContainer.innerHTML = ""
    if (items.length == 0) {
        productsContainer.innerHTML = '<p>Товарів не знайдено</p>'
        return;
    }

    items.forEach(function(item) {
        let productHTML = `
            <artcle class="card" data-id="${item.id}">
                <div class="card-img"><img src="${item.image}"></div>
                <div class="card-info">
                    <div class="card-name">${item.name}</div>
                    <div class="card-cost">${item.price} грн </div>
                    <div class="button-to-s-card">
                        <button type="button" class="btn btn-primary add-to-cart-btn"> </button>
                    </div>
                </div>
            </artcle>
        `
        productsContainer.innerHTML += productHTML
    })
}

function applyFilters(categoryType){
    if (categoryType=="all"){
        renderProducts(products)
    }
    else{
        filterrdProducts=products.filter(product=> product.type==categoryType)
        renderProducts(filterrdProducts)
    }
}
function addToCart(productId){
    let cartProduct= cart.find(p=>p.id==productId);
    if(cartProduct){
        cartProduct.quantity+=1;
    }
    else{
        let product=products.find(p=>p.id==productId);
        cart.push({...product,quantity:1});
    }
    // if (product){
    //     cart.push(product);
    //     alert("Товар додано " + product.name)
    // }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert("Товар додано!")

}
let productsMap={
    "Analgesics": "analgesic",
    "Antibiotics": "antibiotic",
    "Antihypertensives": "antihypertensive",
    "Antidepressants":"antidepressant",
    "Antivirals":"antiviral",
    "All": "all"
}
function setupFilterButtons(){
    for(let button of btnGroup.children){
        button.addEventListener("click", function(e){
            e.preventDefault()
            let category=productsMap[button.innerHTML]
            applyFilters(category)
        }
    ) 
    }
}
productsContainer.addEventListener("click", function(event){
    if(event.target.classList.contains("add-to-cart-btn")){
        let productCard=event.target.closest(".card");
        let productId=parseInt(productCard.dataset.id)
        addToCart(productId)
    }
})
renderProducts(products)
setupFilterButtons()