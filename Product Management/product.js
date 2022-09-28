class Product {
    constructor( productCode,name, size, colour, price, locationShop) {
        this.productCode = productCode;
        this.name = name;
        this.size = size;
        this.colour = colour;
        this.price = price;
        this.locationShop = locationShop;
    }
}
var size =[];
var products = [];

const productData = "productData";

function init() {
    if(localStorage.getItem(productData) == null){
    products = [
        new Product(1,"Block Knitted Craf", " S", "Pink and Peach", "10", "Paul Smith Soho"),
        new Product(2,"Block Knitted Craf", " M", "Pink and Peach", "10", "Paul Smith Floral Street"),
        new Product(3,"Block Knitted Cardigan", " XS", "Blue", "15", "Paul Smith No.9"),
        new Product(4,"Block Knitted Hat ", " M", "Orange and Yellow", "12", "Paul Smith No.8"),
        new Product(5,"Block Knitted Craf", " L", "Yellow", "12", "Paul Smith No.8"),
        new Product(6,"Block Knitted Socks", " M", "Orange and Yellow", "8", "Paul Smith No.5"),
        new Product(7,"Block Knitted Cardigan", " S", "Aquamarine", "15", "Paul Smith Floral Street"),
        new Product(8,"Block Knitted Hat", " XS", "Orange and Yellow", "12", "Paul Smith No.9"),
        new Product(9,"Block Knitted Socks", " S", "Green", "8", "Paul Smith Floral Street"),
        new Product(10,"Block Knitted Hat", " M", "Orange and Yellow", "12", "Paul Smith No.8"),
    ]
        

    localStorage.setItem(productData, JSON.stringify (products));
    }
    else {
        products= JSON.parse(localStorage.getItem(productData));
    }
   
}
function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
}

function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}



function renderProduct() {
    let htmls = products.map(function (product) {
        return `
    <tr id="tr_${product.productCode}">
        <td>PRD_${product.productCode}</td>
        <td class="textContent">${product.name}</td>
        <td >${product.size}</td>
        <td >${product.colour}</td>
        <td >${product.price}</td>
        <td class="textContent">${product.locationShop}</td>
        <td>
        <i title="Remove" class="fa fa-trash delcolor" onclick='removeProduct("${product.productCode}")'></i>
        <i title="Edit" class="fa fa-edit editcolor" onclick='editProduct("${product.productCode}")'></i>
        <i title="Save" class="fa fa-save savecolor" onclick='updateProduct("${product.productCode}")'></i>  
        <i title="Cancel" class="fa fa-window-close closecolor" onclick='cancelupdate("${product.productCode}")'></i>  
        </td>
    </tr>
    `
    })
    document.querySelector("#tbProduct>tbody").innerHTML = htmls.join("")
};

function addProduct() {
   
    let name = document.querySelector("#name").value;
    let size = document.querySelector("#size").value;
    let colour = document.querySelector("#colour").value;
    let price = document.querySelector("#price").value;
    let locationShop = document.querySelector("#locationShop").value;
    let currentMaxPrCode = findMaxProductCode();
    let product = new Product(currentMaxPrCode +1 ,name, size, colour, price, locationShop,);
    products.push(product);
    renderProduct();
    clearForm();
}

function findMaxProductCode() {
    let tempProducts = [...products];
    tempProducts.sort(function (product1, product2) {
        return product2.productCode - product1.productCode;
    })
    return tempProducts[0].productCode;
}
function clearForm(){
    document.getElementById('productCode').value = '';
    document.getElementById('name').value = '';
    document.getElementById('size').value = '';
    document.getElementById('colour').value = '';
    document.getElementById('price').value = '';
    document.getElementById('locationShop').value = '';
}    


function removeProduct(Code) {
    let _code = parseInt(Code);
    let confirmed = window.confirm("Are you sure to remove this product?");
    if (confirmed) {
        let position = products.findIndex(function (product) {
            return product.productCode == _code;
        })
        //console.log(position)
        products.splice(position, 1);

        setLocalStorage('productData', products);
        renderProduct();
    }
}
 // Lay info & edit !!
function getProductByCode(Code) {
    return products.find(function (product) {
        return product.productCode == Code;
    })
}
function getProduct(productCode) {
    let product = getProductByCode(productCode);
}


function editProduct(productCode){
        let product = getProductByCode(productCode);

        document.querySelector(`#tr_${productCode}`).style.backgroundColor = "#0eddda"; 
        // console.log(product);
        let tr = document.querySelector(`tr_${product.productCode}`);
        let size = document.querySelector('#size');
        size.innerHTML = `
                                <option value="S" ${(product.productCode == 'S') ? 'selected': ""}>S</option>
                                <option value="M" ${(product.productCode == 'M') ? 'selected': ""}>M</option>
                                <option value="L" ${(product.productCode == 'L') ? 'selected': ""}>L</option>
                                <option value="XL" ${(product.productCode == 'XL') ? 'selected': ""}>XL</option>
                          `

        let colour = document.querySelector(`#colour`);
        colour.value =product.colour;
        let price = document.querySelector(`#price`);
        price.value = product.price;
        let locationShop = document.querySelector(`#locationShop`);
        locationShop.value = product.locationShop;
        let addProductID = document.querySelector('#addProductID');
        addProductID.style.visibility = 'hidden';
    }

    function cancelupdate(productCode) {
        // Reset lai gia tri add Product
        // Hien thi lai nut add Product 
    
        document.querySelector(`#size`).value = "";
        document.querySelector(`#colour`).value = "";
        document.querySelector(`#price`).value = "";
        document.querySelector(`#locationShop`).value = "";
        document.querySelector(`#addProductID`).style.visibility = 'visible';
        renderProduct();
        // clearForm();
        

    }

    function updateProduct(productCode) {
        // console.log("updateProduct");
        let product = getProductByCode(productCode);
        let newsize = document.querySelector('#size').value;
        let newcolour = document.querySelector('#colour').value;
        let newprice = document.querySelector('#price').value;
        let newlocationShop = document.querySelector('#locationShop').value;

        product.size = newsize;
        product.colour = newcolour;
        product.price = newprice;
        product.locationShop = newlocationShop;
        // console.log(products);
        setLocalStorage(productData, products);
        renderProduct();
        // clearForm();
    }
    
(function () {
    init();
    renderProduct()

})()

