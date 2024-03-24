/* Uppgift U2 */
// --------------------------------------------------
// Globala variabler och konstanter
let cart = [];  // Varukorg
// --------------------------------------------------
// Initiering av programmet. Visa produkter och hämta varukorg.
function init() {
    switch (document.querySelector("body").className) {
        case "chocolate": showProducts(chocolate); break;
        case "caramel": showProducts(caramel); break;
        case "softcandy": showProducts(softcandy); break;
    }
    getCart ();
} // Slut init
window.addEventListener("load", init);
// --------------------------------------------------
// Skapa HTML-kod för visning av produkterna i parametern products.
// Lägg händelselyssnare på knapparna.
function showProducts(products) {
    let htmlCode = "";
    for (let i = 0; i < products.length; i++) {
        htmlCode +=
            "<div>" +
            "<img src='" + products[i].img + "' alt='produkt'>" +
            "<h4>" + products[i].name + "</h4>" +
            "<p>Pris: " + products[i].price.toFixed(2) + " kr.</p>" +
            "<button type='button' class='order'>Lägg i korg</button>" +
            "</div>";
    }
    document.querySelector("#products").innerHTML = htmlCode;
    let btns = document.querySelectorAll("#products .order");
    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function () { addToCart(products[i].artnr) });
    }
} // Slut showProducts
// --------------------------------------------------
// Returnera objekt för produkten med artikelnumret artnr.
// Finns det ingen sådan produkt, returneras null.
function getProduct(artnr) {
    let products;
    switch (artnr[0]) { // Välj produktvariabel utifrån artikelnumrets första tecken
        case "c": products = chocolate; break;
        case "k": products = caramel; break;
        case "m": products = softcandy; break;
    }
    for (let i = 0; i < products.length; i++) {
        if (products[i].artnr == artnr) return products[i]; // Produktens objekt
    }
    return null; // Produkten finns inte
} // Slut getProduct
// --------------------------------------------------
// Om produkten redan finns i varukorgen, uppdateras mängden.
// Annars läggs produkten in som en ny vara i varukorgen.
function addToCart(artnr) {
    let cartItem = getCartItem(artnr);
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cartItem = new CartItem(artnr);
        cart.push(cartItem);
    }
    showCart();
    saveCart();
    
} // Slut addToCart

// Constructor-funktion
function CartItem(artnr) {
    this.artnr = artnr; 
    this.quantity = 1; 
}
// Ta bort den vara som indexeras av index.
function removeFromCart(index) {
    cart.splice(index, 1);
    showCart();
    saveCart();
} // Slut increaseInCart
// --------------------------------------------------
// Returnera objekt för varan med artikelnumret artnr.
// Finns det ingen sådan vara i varukorgen, returneras null.
function getCartItem(artnr) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].artnr == artnr) return cart[i]; // Objektet i varukorgen
    }
    return null; // Produkten finns inte i varukorgen
} // Slut getCartItem
// --------------------------------------------------




// --------------------------------------------------
// Skapa HTML-kod för visning av varukorgen.
// Beräkna också pris, både för varje vara och totalt för alla varor.
// Lägg händelselyssnare på knapparna.
function showCart() {
    let totalPrice = 0;
    let htmlCode = "";
    for (let i = 0; i < cart.length; i++) {
        let product = getProduct(cart[i].artnr);
        let price = product.price * cart[i].quantity;
        totalPrice += price;
        htmlCode +=
        "<div>" + 
        "<h4>" + product.name +  "</h4>" + 
        "<button type='button' class='del' onclick='removeFromCart(" + i + ")'></button>" +
        "<p>Antal: " + cart[i].quantity + "</p>" + 
        "<p>Pris: " + price.toFixed(2) + " kr.</p>" + 
        "</div>";
    }
    document.querySelector("#cart").innerHTML = htmlCode; 
    document.querySelector("#totPrice").textContent = totalPrice.toFixed(2);
    
} // Slut showCart
// --------------------------------------------------
// Konvertera varukorgen till en sträng m.h.a. JSON och spara i localStorage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    
} // Slut saveCart
// --------------------------------------------------
// Läs in från localStorage och konvertera till varukorgens datatyp m.h.a. JSON
function getCart() {
    let savedCart = localStorage.getItem("cart");
    if (savedCart) {
        cart = JSON.parse(savedCart);
        showCart();
    }
    
} // Slut getCart
// --------------------------------------------------
