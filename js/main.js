var productsContainer = [];

if(localStorage.getItem('ourProduct') != null){
    productsContainer = JSON.parse( localStorage.getItem('ourProduct'));
    displayProducts();
}


var productNameInput = document.getElementById('productName');
var productPriceInput = document.getElementById('productPrice');
var productCategoryInput = document.getElementById('productCategory');
var productDecsInput = document.getElementById('productDesc');
var currentIndex = 0;
var searchInput = document.getElementById('search');
var Btn = document.getElementById('btn');
var AlertNameInput = document.getElementById('alertName');
var AlertPriceInput = document.getElementById('alertPrice');
var AlertCategoryInput = document.getElementById('alertCategory');
var AlertDescInput = document.getElementById('alertDesc');

// Add
function addProduct(){
    if(  ( validateProductName() == true ) && ( validateProductPrice() == true ) && 
        ( validateProductCategory() == true )  && ( validateProductDesc() == true) ){
        if(document.getElementById("btn").innerHTML == "Add Product"){
            var product = {
                name:productNameInput.value,
                price:productPriceInput.value,
                category:productCategoryInput.value,
                decs:productDecsInput.value
            }
            productsContainer.push(product);
            localStorage.setItem('ourProduct' , JSON.stringify( productsContainer ));
        }
        else{
            updateProduct();
        }
        displayProducts()
        clearForm();
        Btn.disabled =!1;
    }
    else{
        Btn.disabled=!0;
    }
}  

// Clear
function clearForm(){
    productNameInput.value ="";
    productPriceInput.value ="";
    productCategoryInput.value = "",
    productDecsInput.value = "";
}

// Display
function displayProducts(){
    var cartoona = ``;

    for(var i = 0 ; i < productsContainer.length ; i++){
        cartoona += `
        <tr class="text-white">
            <td > ${i+1} </td>
            <td> ${productsContainer[i].name} </td>
            <td> ${productsContainer[i].price} </td>
            <td> ${productsContainer[i].category} </td>
            <td> ${productsContainer[i].decs} </td>
            <td><i onclick = "delProduct( ${i} );" class="fas fa-edit text-danger me-2"> Delete</i></td>
            <td><i onclick = "getProductInfo( ${i} );" class="fas fa-minus-circle text-warning me-2"> Update</i></td>
        </tr>` ;
    }
    document.getElementById('tablebody').innerHTML = cartoona;
}

// Delete
function delProduct(index){
    productsContainer.splice(index,1);
    localStorage.setItem('ourProduct' , JSON.stringify( productsContainer ));
    displayProducts();
}

// Search
searchInput.addEventListener('keyup',function(){

    var term = searchInput.value;

    var cartoona = ``;
    for( var i = 0; i<productsContainer.length ;i++){
        if(productsContainer[i].name.toLowerCase().includes(term.toLowerCase()) == true){
            cartoona += `
            <tr class="text-white">
                <td > ${i+1} </td>
                <td> ${productsContainer[i].name} </td>
                <td> ${productsContainer[i].price} </td>
                <td> ${productsContainer[i].category} </td>
                <td> ${productsContainer[i].decs} </td>
                <td><button onclick = "delProduct( ${i} );" class="btn btn-outline-danger fw-bold">Delete</button></td>
                <td><button onclick = "updateProduct( ${i} );" class="btn btn-outline-info fw-bold">Update </button></td>
            </tr>` ;
        }
    }   
    document.getElementById('tablebody').innerHTML = cartoona;
})

// Get Data
function getProductInfo(index){

    productNameInput.value =  productsContainer[index].name;
    productPriceInput.value =  productsContainer[index].price;
    productCategoryInput.value =  productsContainer[index].category;
    productDecsInput.value =  productsContainer[index].decs;
    currentIndex = index;
            
    document.getElementById("btn").innerHTML = "Update Product";
}

// Update
function updateProduct(){
    var product = {
        name:productNameInput.value,
        price:productPriceInput.value,
        category:productCategoryInput.value,
        decs:productDecsInput.value
    }
    Btn.disabled =!1;
    productsContainer[currentIndex] = product; 
    localStorage.setItem('ourProduct' , JSON.stringify( productsContainer ));
}

/* For Validation */
// Product Name
function validateProductName(){
    var regex = /^([A-Z][a-z ]{2,30}|[A-Z][a-z]{2,20}[0-9]{1,3})$/;
    if(regex.test(productNameInput.value) == true){
        Btn.disabled =!1;
        productNameInput.classList.add('is-valid');
        productNameInput.classList.remove('is-invalid');
        AlertNameInput.classList.add('d-none');
        return true;
    }
    else{
        
        productNameInput.classList.add('is-invalid');
        productNameInput.classList.remove('is-valid');
        AlertNameInput.classList.remove('d-none');
        Btn.disabled =!0;
        return false;
    }
}
productNameInput.addEventListener('keyup',function (){
    validateProductName();
})

// Product Price
function validateProductPrice(){

    var regex = /^([1-9][0-9]{3}|[1-9][0-9]{4}|30000)$/;

    if(regex.test(productPriceInput.value) == true){
        Btn.disabled =!1;
        productPriceInput.classList.add('is-valid');
        productPriceInput.classList.remove('is-invalid');
        AlertPriceInput.classList.add('d-none');
        return true;
    }
    else{
        productPriceInput.classList.add('is-invalid');
        productPriceInput.classList.remove('is-valid');
        AlertPriceInput.classList.remove('d-none');
        Btn.disabled =!0;
        return false;
    }
}
productPriceInput.addEventListener('keyup',function (){
    validateProductPrice(); 
})
// Product Category
function validateProductCategory(){

    var regex = /^([L-l]abtop|[S-s]creen|[M-m]obile)$/;

    if(regex.test(productCategoryInput.value) == true){
        Btn.disabled =!1;
        productCategoryInput.classList.add('is-valid');
        productCategoryInput.classList.remove('is-invalid');
        AlertCategoryInput.classList.add('d-none');
        return true;
    }
    else{
        productCategoryInput.classList.add('is-invalid');
        productCategoryInput.classList.remove('is-valid');
        AlertCategoryInput.classList.remove('d-none');
        Btn.disabled =!0;
        return false;
    }
}
productCategoryInput.addEventListener('keyup',function (){
    validateProductCategory();
    
})
// Product Desc
function validateProductDesc(){

    var regex = /^([A-z]{2,}|[A-z]{2,} {1,30})/;

    if(regex.test(productDecsInput.value) == true){
        Btn.disabled =!1;
        productDecsInput.classList.add('is-valid');
        productDecsInput.classList.remove('is-invalid');
        AlertDescInput.classList.add('d-none');
        return true;
    }
    else{
        productDecsInput.classList.add('is-invalid');
        productDecsInput.classList.remove('is-valid');
        AlertDescInput.classList.remove('d-none');
        Btn.disabled =!0;
        return false;
    }
}
productDecsInput.addEventListener('keyup',function (){
    validateProductDesc();
})

// submit form
let Form =document.getElementById('form');
document.getElementById('ContactUs').addEventListener('click',function () {
    Form.addEventListener('submit',function(e){
        e.preventDefault();
        addProduct();
    });
});


// To_Top
$('#to_Top').click(function(){
    $('body ,html').animate({scrollTop:0},1000)
})


