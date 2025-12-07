let products=[
    {
        id:1,
        name:"Активоване вугілля",
        image:"images/1189907e-97d8-4b80-8d84-aef70cd4c70f.webp",
        type:"digestive",
        price:100
    },
    {
        id:2,
        name:"Новирін",
        image:"images/img_0.webp",
        type:"temp",
        price:500
    }
];
let cart=[];
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
                    <div class="card-cost">${item.price}</div>
                    <div class="button-to-s-card">
                        <button type="button" class="btn btn-primary"> </button>
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
    let product= products.find(p=>p.id==productId)
    if (product){
        cart.push(product);
        alert("Товар додано " + product.name)
    }

}
let productsMap={
    "Digestive": "digestive",
    "For Nose": "fornose",
    "For a temperature": "temp",
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
    if(event.target.classList.contains(".button-to-s-card")){
        let productCard=event.target.closest(".card");
        let productId=parseInt(productCard.dataset.id)
        addToCart(productId)
    }
})
renderProducts(products)
setupFilterButtons()