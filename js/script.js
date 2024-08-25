// Catching buttons for adding the items
const addToCartBtns = document.querySelectorAll(".add-to-cart");

let cart = [];

addToCartBtns.forEach( button => {
    button.addEventListener('click', () => {
        const gridItem = button.closest('.grid-item');
        const dessertName = gridItem.querySelector('.dessert-name').textContent;

        // Add the dessert to cart array
        cart.push(dessertName);

        // Update Cart UI
        updateCartUI();
    
        console.log(`Added ${dessertName} to the cart!`);
    });
});


// Function to update look of the Cart

function updateCartUI() {

    // Writing values into the Cart

    let cartItems = document.querySelector('.cart-wrapper');

    cartItems.innerHTML = '';

    cart.forEach(item => {
        let p = document.createElement('p');
        p.textContent = item;
        cartItems.appendChild(p);
    });

}
